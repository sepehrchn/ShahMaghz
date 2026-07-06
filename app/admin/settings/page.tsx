"use client";

import { useState } from "react";
import { Save, Store, Truck, CreditCard, Bell, Shield } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FREE_SHIPPING_THRESHOLD, BASE_SHIPPING_COST } from "@/lib/shipping";
import { toPersianDigits } from "@/lib/format";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: "شاه‌مغز",
    storePhone: "۰۲۱-۸۸۷۷۶۶۵۵",
    storeEmail: "info@shahmaghz.ir",
    storeAddress: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    baseShippingCost: BASE_SHIPPING_COST,
    aboutText: "منتخب‌ترین آجیل و خشکبار ایران، با عشق و تجربه‌ای سی‌ساله.",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-ivory-50">تنظیمات</h1>
          <p className="text-sm text-ivory-400 mt-1">پیکربندی فروشگاه شاه‌مغز</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save size={16} />
          {saved ? "ذخیره شد ✓" : "ذخیره تنظیمات"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Store info */}
        <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-sm font-display font-bold text-gold-200 flex items-center gap-2">
            <Store size={16} />
            اطلاعات فروشگاه
          </h2>
          <Input
            label="نام فروشگاه"
            value={settings.storeName}
            onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="تلفن"
              value={settings.storePhone}
              onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
            />
            <Input
              label="ایمیل"
              value={settings.storeEmail}
              onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
            />
          </div>
          <Textarea
            label="آدرس"
            rows={2}
            value={settings.storeAddress}
            onChange={(e) => setSettings({ ...settings, storeAddress: e.target.value })}
          />
          <Textarea
            label="درباره فروشگاه"
            rows={3}
            value={settings.aboutText}
            onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
          />
        </div>

        {/* Shipping settings */}
        <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6 flex flex-col gap-4">
          <h2 className="text-sm font-display font-bold text-gold-200 flex items-center gap-2">
            <Truck size={16} />
            تنظیمات ارسال
          </h2>
          <Input
            label="آستانه ارسال رایگان (تومان)"
            type="number"
            value={String(settings.freeShippingThreshold)}
            onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
            hint={`در حال حاضر: ${toPersianDigits(settings.freeShippingThreshold)} تومان`}
          />
          <Input
            label="هزینه پایه ارسال (تومان)"
            type="number"
            value={String(settings.baseShippingCost)}
            onChange={(e) => setSettings({ ...settings, baseShippingCost: Number(e.target.value) })}
            hint={`در حال حاضر: ${toPersianDigits(settings.baseShippingCost)} تومان`}
          />

          <div className="bg-forest-900/40 rounded-xl p-4 mt-2">
            <h3 className="text-xs font-medium text-gold-200 mb-2 flex items-center gap-2">
              <CreditCard size={14} />
              درگاه پرداخت
            </h3>
            <p className="text-xs text-ivory-400">
              درگاه پرداخت در حال حاضر غیرفعال است. سفارش‌ها در وضعیت «در انتظار بررسی» ثبت می‌شوند و
              پرداخت خارج از سیستم انجام می‌شود. برای فعال‌سازی درگاه زرین‌پال، در فاز ۵ اقدام شود.
            </p>
          </div>

          <div className="bg-forest-900/40 rounded-xl p-4">
            <h3 className="text-xs font-medium text-gold-200 mb-2 flex items-center gap-2">
              <Bell size={14} />
              اعلان‌ها
            </h3>
            <p className="text-xs text-ivory-400">
              اعلان‌های پیامکی در حال حاضر غیرفعال هستند. برای فعال‌سازی، کلید API ارائه‌دهنده پیامک
              (کاوه‌نگار یا ملی‌پیامک) را در فایل محیط پیکربندی کنید.
            </p>
          </div>

          <div className="bg-forest-900/40 rounded-xl p-4">
            <h3 className="text-xs font-medium text-gold-200 mb-2 flex items-center gap-2">
              <Shield size={14} />
              امنیت
            </h3>
            <p className="text-xs text-ivory-400">
              پنل مدیریت با نام کاربری و رمز عبور محافظت می‌شود. در محیط تولید، از NextAuth.js با
              نقش مدیر و احراز هویت دو مرحله‌ای استفاده کنید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
