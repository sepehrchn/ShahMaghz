"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Clock, Truck, CheckCircle, XCircle, Package } from "lucide-react";
import { useOrderStore, type OrderStatus } from "@/lib/order-store";
import { formatPrice, formatPersianDate, toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  PENDING: { label: "در انتظار", color: "text-gold-300 bg-gold-400/10" },
  PROCESSING: { label: "در حال پردازش", color: "text-blue-400 bg-blue-400/10" },
  SHIPPED: { label: "ارسال شده", color: "text-cyan-400 bg-cyan-400/10" },
  DELIVERED: { label: "تحویل شده", color: "text-green-400 bg-green-400/10" },
  CANCELLED: { label: "لغو شده", color: "text-burgundy-700 bg-burgundy-700/10" },
};

const statusFilters: { key: OrderStatus | "ALL"; label: string }[] = [
  { key: "ALL", label: "همه" },
  { key: "PENDING", label: "در انتظار" },
  { key: "PROCESSING", label: "در حال پردازش" },
  { key: "SHIPPED", label: "ارسال شده" },
  { key: "DELIVERED", label: "تحویل شده" },
  { key: "CANCELLED", label: "لغو شده" },
];

export default function AdminOrdersPage() {
  const { orders } = useOrderStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingInfo.recipient.includes(search) ||
      o.shippingInfo.mobile.includes(search);
    const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-ivory-50">مدیریت سفارش‌ها</h1>
        <p className="text-sm text-ivory-400 mt-1">{toPersianDigits(orders.length)} سفارش</p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute top-1/2 -translate-y-1/2 start-4 text-ivory-400/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو بر اساس شماره سفارش، نام یا موبایل..."
            className="w-full ps-12 pe-4 py-3 rounded-xl bg-forest-800/60 border border-forest-500/40 text-ivory-100 placeholder:text-ivory-400/50 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {statusFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatusFilter(f.key)}
            className={cn(
              "text-sm px-4 py-2 rounded-lg border transition-all",
              statusFilter === f.key
                ? "border-gold-400/40 text-gold-200 bg-gold-400/10"
                : "border-forest-500/40 text-ivory-400 hover:text-ivory-200"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-ivory-400 border-b border-forest-600/30 bg-forest-900/40">
                <th className="text-start p-4 font-medium">شماره سفارش</th>
                <th className="text-start p-4 font-medium">مشتری</th>
                <th className="text-start p-4 font-medium">تاریخ</th>
                <th className="text-start p-4 font-medium">اقلام</th>
                <th className="text-start p-4 font-medium">مبلغ</th>
                <th className="text-start p-4 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-ivory-400">
                    <ShoppingCart size={32} className="mx-auto mb-2 opacity-40" />
                    سفارشی یافت نشد
                  </td>
                </tr>
              ) : (
                filtered.map((order) => {
                  const status = statusConfig[order.status];
                  return (
                    <tr key={order.id} className="border-b border-forest-600/20 last:border-0 hover:bg-forest-700/20">
                      <td className="p-4">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-gold-200 hover:text-gold-100 font-medium"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="p-4">
                        <p className="text-ivory-200">{order.shippingInfo.recipient}</p>
                        <p className="text-xs text-ivory-400">{toPersianDigits(order.shippingInfo.mobile)}</p>
                      </td>
                      <td className="p-4 text-ivory-400 text-xs">{formatPersianDate(order.createdAt)}</td>
                      <td className="p-4 text-ivory-300">{toPersianDigits(order.items.length)} کالا</td>
                      <td className="p-4 text-gold-200 font-medium">{formatPrice(order.totalAmount, false)}</td>
                      <td className="p-4">
                        <span className={cn("text-xs px-2 py-1 rounded-full", status.color)}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
