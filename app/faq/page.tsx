import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { HandDrawnDivider } from "@/components/ui/BrandMotifs";

export const metadata: Metadata = {
  title: "سوالات متداول",
  description: "پاسخ به سوالات رایج مشتریان شاه‌مغز درباره ارسال، بازگشت کالا و محصولات",
};

const faqs = [
  {
    q: "زمان ارسال سفارش‌ها چقدر است؟",
    a: "سفارش‌های داخل تهران معمولاً در کمتر از ۲۴ ساعت و سفارش‌های سایر شهرستان‌ها بین ۳ تا ۵ روز کاری تحویل داده می‌شوند. سفارش‌های ثبت‌شده قبل از ساعت ۱۲ ظهر، همان روز ارسال می‌شوند.",
  },
  {
    q: "هزینه ارسال چگونه محاسبه می‌شود؟",
    a: "هزینه ارسال بر اساس وزن بسته و مقصد محاسبه می‌شود. برای سفارش‌های بالای ۵۰۰ هزار تومان، ارسال در سراسر کشور رایگان است.",
  },
  {
    q: "آیا امکان بازگشت کالا وجود دارد؟",
    a: "بله. در صورت عدم رضایت از کیفیت محصول، تا ۷ روز پس از تحویل می‌توانید کالا را بازگردانید. شرط آن این است که بسته‌بندی اصلی محصول باز نشده باشد.",
  },
  {
    q: "محصولات شما از کجا تامین می‌شوند؟",
    a: "ما مستقیماً از کشاورزان و باغداران مناطق مختلف ایران خرید می‌کنیم. خاستگاه هر محصول در صفحه آن ذکر شده است. هیچ محصول واسطه‌ای در فروشگاه ما وجود ندارد.",
  },
  {
    q: "روش پرداخت چگونه است؟",
    a: "پرداخت از طریق درگاه امن زرین‌پال انجام می‌شود. امکان پرداخت با تمام کارت‌های بانکی عضو شتاب فراهم است. در آینده امکان پرداخت در محل نیز اضافه خواهد شد.",
  },
  {
    q: "چگونه عضو باشگاه مشتریان شوم؟",
    a: "با اولین خرید از شاه‌مغز، به طور خودکار عضو باشگاه مشتریان می‌شوید. با هر خرید امتیاز جمع می‌کنید و با رسیدن به طبقات بالاتر، از تخفیف‌ها و مزایای ویژه بهره‌مند می‌شوید.",
  },
  {
    q: "آیا محصولات شما افزودنی دارند؟",
    a: "اکثر محصولات ما کاملاً طبیعی و بدون افزودنی هستند. در مواردی که از نمک یا روغن استفاده می‌شود (مانند برشته‌کاری)، در لیست مواد تشکیل‌دهنده ذکر می‌شود. هیچ رنگ یا نگه‌دارنده مصنوعی استفاده نمی‌کنیم.",
  },
];

export default function FAQPage() {
  return (
    <div className="bg-forest-950 min-h-screen">
      <div className="bg-forest-900 bg-kraft-texture py-12 lg:py-16">
        <div className="container-brand">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-ivory-50 mb-2">
            سوالات متداول
          </h1>
          <p className="text-ivory-400 max-w-2xl">
            پاسخ به سوالاتی که اغلب از ما می‌پرسند
          </p>
        </div>
      </div>

      <div className="container-brand py-12">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-forest-800/50 border border-forest-600/30 rounded-xl overflow-hidden hover:border-gold-400/20 transition-all"
            >
              <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                <span className="text-sm lg:text-base font-medium text-ivory-100">
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className="text-gold-400 shrink-0 transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="px-5 pb-5 text-sm text-ivory-300 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <HandDrawnDivider />

        <div className="text-center mt-8">
          <p className="text-ivory-400">
            سوال دیگری دارید؟{" "}
            <a href="/contact" className="text-gold-200 hover:text-gold-100 transition-colors">
              با ما در تماس باشید
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
