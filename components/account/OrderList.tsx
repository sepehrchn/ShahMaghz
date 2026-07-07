"use client";

import Link from "next/link";
import { Package, ChevronLeft, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import { useOrderStore, type OrderStatus } from "@/lib/order-store";
import { formatPrice, formatPersianDate, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Clock; color: string }> = {
  PENDING: { label: "در انتظار بررسی", icon: Clock, color: "text-gold-300" },
  PROCESSING: { label: "در حال پردازش", icon: Package, color: "text-blue-400" },
  SHIPPED: { label: "ارسال شده", icon: Truck, color: "text-cyan-400" },
  DELIVERED: { label: "تحویل شده", icon: CheckCircle, color: "text-green-400" },
  CANCELLED: { label: "لغو شده", icon: XCircle, color: "text-burgundy-700" },
};

export function OrderList() {
  const { orders } = useOrderStore();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-forest-700/50 flex items-center justify-center mb-4">
          <Package size={32} className="text-ivory-400/40" />
        </div>
        <p className="text-ivory-300 font-medium mb-1">هنوز سفارشی ثبت نکرده‌اید</p>
        <p className="text-sm text-ivory-400/60 mb-4">
          سفارش‌های شما پس از خرید در اینجا نمایش داده می‌شوند
        </p>
        <Link href="/">
          <Button className="gap-2">
            شروع خرید
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-display font-bold text-ivory-50">
        سفارش‌های من
        <span className="text-sm text-ivory-400 font-sans mr-2">
          ({toPersianDigits(orders.length)} سفارش)
        </span>
      </h2>

      <div className="flex flex-col gap-3">
        {orders.map((order) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;

          return (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="group bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5 hover:border-gold-400/20 hover:shadow-lg hover:shadow-forest-950/30 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Order info */}
                <div className="flex flex-col gap-2 min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-display font-bold text-gold-200">
                      {order.orderNumber}
                    </span>
                    <span className={`text-xs flex items-center gap-1 ${status.color}`}>
                      <StatusIcon size={12} />
                      {status.label}
                    </span>
                  </div>

                  <p className="text-xs text-ivory-400">
                    {formatPersianDate(order.createdAt)}
                  </p>

                  {/* Items summary */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex -space-x-2">
                      {order.items.slice(0, 3).map((item, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-lg bg-forest-700/60 border border-forest-500/30 overflow-hidden"
                        >
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-xs text-ivory-400">
                      {toPersianDigits(order.items.length)} کالا
                    </span>
                  </div>
                </div>

                {/* Price + arrow */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className="text-lg font-bold text-gold-200">
                    {formatPrice(order.totalAmount)}
                  </span>
                  <ChevronLeft
                    size={18}
                    className="text-ivory-400 group-hover:text-gold-200 transition-colors"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
