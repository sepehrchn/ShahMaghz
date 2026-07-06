"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, UserCheck } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { loginFormSchema, type LoginFormValues } from "@/lib/validation";
import { toPersianDigits } from "@/lib/format";

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LoginFormValues>({
    mobile: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (field: keyof LoginFormValues, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    login(
      formData.mobile,
      formData.firstName,
      formData.lastName,
      formData.email || undefined
    );
    setTimeout(() => {
      router.push("/account");
    }, 500);
  };

  return (
    <div className="bg-forest-800/60 border border-forest-600/30 rounded-2xl p-6 lg:p-8">
      <div className="flex flex-col gap-2 mb-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center">
          <User size={28} className="text-gold-400" />
        </div>
        <h2 className="text-xl font-display font-bold text-ivory-50">
          ورود / ثبت‌نام
        </h2>
        <p className="text-sm text-ivory-400">
          اطلاعات خود را وارد کنید تا وارد حساب کاربری شوید
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="نام"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            error={errors.firstName}
            placeholder="نام شما"
          />
          <Input
            label="نام خانوادگی"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            error={errors.lastName}
            placeholder="نام خانوادگی"
          />
        </div>

        <Input
          label="شماره موبایل"
          name="mobile"
          type="tel"
          value={formData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          error={errors.mobile}
          placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          hint="شماره موبایل خود را بدون کد کشور وارد کنید"
        />

        <Input
          label="ایمیل (اختیاری)"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          placeholder="example@email.com"
        />

        <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
          {isSubmitting ? (
            "در حال ورود..."
          ) : (
            <>
              <UserCheck size={20} />
              ورود به حساب
            </>
          )}
        </Button>
      </form>

      <p className="text-xs text-ivory-400/60 text-center mt-4">
        با ورود به شاه‌مغز، شرایط و قوانین استفاده را می‌پذیرید.
      </p>
    </div>
  );
}
