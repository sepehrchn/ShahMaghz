"use client";

import { Package, ShoppingCart, Users, Ticket, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { useProductStore } from "@/lib/product-store";
import { useOrderStore } from "@/lib/order-store";
import { useAuthStore } from "@/lib/auth-store";
import { useDiscountStore } from "@/lib/discount-store";
import { StatCard } from "@/components/admin/StatCard";
import { formatPrice, formatPersianDate, toPersianDigits } from "@/lib/format";
import Link from "next/link";
import { cn } from "@/lib/utils";

const orderStatusLabels: Record<string, string> = {
  PENDING: "در انتظار",
  PROCESSING: "در حال پردازش",
  SHIPPED: "ارسال شده",
  DELIVERED: "تحویل شده",
  CANCELLED: "لغو شده",
};

const statusColors: Record<string, string> = {
  PENDING: "text-gold-300 bg-gold-400/10",
  PROCESSING: "text-blue-400 bg-blue-400/10",
  SHIPPED: "text-cyan-400 bg-cyan-400/10",
  DELIVERED: "text-green-400 bg-green-400/10",
  CANCELLED: "text-burgundy-700 bg-burgundy-700/10",
};

export default function AdminDashboard() {
  const { products } = useProductStore();
  const { orders } = useOrderStore();
  const { codes } = useDiscountStore();

  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrders = orders.filter((o) => o.status === "PENDING");
  const lowStockProducts = products.filter((p) =>
    p.variants.some((v) => v.stock <= 5)
  );

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-ivory-50">داشبورد مدیریت</h1>
        <p className="text-sm text-ivory-400 mt-1">نمای کلی فروشگاه شاه‌مغز</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="درآمد کل"
          value={formatPrice(totalRevenue, false)}
          icon={TrendingUp}
          href="/admin/orders"
          trend={orders.length > 0 ? "فعال" : undefined}
        />
        <StatCard
          label="سفارش‌ها"
          value={toPersianDigits(orders.length)}
          icon={ShoppingCart}
          href="/admin/orders"
        />
        <StatCard
          label="محصولات"
          value={toPersianDigits(products.length)}
          icon={Package}
          href="/admin/products"
        />
        <StatCard
          label="کدهای تخفیف"
          value={toPersianDigits(codes.filter((c) => c.isActive).length)}
          icon={Ticket}
          href="/admin/discounts"
        />
      </div>

      {/* Alerts */}
      {(pendingOrders.length > 0 || lowStockProducts.length > 0) && (
        <div className="grid sm:grid-cols-2 gap-4">
          {pendingOrders.length > 0 && (
            <div className="bg-gold-400/5 border border-gold-400/20 rounded-2xl p-5 flex items-start gap-3">
              <Clock size={20} className="text-gold-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gold-200">
                  {toPersianDigits(pendingOrders.length)} سفارش در انتظار بررسی
                </p>
                <Link href="/admin/orders" className="text-xs text-gold-300 hover:text-gold-200 mt-1 inline-block">
                  مشاهده و بررسی →
                </Link>
              </div>
            </div>
          )}
          {lowStockProducts.length > 0 && (
            <div className="bg-burgundy-700/5 border border-burgundy-700/20 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle size={20} className="text-burgundy-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-burgundy-700">
                  {toPersianDigits(lowStockProducts.length)} محصول با موجودی کم
                </p>
                <Link href="/admin/products" className="text-xs text-burgundy-700/80 hover:text-burgundy-700 mt-1 inline-block">
                  مدیریت موجودی →
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recent orders */}
      <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-display font-bold text-gold-200">آخرین سفارش‌ها</h2>
          <Link href="/admin/orders" className="text-xs text-gold-200 hover:text-gold-100">
            همه سفارش‌ها →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-sm text-ivory-400 text-center py-8">هنوز سفارشی ثبت نشده است</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-ivory-400 border-b border-forest-600/30">
                  <th className="text-start py-3 font-medium">شماره سفارش</th>
                  <th className="text-start py-3 font-medium">تاریخ</th>
                  <th className="text-start py-3 font-medium">تعداد اقلام</th>
                  <th className="text-start py-3 font-medium">مبلغ</th>
                  <th className="text-start py-3 font-medium">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-forest-600/20 last:border-0">
                    <td className="py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-gold-200 hover:text-gold-100 font-medium"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3 text-ivory-400 text-xs">
                      {formatPersianDate(order.createdAt)}
                    </td>
                    <td className="py-3 text-ivory-300">
                      {toPersianDigits(order.items.length)}
                    </td>
                    <td className="py-3 text-ivory-200 font-medium">
                      {formatPrice(order.totalAmount, false)}
                    </td>
                    <td className="py-3">
                      <span className={cn("text-xs px-2 py-1 rounded-full", statusColors[order.status])}>
                        {orderStatusLabels[order.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link
          href="/admin/products"
          className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5 hover:border-gold-400/20 transition-all flex items-center gap-3"
        >
          <Package size={20} className="text-gold-400" />
          <span className="text-sm text-ivory-200">مدیریت محصولات</span>
        </Link>
        <Link
          href="/admin/orders"
          className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5 hover:border-gold-400/20 transition-all flex items-center gap-3"
        >
          <ShoppingCart size={20} className="text-gold-400" />
          <span className="text-sm text-ivory-200">مدیریت سفارش‌ها</span>
        </Link>
        <Link
          href="/admin/discounts"
          className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5 hover:border-gold-400/20 transition-all flex items-center gap-3"
        >
          <Ticket size={20} className="text-gold-400" />
          <span className="text-sm text-ivory-200">کدهای تخفیف</span>
        </Link>
      </div>
    </div>
  );
}
