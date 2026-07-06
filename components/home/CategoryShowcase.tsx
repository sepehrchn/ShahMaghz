import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { HandDrawnDivider } from "@/components/ui/BrandMotifs";
import { toPersianDigits } from "@/lib/format";

export function CategoryShowcase() {
  return (
    <section className="py-16 lg:py-20 bg-forest-900 bg-kraft-texture">
      <div className="container-brand">
        {/* Section header — editorial, left-aligned */}
        <div className="flex flex-col gap-2 mb-10 reveal-on-scroll">
          <span className="text-sm text-gold-200 font-medium">دسته‌بندی محصولات</span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-ivory-50">
            گنجینه‌ای از طعم‌های ایران
          </h2>
          <p className="text-ivory-400 max-w-xl mt-2">
            هر دسته، داستانی از سرزمینی متفاوت. از پسته‌های رفسنجان تا انجیرهای استهبان.
          </p>
        </div>

        {/* Asymmetric grid — not uniform 3-column */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {categories.map((cat, index) => {
            // Alternate sizes for editorial feel
            const isLarge = index === 0 || index === 3;
            const colSpan = isLarge ? "col-span-12 sm:col-span-7" : "col-span-12 sm:col-span-5";

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`${colSpan} group reveal-on-scroll`}
              >
                <div
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-700 to-forest-900 border border-forest-500/30 ${
                    isLarge ? "aspect-[16/9]" : "aspect-[16/9] sm:aspect-square"
                  } transition-all duration-300 group-hover:border-gold-400/40 group-hover:shadow-xl group-hover:shadow-forest-950/40`}
                >
                  {/* Texture */}
                  <div className="absolute inset-0 bg-linen-texture opacity-20" />

                  {/* TODO: replace placeholder image with real category photography */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                      <span className="text-3xl font-display font-bold text-gold-400/40">
                        {toPersianDigits(index + 1)}
                      </span>
                    </div>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-5 lg:p-6">
                    <h3 className="text-xl lg:text-2xl font-display font-bold text-ivory-50 mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-ivory-300/80 mb-3 line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-ivory-400">
                        {toPersianDigits(cat.productCount)} محصول
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gold-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        مشاهده
                        <ArrowLeft size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <HandDrawnDivider />
      </div>
    </section>
  );
}
