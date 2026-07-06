import type { Metadata } from "next";
import { Phone, User, ShoppingBag, MapPin, Ticket } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "حساب کاربری",
  description: "ورود و ثبت‌نام در شاه‌مغز با شماره موبایل",
};

export default function AccountPage() {
  return (
    <div className="bg-forest-950 min-h-screen">
      <div className="bg-forest-900 bg-kraft-texture py-12">
        <div className="container-brand">
          <h1 className="text-3xl font-display font-bold text-ivory-50">حساب کاربری</h1>
        </div>
      </div>

      <div className="container-brand py-12">
        <div className="max-w-md mx-auto">
          {/* OTP Login form */}
          <div className="bg-forest-800/60 border border-forest-600/30 rounded-2xl p-6 lg:p-8">
            <div className="flex flex-col gap-2 mb-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center">
                <User size={28} className="text-gold-400" />
              </div>
              <h2 className="text-xl font-display font-bold text-ivory-50">
                ورود / ثبت‌نام
              </h2>
              <p className="text-sm text-ivory-400">
                با شماره موبایل خود وارد شوید. کد تأیید برایتان پیامک می‌شود.
              </p>
            </div>

            <form className="flex flex-col gap-4">
              <Input
                label="شماره موبایل"
                name="mobile"
                type="tel"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                hint="شماره موبایل خود را بدون کد کشور وارد کنید"
              />

              <Button type="submit" size="lg" fullWidth>
                دریافت کد تأیید
              </Button>
            </form>

            <p className="text-xs text-ivory-400/60 text-center mt-4">
              با ورود به شاه‌مغز، شرایط و قوانین استفاده را می‌پذیرید.
            </p>
          </div>

          {/* Account menu preview (for logged-in users) */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              { icon: ShoppingBag, label: "سفارش‌های من", href: "/account/orders" },
              { icon: MapPin, label: "آدرس‌های من", href: "/account/addresses" },
              { icon: Ticket, label: "کدهای تخفیف", href: "/account/coupons" },
              { icon: Phone, label: "پشتیبانی", href: "/contact" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 bg-forest-800/40 border border-forest-600/30 rounded-xl p-4 hover:border-gold-400/20 transition-all"
              >
                <item.icon size={18} className="text-gold-400" />
                <span className="text-sm text-ivory-200">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
