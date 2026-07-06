import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { formatPersianDate } from "@/lib/format";
import { HandDrawnDivider } from "@/components/ui/BrandMotifs";

export const metadata: Metadata = {
  title: "مجله شاه‌مغز",
  description: "مقالات تغذیه‌ای، دستور پخت و راهنمای نگه‌داری آجیل و خشکبار",
};

const blogPosts = [
  {
    slug: "pistachio-benefits",
    title: "خواص بی‌نظیر پسته: از قلب تا پوست",
    excerpt:
      "پسته، ملکه آجیل‌های ایرانی، سرشار از آنتی‌اکسیدان و چربی‌های سالم است. در این مقاله به ۷ فایده علمی پسته می‌پردازیم.",
    date: "2024-12-15",
    tags: ["تغذیه", "پسته"],
  },
  {
    slug: "dried-fruit-storage",
    title: "راهنمای کامل نگه‌داری خشکبار در خانه",
    excerpt:
      "چگونه انجیر خشک، زردآلو و کشمش را تازه و خوش‌طعم نگه‌داریم؟ نکات عملی برای ماندگاری更长 و حفظ طعم.",
    date: "2024-12-10",
    tags: ["نگه‌داری", "خشکبار"],
  },
  {
    slug: "saffron-cooking",
    title: "زعفران در آشپزی ایرانی: از زرشک‌پلو به شله‌زرد",
    excerpt:
      "زعفران نگین چگونه رنگ و عطر می‌دهد؟ مقدار درست، روش دم‌کردن و کاربردهای آن در غذاهای ایرانی.",
    date: "2024-12-05",
    tags: ["آشپزی", "زعفران"],
  },
  {
    slug: "yalda-gift-guide",
    title: "هدیه شب یلدا: انتخاب هدیه‌ای فراموش‌نشدنی",
    excerpt:
      "یلدا، شب بلند سال. چگونه با هدیه‌ای لوکس از آجیل و خشکبار، این شب را برای عزیزانتان خاص کنیم؟",
    date: "2024-12-01",
    tags: ["هدیه", "یلدا"],
  },
];

export default function BlogPage() {
  return (
    <div className="bg-forest-950 min-h-screen">
      <div className="bg-forest-900 bg-kraft-texture py-12 lg:py-16">
        <div className="container-brand">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-ivory-50 mb-2">
            مجله شاه‌مغز
          </h1>
          <p className="text-ivory-400 max-w-2xl">
            مقالات تغذیه‌ای، دستور پخت، راهنمای نگه‌داری و داستان‌هایی از پشت صحنه آجیل و خشکبار
          </p>
        </div>
      </div>

      <div className="container-brand py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogPosts.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`group reveal-on-scroll ${i % 2 === 0 ? "sm:mt-0" : "sm:mt-8"}`}
            >
              <article className="h-full bg-forest-800/60 border border-forest-600/30 rounded-2xl overflow-hidden hover:border-gold-400/30 hover:shadow-xl hover:shadow-forest-950/40 transition-all duration-300">
                {/* Cover image placeholder */}
                <div className="aspect-[16/9] bg-gradient-to-br from-forest-700 to-forest-900 relative overflow-hidden">
                  {/* TODO: replace placeholder image */}
                  <div className="absolute inset-0 bg-linen-texture opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-ivory-400/30 text-sm">تصویر مقاله</span>
                  </div>
                </div>

                <div className="p-5 lg:p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-xs text-ivory-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-gold-400" />
                      {formatPersianDate(post.date)}
                    </span>
                  </div>

                  <h2 className="text-lg lg:text-xl font-display font-bold text-ivory-50 group-hover:text-gold-200 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-ivory-300 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-gold-200/70 bg-gold-400/10 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-sm text-gold-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      ادامه مطلب
                      <ArrowLeft size={14} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <HandDrawnDivider />
      </div>
    </div>
  );
}
