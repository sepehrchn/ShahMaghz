"use client";

import { useState } from "react";
import { MapPin, Check } from "lucide-react";
import { useAddressStore, iranianProvinces, type Address } from "@/lib/address-store";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { addressFormSchema, type AddressFormValues } from "@/lib/validation";

interface AddressFormProps {
  initialData?: Address;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export function AddressForm({ initialData, onSubmit, onCancel }: AddressFormProps) {
  const { addAddress, updateAddress } = useAddressStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<AddressFormValues>({
    label: initialData?.label ?? "",
    recipient: initialData?.recipient ?? "",
    mobile: initialData?.mobile ?? "",
    province: initialData?.province ?? "",
    city: initialData?.city ?? "",
    postalCode: initialData?.postalCode ?? "",
    addressLine: initialData?.addressLine ?? "",
  });

  const handleChange = (field: keyof AddressFormValues, value: string) => {
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
    const result = addressFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (initialData) {
      updateAddress(initialData.id, formData);
    } else {
      addAddress(formData);
    }
    onSubmit?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="عنوان آدرس"
          name="label"
          value={formData.label}
          onChange={(e) => handleChange("label", e.target.value)}
          error={errors.label}
          placeholder="مثلاً: خانه، محل کار"
        />
        <Input
          label="نام گیرنده"
          name="recipient"
          value={formData.recipient}
          onChange={(e) => handleChange("recipient", e.target.value)}
          error={errors.recipient}
          placeholder="مثلاً: علی رضایی"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="شماره موبایل گیرنده"
          name="mobile"
          type="tel"
          value={formData.mobile}
          onChange={(e) => handleChange("mobile", e.target.value)}
          error={errors.mobile}
          placeholder="مثلاً: ۰۹۱۲۳۴۵۶۷۸۹"
        />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ivory-200">استان</label>
          <select
            value={formData.province}
            onChange={(e) => handleChange("province", e.target.value)}
            className={`w-full px-4 py-3 rounded-xl bg-forest-900/60 border text-ivory-100 transition-all duration-200 outline-none ${
              errors.province
                ? "border-burgundy-700/60"
                : "border-forest-500/40 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20"
            }`}
          >
            <option value="">انتخاب استان</option>
            {iranianProvinces.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.province && <p className="text-xs text-burgundy-700">{errors.province}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="شهر"
          name="city"
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
          error={errors.city}
          placeholder="مثلاً: تهران"
        />
        <Input
          label="کد پستی"
          name="postalCode"
          value={formData.postalCode}
          onChange={(e) => handleChange("postalCode", e.target.value)}
          error={errors.postalCode}
          placeholder="مثلاً: ۱۲۳۴۵۶۷۸۹۰"
        />
      </div>

      <Textarea
        label="آدرس کامل"
        name="addressLine"
        rows={3}
        value={formData.addressLine}
        onChange={(e) => handleChange("addressLine", e.target.value)}
        error={errors.addressLine}
        placeholder="مثلاً: خیابان ولیعصر، کوچه شماره ۱۲، پلاک ۵، واحد ۳"
      />

      <div className="flex gap-3 mt-2">
        <Button type="submit" size="lg" className="gap-2">
          <Check size={18} />
          {initialData ? "ذخیره تغییرات" : "افزودن آدرس"}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" size="lg" onClick={onCancel}>
            انصراف
          </Button>
        )}
      </div>
    </form>
  );
}
