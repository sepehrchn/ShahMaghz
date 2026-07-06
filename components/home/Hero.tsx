import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WaxSeal } from "@/components/ui/BrandMotifs";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-950">
      {/* Texture overlay */}
      <div className="absolute inset-0 bg-kraft-texture opacity-40" />

      {/* Asymmetric layout — not centered hero */}
      <div className="container-brand relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text — takes 5 cols (left side in RTL = right visually) */}
          <div className="lg:col-span-5 flex flex-col gap-6 reveal-on-scroll">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-gold-400" />
              <span className="text-sm text-gold-200 font-medium tracking-wide">
                تجربه‌ای شاهانه از طعم‌های اصیل ایران
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight text-ivory-50 text-balance">
              از باغ‌های ایران،
              <br />
              <span className="text-gold-gradient">به سفره شما</span>
            </h1>

            <p className="text-lg text-ivory-300 leading-relaxed max-w-md">
              منتخب‌ترین آجیل و خشکبار ایران را با تجربه‌ای سی‌ساله و عشقی بی‌شائبه
              برای شما انتخاب کرده‌ایم. هر دانه، داستانی از خاک و آفتاب این سرزمین.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="/category/nuts">
                <Button size="lg" className="gap-2">
                  مشاهده محصولات
                  <ArrowLeft size={18} />
                </Button>
              </Link>
              <Link href="/category/gift-boxes">
                <Button variant="outline" size="lg">
                  جعبه‌های هدیه
                </Button>
              </Link>
            </div>

            {/* Trust indicators — not generic icons */}
            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-forest-600/30">
              <div>
                <p className="text-2xl font-display font-bold text-gold-200">۳۰+</p>
                <p className="text-xs text-ivory-400">سال تجربه</p>
              </div>
              <div className="w-px h-10 bg-forest-600/40" />
              <div>
                <p className="text-2xl font-display font-bold text-gold-200">۱۲۰+</p>
                <p className="text-xs text-ivory-400">نوع محصول</p>
              </div>
              <div className="w-px h-10 bg-forest-600/40" />
              <div>
                <p className="text-2xl font-display font-bold text-gold-200">۵۰هزار+</p>
                <p className="text-xs text-ivory-400">مشتری وفادار</p>
              </div>
            </div>
          </div>

          {/* Visual — takes 7 cols, asymmetric */}
          <div className="lg:col-span-7 relative reveal-on-scroll">
            <div className="relative grid grid-cols-12 gap-4">
              {/* Large image block */}
              <div className="col-span-8 aspect-[4/5] rounded-2xl bg-gradient-to-br from-forest-700 to-forest-900 border border-gold-400/20 overflow-hidden relative shadow-2xl shadow-forest-950/50">
                {/* TODO: replace placeholder image with real product photography */}
                <div className="absolute inset-0 bg-linen-texture opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mb-4">
                      <Sparkles size={36} className="text-gold-400/60" />
                    </div>
                    <p className="text-ivory-400/40 text-sm">
                      تصویر محصول — پسته اکبری ممتاز
                    </p>
                  </div>
                </div>
                {/* Wax seal overlay */}
                <div className="absolute top-4 start-4">
                  <WaxSeal label="ممتاز" />
                </div>
              </div>

              {/* Small image block — offset for asymmetry */}
              <div className="col-span-4 mt-12 aspect-square rounded-2xl bg-gradient-to-tr from-forest-600 to-forest-800 border border-forest-500/30 overflow-hidden relative shadow-xl">
                {/* TODO: replace placeholder image */}
                <div className="absolute inset-0 bg-kraft-texture opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-ivory-400/40 text-xs text-center px-4">
                    تصویر محصول —<br />زعفران نگین
                  </p>
                </div>
              </div>

              {/* Floating badge — editorial style */}
              <div className="col-span-12 -mt-4 ms-8 lg:ms-16">
                <div className="inline-flex items-center gap-3 bg-forest-800/90 backdrop-blur border border-gold-400/20 rounded-2xl px-5 py-3 shadow-xl">
                  <div className="w-10 h-10 rounded-full bg-gold-400/15 flex items-center justify-center">
                    <Sparkles size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ivory-100">برشته‌شده به روش سنتی</p>
                    <p className="text-xs text-ivory-400">با نمک دریا و حرارت ملایم</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
