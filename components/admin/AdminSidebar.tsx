"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  Ticket, FileText, Settings, LogOut, Menu, X, Lock
} from "lucide-react";
import { useAdminStore } from "@/lib/admin-store";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "محصولات", icon: Package },
  { href: "/admin/orders", label: "سفارش‌ها", icon: ShoppingCart },
  { href: "/admin/customers", label: "مشتریان", icon: Users },
  { href: "/admin/discounts", label: "کدهای تخفیف", icon: Ticket },
  { href: "/admin/blog", label: "مجله", icon: FileText },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdminStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 start-4 z-50 p-2 rounded-lg bg-forest-800 border border-forest-600/40 text-ivory-200"
        aria-label="منوی مدیریت"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-forest-950/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:sticky top-0 bottom-0 z-40 w-64 h-screen bg-forest-900 border-e border-forest-700/40 flex flex-col transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-5 border-b border-forest-700/40">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center">
              <Lock size={18} className="text-gold-400" />
            </div>
            <div>
              <p className="text-sm font-display font-bold text-gold-200">شاه‌مغز</p>
              <p className="text-2xs text-ivory-400">پنل مدیریت</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive(item)
                    ? "bg-gold-400/10 text-gold-200 border border-gold-400/20"
                    : "text-ivory-300 hover:text-gold-200 hover:bg-forest-700/40"
                )}
              >
                <item.icon size={18} className="shrink-0" />
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-forest-700/40">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-ivory-300 hover:text-gold-200 hover:bg-forest-700/40 transition-all"
          >
            <LayoutDashboard size={18} />
            بازگشت به فروشگاه
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-burgundy-700 hover:bg-burgundy-700/10 transition-all"
          >
            <LogOut size={18} />
            خروج از پنل
          </button>
        </div>
      </aside>
    </>
  );
}
