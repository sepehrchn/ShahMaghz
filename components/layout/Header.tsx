"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Search, Phone } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/category/nuts", label: "آجیل" },
  { href: "/category/dried-fruits", label: "خشکبار" },
  { href: "/category/chocolate-dipped", label: "شکلاتی و شیرینی" },
  { href: "/category/gift-boxes", label: "جعبه‌های هدیه" },
  { href: "/blog", label: "مجله" },
  { href: "/about", label: "درباره ما" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.getTotalItems());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-forest-950 border-b border-forest-700/40 text-ivory-400 text-xs">
        <div className="container-brand flex items-center justify-between py-2">
          <span className="flex items-center gap-1.5">
            <Phone size={12} className="text-gold-400" />
            <span>پشتیبانی: ۰۲۱-۸۸۷۷۶۶۵۵</span>
          </span>
          <span className="hidden sm:inline">ارسال رایگان برای سفارش‌های بالای ۵۰۰ هزار تومان</span>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-forest-900/95 backdrop-blur-md border-b border-forest-600/30 shadow-lg shadow-forest-950/30"
            : "bg-forest-900/80 backdrop-blur-sm"
        )}
      >
        <div className="container-brand flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-display font-bold text-gold-200 leading-none">
                شاه‌مغز
              </span>
              <span className="text-2xs text-ivory-400 mt-0.5 tracking-wider">
                ShahMaghz
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "text-gold-200 bg-gold-400/10"
                      : "text-ivory-200 hover:text-gold-200 hover:bg-forest-600/40"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg text-ivory-300 hover:text-gold-200 hover:bg-forest-600/40 transition-all"
              aria-label="جستجو"
            >
              <Search size={20} />
            </button>

            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg text-ivory-300 hover:text-gold-200 hover:bg-forest-600/40 transition-all"
              aria-label="سبد خرید"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -left-1 bg-gold-400 text-forest-950 text-2xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {toPersianDigits(totalItems)}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-ivory-300 hover:text-gold-200 hover:bg-forest-600/40 transition-all"
              aria-label="منو"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden bg-forest-900 border-t border-forest-700/40 animate-slide-up">
            <div className="container-brand py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-lg transition-all",
                      isActive
                        ? "text-gold-200 bg-gold-400/10"
                        : "text-ivory-200 hover:text-gold-200 hover:bg-forest-600/40"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
