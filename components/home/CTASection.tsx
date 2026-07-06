import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-16 lg:py-20 bg-forest-900 bg-kraft-texture relative overflow-hidden">
      <div className="container-brand">
        <div className="relative rounded-3xl bg-gradient-to-br from-forest-800 to-forest-950 border border-gold-400/20 overflow-hidden p-8 lg:p-14 reveal-on-scroll">
          {/* Texture */}
          <div className="absolute inset-0 bg-linen-texture opacity-20" />

          {/* Decorative gold circle */}
          <div className="absolute -top-20 -end-20 w-64 h-64 rounded-full bg-gold-400/5 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-xl">
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-ivory-50 text-balance">
                باشگاه مشتریان شاه‌مغز را تجربه کنید
              </h2>
              <p className="text-ivory-300 leading-relaxed">
                با هر خرید امتیاز جمع کنید، به طبقات ویژه برسید و از کدهای تخفیف
                انحصاری و ارسال رایگان بهره‌مند شوید.
              </p>
            </div>

            <Link href="/loyalty" className="shrink-0">
              <Button size="lg" className="gap-2">
                عضویت در باشگاه
                <ArrowLeft size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
