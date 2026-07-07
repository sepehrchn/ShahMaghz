"use client";

import Link from "next/link";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } =
    useCartStore();

  const subtotal = getSubtotal();

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-forest-950/80 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Drawer — slides from left (RTL: visually from right edge) */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 start-0 z-50 w-full max-w-md bg-forest-900 border-e border-forest-600/40 shadow-2xl transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-forest-600/40">
          <h2 className="text-lg font-display font-bold text-ivory-100 flex items-center gap-2">
            <ShoppingBag size={20} className="text-gold-400" />
            سبد خرید
            {items.length > 0 && (
              <span className="text-sm text-ivory-400 font-sans">
                ({toPersianDigits(items.length)} کالا)
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg text-ivory-400 hover:text-gold-200 hover:bg-forest-600/50 transition-all"
            aria-label="بستن"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-forest-700/50 flex items-center justify-center">
                <ShoppingBag size={32} className="text-ivory-400/50" />
              </div>
              <div>
                <p className="text-ivory-300 font-medium">سبد خرید شما خالی است</p>
                <p className="text-sm text-ivory-400/60 mt-1">
                  محصولات مورد علاقه را به سبد اضافه کنید
                </p>
              </div>
              <Button onClick={closeCart} variant="outline" size="sm">
                مشاهده محصولات
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.variantId}
                  className="flex gap-3 bg-forest-800/60 rounded-xl p-3 border border-forest-600/30"
                >
                  {/* Product image */}
                  <div className="w-16 h-16 rounded-lg bg-forest-700/60 border border-forest-500/30 shrink-0 overflow-hidden flex items-center justify-center">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ShoppingBag size={20} className="text-ivory-400/40" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-ivory-100 truncate">
                      {item.productName}
                    </h3>
                    <p className="text-xs text-ivory-400 mt-0.5">{item.variantLabel}</p>
                    <p className="text-sm text-gold-200 font-semibold mt-1">
                      {formatPrice(item.price)}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-forest-600/50 text-ivory-300 hover:bg-forest-500 hover:text-gold-200 flex items-center justify-center transition-all"
                          aria-label="افزایش"
                        >
                          <Plus size={14} />
                        </button>
                        <span className="text-sm font-medium text-ivory-100 w-6 text-center">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(item.variantId, item.quantity - 1)
                              : removeItem(item.variantId)
                          }
                          className="w-7 h-7 rounded-lg bg-forest-600/50 text-ivory-300 hover:bg-forest-500 hover:text-gold-200 flex items-center justify-center transition-all"
                          aria-label="کاهش"
                        >
                          <Minus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-ivory-400/50 hover:text-burgundy-700 transition-colors p-1"
                        aria-label="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer with subtotal */}
        {items.length > 0 && (
          <div className="p-5 border-t border-forest-600/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-ivory-300">مجموع</span>
              <span className="text-lg font-bold text-gold-200">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-xs text-ivory-400/60">
              هزینه ارسال در مرحله تسویه حساب محاسبه می‌شود
            </p>
            <Link href="/checkout" onClick={closeCart} className="block">
              <Button fullWidth size="lg">
                ادامه فرآیند خرید
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
