"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight } from "lucide-react";
import { useAdminStore } from "@/lib/admin-store";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function AdminLogin() {
  const router = useRouter();
  const login = useAdminStore((s) => s.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("نام کاربری و رمز عبور الزامی است");
      return;
    }
    const success = login(username, password);
    if (success) {
      router.push("/admin");
    } else {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center mb-4">
            <Lock size={28} className="text-gold-400" />
          </div>
          <h1 className="text-2xl font-display font-bold text-ivory-50">پنل مدیریت شاه‌مغز</h1>
          <p className="text-sm text-ivory-400 mt-1">برای ورود، اطلاعات حساب مدیریت را وارد کنید</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-forest-800/60 border border-forest-600/30 rounded-2xl p-6 flex flex-col gap-4"
        >
          <Input
            label="نام کاربری"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            error={error && !username ? error : undefined}
          />
          <Input
            label="رمز عبور"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={error && !password ? error : undefined}
          />

          {error && username && password && (
            <p className="text-xs text-burgundy-700 text-center">{error}</p>
          )}

          <Button type="submit" size="lg" fullWidth className="gap-2">
            <ArrowRight size={18} />
            ورود به پنل
          </Button>
        </form>

        <p className="text-xs text-ivory-400/40 text-center mt-4">
          دسترسی فقط برای مدیران مجاز
        </p>
      </div>
    </div>
  );
}
