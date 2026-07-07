import type { Metadata } from "next";
import { HandDrawnDivider, WaxSeal, TexturedSection } from "@/components/ui/BrandMotifs";

export const metadata: Metadata = {
  title: "درباره شاه‌مغز",
  description: "داستان شاه‌مغز، از یک دکان کوچک در بازار تهران تا برند لوکس آجیل و خشکبار ایران",
};

export default function AboutPage() {
  return (
    <div className="bg-forest-950">
      {/* Hero */}
      <TexturedSection variant="kraft" className="py-16 lg:py-24">
        <div className="container-brand">
          <div className="max-w-3xl mx-auto text-center reveal-on-scroll">
            <WaxSeal label="از ۱۳۷۳" className="mx-auto mb-6" />
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-ivory-50 mb-4 text-balance">
              داستان شاه‌مغز
            </h1>
            <p className="text-lg text-ivory-300 leading-relaxed">
              از یک دکان کوچک در بازار کهنه تهران، تا برندی که نام آجیل لوکس ایران شد.
              سه نسل عشق به طعم‌های اصیل.
            </p>
          </div>
        </div>
      </TexturedSection>

      {/* Story sections */}
      <div className="container-brand py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20">
          <div className="lg:col-span-7 reveal-on-scroll">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-gold-200 mb-4">
              آغاز: ۱۳۷۳
            </h2>
            <div className="flex flex-col gap-4 text-ivory-300 leading-relaxed">
              <p>
                در سال ۱۳۷۳، پدربزرگ در گوشه‌ای از بازار کهنه تهران، دکانی به وسعت دو متر
                مربع باز کرد. صبح‌ها زودتر از همه می‌رسید، آجیل‌های تازه را از دست کشاورزان
                می‌خرید و با هنر و صبر برشته می‌کرد. عطر برشته‌خانه‌اش، مشتریان را از کوچه‌های
                دور می‌کشید.
              </p>
              <p>
                او می‌گفت: «آجیل خوب را فقط دستی که می‌شناسدش می‌چیند.» این جمله، شعار سه
                نسل از خانواده ما شد.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 reveal-on-scroll">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-forest-700 to-forest-950 border border-gold-400/20 overflow-hidden relative">
              <img
                src="https://res.cloudinary.com/pjx9e2r5/image/upload/v1783426645/shahmaghz-assets/about-old-shop.jpg"
                alt="دکان قدیمی شاه‌مغز در بازار تهران"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />
            </div>
          </div>
        </div>

        <HandDrawnDivider />

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-ivory-50 text-center mb-12">
            آنچه ما را متمایز می‌کند
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "انتخاب دستی",
                desc: "هر دانه آجیل با دست چیده و بررسی می‌شود. ماشین جایگزین چشم ماهر نمی‌شود.",
              },
              {
                title: "برشته‌سازی سنتی",
                desc: "حرارت ملایم، نمک دریا، و زمان. همان روشی که پدربزرگ استفاده می‌کرد.",
              },
              {
                title: "خاستگاه مشخص",
                desc: "هر محصول از منطقه‌ای مشخص می‌آید. ما منبع را پنهان نمی‌کنیم.",
              },
              {
                title: "بدون افزودنی",
                desc: "بدون رنگ مصنوعی، بدون نگه‌دارنده، بدون طعم‌دهنده. فقط طعم طبیعت.",
              },
              {
                title: "بسته‌بندی نفیس",
                desc: "هر بسته، هدیه‌ای است. بسته‌بندی ما بازتاب احترام به محصول و مشتری است.",
              },
              {
                title: "پشتیبانی واقعی",
                desc: "تیم پشتیبانی ما، آجیل را می‌شناسد. پاسخگوی هر سوال شما هستیم.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6 reveal-on-scroll hover:border-gold-400/20 transition-all"
              >
                <h3 className="text-lg font-display font-bold text-gold-200 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-ivory-300 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
