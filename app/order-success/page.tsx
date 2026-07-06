import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Package, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "سفارش ثبت شد",
  description: "سفارش شما با موفقیت ثبت شد",
};

export default function OrderSuccessPage() {
  return (
    <div className="bg-forest-950 min-h-screen flex items-center justify-center">
      <div className="container-brand">
        <div className="max-w-lg mx-auto text-center flex flex-col items-center gap-6 py-12">
          <div className="w-24 h-24 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center animate-scale-in">
            <CheckCircle size={44} className="text-green-400" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl lg:text-3xl font-display font-bold text-ivory-50">
              سفارش شما با موفقیت ثبت شد
            </h1>
            <p className="text-ivory-300">
              همکاران ما در کوتاه‌ترین زمان سفارش شما را بررسی و ارسال خواهند کرد.
            </p>
          </div>

          <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5 w-full text-start">
            <p className="text-sm text-ivory-300 leading-relaxed">
              می‌توانید وضعیت سفارش خود را از طریق صفحه «سفارش‌های من» پیگیری کنید.
              شماره سفارش در آن صفحه نمایش داده می‌شود.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/account/orders" className="flex-1">
              <Button fullWidth size="lg" className="gap-2">
                <Package size={18} />
                پیگیری سفارش
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" fullWidth size="lg" className="gap-2">
                <Home size={18} />
                بازگشت به فروشگاه
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
