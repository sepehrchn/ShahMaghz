import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";

export const metadata: Metadata = {
  title: "تسویه حساب",
  description: "تکمیل سفارش در شاه‌مغز — اطلاعات ارسال و ثبت سفارش",
};

export default function CheckoutPage() {
  return (
    <div className="bg-forest-950 min-h-screen">
      <div className="container-brand py-8">
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-ivory-50 mb-6">
          تسویه حساب
        </h1>
        <CheckoutFlow />
      </div>
    </div>
  );
}
