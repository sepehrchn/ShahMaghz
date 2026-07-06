import { Star, Quote } from "lucide-react";
import { toPersianDigits } from "@/lib/format";
import { HandDrawnDivider } from "@/components/ui/BrandMotifs";

const testimonials = [
  {
    name: "نگار محمدی",
    city: "تهران",
    rating: 5,
    text: "پسته اکبری شاه‌مغز واقعاً متفاوته. تردی و طعمش یاد آجیل‌های قدیمی بازار می‌اندازه. بسته‌بندی هم خیلی نفیسه، هدیه دادیم و خیلی پسندیده شد.",
    product: "پسته اکبری ممتاز",
  },
  {
    name: "علی رضایی",
    city: "اصفهان",
    rating: 5,
    text: "زعفران نگینش عالی بود. رنگ و عطرش نشون می‌ده واقعاً نگین درجه یک هست. برای دمنوش و طبخ استفاده می‌کنم، خیلی اقتصادی‌تر از خرید خرد به خرده.",
    product: "زعفران نگین ممتاز",
  },
  {
    name: "مریم حسینی",
    city: "شیراز",
    rating: 4,
    text: "جعبه هدیه سلطنتی برای شب یلدا خریدم. هم محتویات عالی بود هم جعبه چوبی خیلی زیبا. ارسال هم سریع بود. حتماً برای عید هم سفارش می‌دم.",
    product: "جعبه هدیه سلطنتی",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 lg:py-20 bg-forest-950">
      <div className="container-brand">
        <div className="text-center mb-12 reveal-on-scroll">
          <span className="text-sm text-gold-200 font-medium">نظر مشتریان</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-ivory-50 mt-2">
            از زبان شما
          </h2>
          <HandDrawnDivider className="py-4" />
        </div>

        {/* Asymmetric layout — not uniform grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`reveal-on-scroll ${
                i === 0
                  ? "lg:col-span-5"
                  : i === 1
                  ? "lg:col-span-4"
                  : "lg:col-span-3"
              }`}
            >
              <div className="h-full bg-forest-800/60 border border-forest-600/30 rounded-2xl p-6 flex flex-col gap-4 hover:border-gold-400/20 transition-all duration-300">
                {/* Quote icon */}
                <Quote size={28} className="text-gold-400/30" />

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={
                        star <= t.rating
                          ? "fill-gold-400 text-gold-400"
                          : "text-forest-500"
                      }
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-ivory-200 leading-relaxed flex-1">
                  {t.text}
                </p>

                {/* Author */}
                <div className="flex items-center justify-between pt-3 border-t border-forest-600/30">
                  <div>
                    <p className="text-sm font-medium text-ivory-100">{t.name}</p>
                    <p className="text-xs text-ivory-400">{t.city}</p>
                  </div>
                  <span className="text-xs text-gold-200/70">
                    {t.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
