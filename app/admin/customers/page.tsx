"use client";

import { Users, Phone, Mail, Calendar, ShoppingBag } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useOrderStore } from "@/lib/order-store";
import { useAddressStore } from "@/lib/address-store";
import { formatPrice, formatPersianDate, toPersianDigits } from "@/lib/format";

export default function AdminCustomersPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { orders } = useOrderStore();
  const { addresses } = useAddressStore();

  // In a real app, this would be a list of all customers from the database.
  // For now, we show the current logged-in user as a sample customer.
  const totalSpent = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const customers = [
    {
      name: user ? `${user.firstName} ${user.lastName}` : "کاربر نمونه",
      mobile: user?.mobile ?? "۰۹۱۲۳۴۵۶۷۸۹",
      email: user?.email ?? "",
      joinedAt: user?.createdAt ?? new Date().toISOString(),
      orders: orders.length,
      totalSpent,
      addresses: addresses.length,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-ivory-50">مشتریان</h1>
        <p className="text-sm text-ivory-400 mt-1">{toPersianDigits(customers.length)} مشتری</p>
      </div>

      {/* Customers grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((c, i) => (
          <div
            key={i}
            className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5 flex flex-col gap-4"
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center">
                <Users size={20} className="text-gold-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-ivory-100">{c.name}</p>
                <p className="text-xs text-ivory-400">{formatPersianDate(c.joinedAt)}</p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-ivory-300">
                <Phone size={14} className="text-gold-400/60" />
                {toPersianDigits(c.mobile)}
              </div>
              {c.email && (
                <div className="flex items-center gap-2 text-ivory-300">
                  <Mail size={14} className="text-gold-400/60" />
                  {c.email}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-forest-600/20">
              <div className="text-center">
                <p className="text-lg font-bold text-gold-200">{toPersianDigits(c.orders)}</p>
                <p className="text-2xs text-ivory-400">سفارش</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gold-200">{toPersianDigits(c.addresses)}</p>
                <p className="text-2xs text-ivory-400">آدرس</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gold-200">{formatPrice(c.totalSpent, false)}</p>
                <p className="text-2xs text-ivory-400">خرج‌شده</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state hint */}
      <div className="bg-forest-800/30 border border-forest-600/20 rounded-2xl p-5 text-center">
        <p className="text-sm text-ivory-400">
          در محیط تولید، لیست کامل مشتریان از پایگاه داده بارگذاری می‌شود.
          در حال حاضر، مشتریانی که وارد حساب کاربری شده‌اند در اینجا نمایش داده می‌شوند.
        </p>
      </div>
    </div>
  );
}
