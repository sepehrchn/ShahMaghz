"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, MapPin, Clock, Truck, CheckCircle, XCircle, ArrowRight, Trash2 } from "lucide-react";
import { useOrderStore, type OrderStatus } from "@/lib/order-store";
import { formatPrice, formatPersianDateTime, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import { cn } from "@/lib/utils";

const statusConfig: Record<OrderStatus, { label: string; icon: typeof Clock; color: string; bgColor: string }> = {
  PENDING: { label: "در انتظار بررسی", icon: Clock, color: "text-gold-300", bgColor: "bg-gold-400/10" },
  PROCESSING: { label: "در حال پردازش", icon: Package, color: "text-blue-400", bgColor: "bg-blue-400/10" },
  SHIPPED: { label: "ارسال شده", icon: Truck, color: "text-cyan-400", bgColor: "bg-cyan-400/10" },
  DELIVERED: { label: "تحویل شده", icon: CheckCircle, color: "text-green-400", bgColor: "bg-green-400/10" },
  CANCELLED: { label: "لغو شده", icon: XCircle, color: "text-burgundy-700", bgColor: "bg-burgundy-700/10" },
};

interface OrderDetailProps {
  orderId: string;
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  const router = useRouter();
  const { getOrderById, cancelOrder } = useOrderStore();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-forest-700/50 flex items-center justify-center mb-4">
          <Package size={32} className="text-ivory-400/40" />
        </div>
        <p className="text-ivory-300 font-medium mb-1">سفارش یافت نشد</p>
        <p className="text-sm text-ivory-400/60 mb-4">
          ممکن است سفارش حذف شده باشد یا شناسه اشتباه باشد
        </p>
        <Link href="/account/orders">
          <Button variant="outline">بازگشت به سفارش‌ها</Button>
        </Link>
      </div>
    );
  }

  const status = statusConfig[order.status];
  const StatusIcon = status.icon;
  const canCancel = order.status === "PENDING" || order.status === "PROCESSING";

  const handleCancel = () => {
    cancelOrder(order.id);
    setShowCancelConfirm(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Back link */}
      <Link
        href="/account/orders"
        className="flex items-center gap-2 text-sm text-ivory-400 hover:text-gold-200 transition-colors"
      >
        <ArrowRight size={16} />
        بازگشت به سفارش‌ها
      </Link>

      {/* Order header */}
      <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-display font-bold text-ivory-50">
                {order.orderNumber}
              </h2>
              <span className={cn("text-xs flex items-center gap-1 px-3 py-1 rounded-full", status.color, status.bgColor)}>
                <StatusIcon size={12} />
                {status.label}
              </span>
            </div>
            <p className="text-xs text-ivory-400">
              {formatPersianDateTime(order.createdAt)}
            </p>
          </div>

          {canCancel && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowCancelConfirm(true)}
              className="gap-2"
            >
              <Trash2 size={14} />
              لغو سفارش
            </Button>
          )}
        </div>
      </div>

      {/* Order items */}
      <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
        <h3 className="text-sm font-display font-bold text-gold-200 mb-4">
          اقلام سفارش
        </h3>
        <div className="flex flex-col gap-4">
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 pb-4 border-b border-forest-600/20 last:border-0 last:pb-0"
            >
              <div className="w-14 h-14 rounded-xl bg-forest-700/60 border border-forest-500/30 overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/product/${item.productSlug}`}
                  className="text-sm font-medium text-ivory-100 hover:text-gold-200 transition-colors"
                >
                  {item.productName}
                </Link>
                <p className="text-xs text-ivory-400 mt-0.5">
                  {item.variantLabel} — {toPersianDigits(item.quantity)} عدد
                </p>
              </div>
              <div className="text-end shrink-0">
                <p className="text-sm font-medium text-gold-200">
                  {formatPrice(item.totalPrice)}
                </p>
                <p className="text-xs text-ivory-400">
                  {formatPrice(item.unitPrice)} × {toPersianDigits(item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping address */}
      <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
        <h3 className="text-sm font-display font-bold text-gold-200 mb-4 flex items-center gap-2">
          <MapPin size={16} />
          آدرس ارسال
        </h3>
        <div className="text-sm text-ivory-300 flex flex-col gap-1">
          <p className="font-medium text-ivory-100">{order.shippingInfo.recipient}</p>
          <p>{toPersianDigits(order.shippingInfo.mobile)}</p>
          <p>
            {order.shippingInfo.province}، {order.shippingInfo.city}
          </p>
          <p className="text-ivory-400 text-xs leading-relaxed">
            {order.shippingInfo.addressLine}
          </p>
          <p className="text-xs text-ivory-400/60">
            کد پستی: {toPersianDigits(order.shippingInfo.postalCode)}
          </p>
        </div>
      </div>

      {/* Order summary */}
      <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
        <h3 className="text-sm font-display font-bold text-gold-200 mb-4">
          خلاصه سفارش
        </h3>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ivory-400">جمع کل اقلام</span>
            <span className="text-ivory-200">{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ivory-400">هزینه ارسال</span>
            <span className="text-ivory-200">
              {order.shippingCost === 0 ? "رایگان" : formatPrice(order.shippingCost)}
            </span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between">
              <span className="text-ivory-400">تخفیف</span>
              <span className="text-green-400">{formatPrice(order.discountAmount)}-</span>
            </div>
          )}
          {order.customerNote && (
            <div className="pt-3 border-t border-forest-600/20">
              <p className="text-xs text-ivory-400 mb-1">یادداشت:</p>
              <p className="text-sm text-ivory-300">{order.customerNote}</p>
            </div>
          )}
          <div className="flex justify-between pt-3 border-t border-forest-600/30 mt-2">
            <span className="text-base font-medium text-ivory-100">مبلغ نهایی</span>
            <span className="text-xl font-bold text-gold-200">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Cancel confirmation modal */}
      <Modal
        isOpen={showCancelConfirm}
        onClose={() => setShowCancelConfirm(false)}
        title="لغو سفارش"
      >
        <p className="text-sm text-ivory-300 mb-5">
          آیا از لغو این سفارش اطمینان دارید؟ این عملیات قابل بازگشت نیست.
        </p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleCancel} className="gap-2">
            <XCircle size={16} />
            بله، لغو کن
          </Button>
          <Button variant="ghost" onClick={() => setShowCancelConfirm(false)}>
            انصراف
          </Button>
        </div>
      </Modal>
    </div>
  );
}
