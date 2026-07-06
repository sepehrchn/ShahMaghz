"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Package, MapPin, Clock, Truck, CheckCircle, XCircle, Save } from "lucide-react";
import { useOrderStore, type OrderStatus } from "@/lib/order-store";
import { formatPrice, formatPersianDateTime, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const statusOptions: { value: OrderStatus; label: string; icon: typeof Clock }[] = [
  { value: "PENDING", label: "در انتظار بررسی", icon: Clock },
  { value: "PROCESSING", label: "در حال پردازش", icon: Package },
  { value: "SHIPPED", label: "ارسال شده", icon: Truck },
  { value: "DELIVERED", label: "تحویل شده", icon: CheckCircle },
  { value: "CANCELLED", label: "لغو شده", icon: XCircle },
];

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { orders, cancelOrder } = useOrderStore();
  const order = orders.find((o) => o.id === id);
  const [saved, setSaved] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.status ?? "PENDING");

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Package size={40} className="text-ivory-400/40 mb-4" />
        <p className="text-ivory-300 font-medium">سفارش یافت نشد</p>
        <Link href="/admin/orders" className="mt-4">
          <Button variant="outline">بازگشت به سفارش‌ها</Button>
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/orders" className="text-ivory-400 hover:text-gold-200">
            <ArrowRight size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-ivory-50">{order.orderNumber}</h1>
            <p className="text-xs text-ivory-400 mt-0.5">{formatPersianDateTime(order.createdAt)}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
            <h2 className="text-sm font-display font-bold text-gold-200 mb-4">اقلام سفارش</h2>
            <div className="flex flex-col gap-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b border-forest-600/20 last:border-0 last:pb-0">
                  <div className="w-12 h-12 rounded-xl bg-forest-700/60 border border-forest-500/30 flex items-center justify-center shrink-0">
                    <Package size={16} className="text-ivory-400/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ivory-100">{item.productName}</p>
                    <p className="text-xs text-ivory-400">
                      {item.variantLabel} — {toPersianDigits(item.quantity)} عدد × {formatPrice(item.unitPrice, false)}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gold-200 shrink-0">
                    {formatPrice(item.totalPrice, false)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
            <h2 className="text-sm font-display font-bold text-gold-200 mb-4 flex items-center gap-2">
              <MapPin size={16} />
              آدرس ارسال
            </h2>
            <div className="text-sm text-ivory-300 flex flex-col gap-1">
              <p className="font-medium text-ivory-100">{order.shippingInfo.recipient}</p>
              <p>{toPersianDigits(order.shippingInfo.mobile)}</p>
              <p>{order.shippingInfo.province}، {order.shippingInfo.city}</p>
              <p className="text-ivory-400 text-xs">{order.shippingInfo.addressLine}</p>
              <p className="text-xs text-ivory-400/60">کد پستی: {toPersianDigits(order.shippingInfo.postalCode)}</p>
              {order.customerNote && (
                <p className="text-xs text-ivory-400 mt-2 pt-2 border-t border-forest-600/20">
                  یادداشت: {order.customerNote}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5">
            <h3 className="text-sm font-display font-bold text-gold-200 mb-4">مدیریت وضعیت</h3>
            <div className="flex flex-col gap-2">
              {statusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setCurrentStatus(opt.value)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-start",
                    currentStatus === opt.value
                      ? "bg-gold-400/10 text-gold-200 border border-gold-400/30"
                      : "text-ivory-400 hover:text-ivory-200 hover:bg-forest-600/30 border border-transparent"
                  )}
                >
                  <opt.icon size={16} />
                  {opt.label}
                </button>
              ))}
            </div>
            <Button onClick={handleSave} fullWidth size="sm" className="mt-4 gap-2">
              <Save size={14} />
              {saved ? "ذخیره شد ✓" : "ذخیره وضعیت"}
            </Button>
          </div>

          <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5">
            <h3 className="text-sm font-display font-bold text-gold-200 mb-4">خلاصه مالی</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ivory-400">جمع اقلام</span>
                <span className="text-ivory-200">{formatPrice(order.subtotal, false)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-400">ارسال</span>
                <span className="text-ivory-200">
                  {order.shippingCost === 0 ? "رایگان" : formatPrice(order.shippingCost, false)}
                </span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between">
                  <span className="text-ivory-400">تخفیف</span>
                  <span className="text-green-400">{formatPrice(order.discountAmount, false)}-</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-forest-600/30 mt-2">
                <span className="text-ivory-100 font-medium">مبلغ نهایی</span>
                <span className="text-gold-200 font-bold">{formatPrice(order.totalAmount, false)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
