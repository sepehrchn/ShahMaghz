import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export const metadata: Metadata = {
  title: "تسویه حساب",
  description: "تکمیل سفارش در شاه‌مغز",
};

// Note: This is a Phase 2 placeholder page.
// Full checkout flow with ZarinPal integration will be implemented in Phase 2.

export default function CheckoutPage() {
  return (
    <div className="bg-forest-950 min-h-screen">
      <div className="container-brand py-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-ivory-50 mb-6">
          تسویه حساب
        </h1>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form — 7 cols */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Step 1: Shipping info */}
            <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-sm font-bold text-gold-200">
                  {toPersianDigits(1)}
                </span>
                <h2 className="text-lg font-display font-bold text-ivory-100">
                  اطلاعات تحویل
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="نام گیرنده" name="recipientName" placeholder="نام" />
                <Input label="شماره موبایل" name="recipientMobile" placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
                <Input label="استان" name="province" placeholder="تهران" />
                <Input label="شهر" name="city" placeholder="تهران" />
                <div className="sm:col-span-2">
                  <Input label="آدرس کامل" name="address" placeholder="خیابان، کوچه، پلاک" />
                </div>
                <Input label="کد پستی" name="postalCode" placeholder="کد پستی ۱۰ رقمی" />
              </div>
            </div>

            {/* Step 2: Discount code */}
            <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-sm font-bold text-gold-200">
                  {toPersianDigits(2)}
                </span>
                <h2 className="text-lg font-display font-bold text-ivory-100">
                  کد تخفیف
                </h2>
              </div>

              <div className="flex gap-3">
                <Input name="discountCode" placeholder="کد تخفیف خود را وارد کنید" />
                <Button variant="secondary" className="shrink-0">
                  اعمال
                </Button>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-8 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-sm font-bold text-gold-200">
                  {toPersianDigits(3)}
                </span>
                <h2 className="text-lg font-display font-bold text-ivory-100">
                  پرداخت
                </h2>
              </div>

              <div className="bg-forest-900/50 border border-gold-400/20 rounded-xl p-4 flex items-center gap-3">
                <input type="radio" id="zarinpal" name="payment" defaultChecked className="accent-gold-400" />
                <label htmlFor="zarinpal" className="text-sm text-ivory-200">
                  پرداخت آنلاین از طریق درگاه زرین‌پال
                </label>
              </div>
            </div>
          </div>

          {/* Order summary — 5 cols */}
          <div className="lg:col-span-5">
            <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-display font-bold text-ivory-100 mb-5">
                خلاصه سفارش
              </h2>

              <div className="flex flex-col gap-3 mb-5">
                {/* Placeholder items — cart will be connected in Phase 2 */}
                <div className="flex items-center gap-3 text-sm text-ivory-400">
                  <ShoppingBag size={16} className="text-gold-400/50" />
                  <span>سبد خرید شما در اینجا نمایش داده می‌شود</span>
                </div>
              </div>

              <div className="border-t border-forest-600/30 pt-4 flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-ivory-400">جمع کل</span>
                  <span className="text-ivory-200">—</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory-400">هزینه ارسال</span>
                  <span className="text-ivory-200">در مرحله بعد محاسبه می‌شود</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory-400">تخفیف</span>
                  <span className="text-ivory-200">—</span>
                </div>
              </div>

              <div className="border-t border-forest-600/30 mt-4 pt-4 flex items-center justify-between">
                <span className="text-base font-medium text-ivory-100">مبلغ نهایی</span>
                <span className="text-xl font-bold text-gold-200">—</span>
              </div>

              <Button size="lg" fullWidth className="mt-5">
                پرداخت و ثبت سفارش
              </Button>

              <p className="text-xs text-ivory-400/60 text-center mt-3">
                با کلیک روی «پرداخت»، به درگاه امن زرین‌پال منتقل می‌شوید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
