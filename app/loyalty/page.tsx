import type { Metadata } from "next";
import { Crown, Medal, Award, Star, Gift, ArrowLeft } from "lucide-react";
import { toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { HandDrawnDivider, WaxSeal } from "@/components/ui/BrandMotifs";

export const metadata: Metadata = {
  title: "باشگاه مشتریان",
  description: "باشگاه وفاداری شاه‌مغز — با هر خرید امتیاز بگیرید و از مزایای ویژه بهره‌مند شوید",
};

const tiers = [
  {
    name: "برنزی",
    icon: Medal,
    minPoints: 0,
    benefits: ["امتیاز ۱ به ازای هر ۱۰ هزار تومان خرید", "دسترسی به تخفیف‌های فصلی"],
    color: "text-amber-600",
  },
  {
    name: "نقره‌ای",
    icon: Award,
    minPoints: 1000,
    benefits: ["امتیاز ۱.۵ به ازای هر ۱۰ هزار تومان", "ارسال رایگان همیشگی", "پیش‌خرید محصولات جدید"],
    color: "text-gray-300",
  },
  {
    name: "طلایی",
    icon: Crown,
    minPoints: 5000,
    benefits: ["امتیاز ۲ به ازای هر ۱۰ هزار تومان", "تخفیف ۱۰٪ روی تمام محصولات", "هدیه ویژه روز تولد"],
    color: "text-gold-200",
  },
  {
    name: "پلاتینی",
    icon: Star,
    minPoints: 15000,
    benefits: ["امتیاز ۳ به ازای هر ۱۰ هزار تومان", "تخفیف ۱۵٪ روی تمام محصولات", "مشاور اختصاصی هدیه", "دعوت به رویدادهای ویژه"],
    color: "text-cyan-300",
  },
];

export default function LoyaltyPage() {
  return (
    <div className="bg-forest-950 min-h-screen">
      {/* Hero */}
      <div className="bg-forest-900 bg-kraft-texture py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute -top-20 -end-20 w-72 h-72 rounded-full bg-gold-400/5 blur-3xl" />
        <div className="container-brand relative z-10">
          <div className="max-w-2xl reveal-on-scroll">
            <WaxSeal label="باشگاه" className="mb-6" />
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-ivory-50 mb-4 text-balance">
              باشگاه وفاداری شاه‌مغز
            </h1>
            <p className="text-lg text-ivory-300 leading-relaxed">
              با هر خرید امتیاز جمع کنید، به طبقات بالاتر برسید و از مزایای انحصاری
              شاه‌مغز بهره‌مند شوید. وفاداری شما، هدیه ما.
            </p>
          </div>
        </div>
      </div>

      {/* Tiers */}
      <div className="container-brand py-16">
        <h2 className="text-2xl lg:text-3xl font-display font-bold text-ivory-50 text-center mb-12">
          طبقات باشگاه
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              className={`bg-forest-800/60 border rounded-2xl p-6 flex flex-col gap-4 reveal-on-scroll ${
                i === 2 ? "border-gold-400/40 shadow-lg shadow-gold-400/10" : "border-forest-600/30"
              }`}
            >
              <div className="flex items-center justify-between">
                <tier.icon size={28} className={tier.color} />
                {i === 2 && (
                  <span className="text-xs text-gold-200 bg-gold-400/15 px-2 py-1 rounded-full">
                    محبوب‌ترین
                  </span>
                )}
              </div>

              <h3 className="text-xl font-display font-bold text-ivory-50">{tier.name}</h3>

              <p className="text-xs text-ivory-400">
                از {toPersianDigits(tier.minPoints)} امتیاز
              </p>

              <ul className="flex flex-col gap-2 text-sm text-ivory-300">
                {tier.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <Gift size={14} className="text-gold-400 mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <HandDrawnDivider />

        {/* How it works */}
        <div className="mt-12">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-ivory-50 text-center mb-10">
            چگونه کار می‌کند؟
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: "۱", title: "خرید کنید", desc: "از هر محصول شاه‌مغز خرید کنید و به طور خودکار عضو باشگاه شوید." },
              { step: "۲", title: "امتیاز بگیرید", desc: "به ازای هر ۱۰ هزار تومان خرید، امتیاز دریافت کنید." },
              { step: "۳", title: "پاداش بگیرید", desc: "امتیازها را به کد تخفیف تبدیل کنید یا به طبقه بالاتر ارتقا یابید." },
            ].map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center gap-3 reveal-on-scroll"
              >
                <div className="w-14 h-14 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center">
                  <span className="text-xl font-display font-bold text-gold-200">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-display font-bold text-ivory-100">{item.title}</h3>
                <p className="text-sm text-ivory-400 leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button size="lg" className="gap-2">
            عضویت در باشگاه
            <ArrowLeft size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
