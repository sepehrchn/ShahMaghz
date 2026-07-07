import { HandDrawnDivider, WaxSeal } from "@/components/ui/BrandMotifs";

export function BrandStory() {
  return (
    <section className="py-16 lg:py-24 bg-forest-900 bg-linen-texture relative overflow-hidden">
      <div className="container-brand">
        {/* Editorial asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Visual — 5 cols */}
          <div className="lg:col-span-5 relative reveal-on-scroll">
            <div className="relative">
              {/* Main visual block */}
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-forest-700 to-forest-950 border border-gold-400/20 overflow-hidden relative shadow-2xl shadow-forest-950/40">
                <img
                  src="https://res.cloudinary.com/pjx9e2r5/image/upload/v1783426645/shahmaghz-assets/about-old-shop.jpg"
                  alt="بسته‌بندی سنتی شاه‌مغز"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-forest-950/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <WaxSeal label="از ۱۳۷۳" className="w-20 h-20" />
                </div>
              </div>

              {/* Floating quote card — editorial offset */}
              <div className="absolute -bottom-6 -start-4 lg:-start-8 max-w-xs">
                <div className="bg-forest-800/95 backdrop-blur border border-gold-400/20 rounded-2xl p-5 shadow-xl">
                  <p className="text-sm text-ivory-200 leading-relaxed italic">
                    «آجیل خوب، از دستانی که می‌شناسندش می‌چیند. ما همان دست‌ها هستیم.»
                  </p>
                  <p className="text-xs text-gold-200 mt-2">— استاد حسن، برشته‌کار ارشد</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text — 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-5 reveal-on-scroll">
            <span className="text-sm text-gold-200 font-medium">داستان شاه‌مغز</span>

            <h2 className="text-3xl lg:text-4xl font-display font-bold text-ivory-50 leading-tight text-balance">
              سه نسل از عشق به آجیل،
              <br />
              یک نام: شاه‌مغز
            </h2>

            <HandDrawnDivider className="py-2 justify-start" />

            <div className="flex flex-col gap-4 text-ivory-300 leading-relaxed">
              <p>
                داستان ما از سال ۱۳۷۳ و یک دکان کوچک در بازار کهنه تهران شروع شد.
                پدربزرگ، هر صبح با دست‌های پینه‌بسته، آجیل‌های تازه را از دست کشاورزان
                می‌خرید و با هنر و صبر برشته می‌کرد. عطر آن برشته‌خانه، هنوز در حافظه
                مشتریان قدیمی ما زنده است.
              </p>
              <p>
                امروز، سه نسل بعد، همان عشق و وسعت در انتخاب، در بسته‌بندی شاه‌مغز
                جاری است. ما از باغ‌های رفسنجان، کاشان، استهبان و قائنات، تنها درخت‌ترین
                و آفتابی‌ترین محصول را انتخاب می‌کنیم. برشته‌سازی به روش سنتی، با حرارت
                ملایم و نمک دریا، طعمی که فقط دست‌های ماهر می‌دانند.
              </p>
              <p>
                شاه‌مغز، فقط یک فروشگاه نیست. پل‌زنی است میان سنت و امروز، میان طعم
                اصیل و تجربه‌ای لوکس. هر بسته، حامل داستانی است.
              </p>
            </div>

            {/* Values — not generic 3-icon row, but inline editorial */}
            <div className="flex flex-col gap-3 mt-4">
              {[
                {
                  title: "انتخاب دستی",
                  desc: "هر دانه با دست چیده می‌شود، نه با ماشین.",
                },
                {
                  title: "برشته‌سازی سنتی",
                  desc: "حرارت ملایم و نمک دریا، همان روش پدربزرگ.",
                },
                {
                  title: "بدون افزودنی",
                  desc: "طعم طبیعت، بدون رنگ و نگه‌دارنده مصنوعی.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="flex items-start gap-3 border-s-2 border-gold-400/40 ps-4"
                >
                  <div>
                    <p className="text-sm font-display font-bold text-gold-200">
                      {value.title}
                    </p>
                    <p className="text-sm text-ivory-400 mt-0.5">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
