"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Package, MapPin, LogOut, Home } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { cn } from "@/lib/utils";
import { toPersianDigits } from "@/lib/format";

const navItems = [
  { href: "/account", label: "پروفایل", icon: User, exact: true },
  { href: "/account/orders", label: "سفارش‌های من", icon: Package },
  { href: "/account/addresses", label: "آدرس‌های من", icon: MapPin },
];

export function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-forest-800/60 border border-forest-600/30 rounded-2xl p-5 sticky top-24">
        {/* User info */}
        <div className="flex items-center gap-3 pb-5 mb-4 border-b border-forest-600/30">
          <div className="w-12 h-12 rounded-full bg-gold-400/15 border border-gold-400/30 flex items-center justify-center shrink-0">
            <User size={20} className="text-gold-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-ivory-100 truncate">
              {user ? `${user.firstName} ${user.lastName}` : "کاربر"}
            </p>
            <p className="text-xs text-ivory-400 truncate">
              {user ? toPersianDigits(user.mobile) : ""}
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gold-400/10 text-gold-200 border border-gold-400/20"
                    : "text-ivory-300 hover:text-gold-200 hover:bg-forest-600/40"
                )}
              >
                <item.icon size={18} className="shrink-0" />
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-ivory-300 hover:text-gold-200 hover:bg-forest-600/40 transition-all duration-200"
          >
            <Home size={18} className="shrink-0" />
            بازگشت به فروشگاه
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-burgundy-700 hover:bg-burgundy-700/10 transition-all duration-200 text-start"
          >
            <LogOut size={18} className="shrink-0" />
            خروج از حساب
          </button>
        </nav>
      </div>
    </aside>
  );
}
