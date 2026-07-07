"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ShoppingBag, Star, Plus, SlidersHorizontal, X } from "lucide-react";
import { type MockProduct } from "@/lib/mock-data";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { WaxSeal } from "@/components/ui/BrandMotifs";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: MockProduct[];
  categoryName: string;
}

type SortOption = "default" | "price-asc" | "price-desc" | "rating";

export function ProductGrid({ products: initialProducts, categoryName }: ProductGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const addItem = useCartStore((s) => s.addItem);

  const filtered = useMemo(() => {
    let result = [...initialProducts];

    // Stock filter
    if (selectedStock.length > 0) {
      result = result.filter((p) => selectedStock.includes(p.stockStatus));
    }

    // Price filter (based on min variant price)
    result = result.filter((p) => {
      const minPrice = Math.min(...p.variants.map((v) => v.price));
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort(
          (a, b) =>
            Math.min(...a.variants.map((v) => v.price)) -
            Math.min(...b.variants.map((v) => v.price))
        );
        break;
      case "price-desc":
        result.sort(
          (a, b) =>
            Math.min(...b.variants.map((v) => v.price)) -
            Math.min(...a.variants.map((v) => v.price))
        );
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [initialProducts, sortBy, selectedStock, priceRange]);

  const handleQuickAdd = (product: MockProduct) => {
    const variant = product.variants[0];
    addItem({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      variantId: variant.id,
      variantLabel: variant.packageLabel,
      price: variant.price,
      image: product.images[0],
    });
  };

  return (
    <div className="container-brand py-8">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-display font-bold text-ivory-50">{categoryName}</h1>
        <p className="text-ivory-400">
          {toPersianDigits(filtered.length)} محصول
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-forest-600/30">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm text-ivory-300 hover:text-gold-200 transition-colors lg:hidden"
        >
          <SlidersHorizontal size={16} />
          فیلترها
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2 me-auto">
          <span className="text-sm text-ivory-400 hidden sm:inline">مرتب‌سازی:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-forest-800 border border-forest-500/40 text-ivory-100 text-sm rounded-lg px-3 py-2 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
          >
            <option value="default">پیش‌فرض</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
            <option value="rating">محبوب‌ترین</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters sidebar */}
        <aside
          className={cn(
            "w-full lg:w-64 shrink-0",
            showFilters ? "block" : "hidden lg:block"
          )}
        >
          <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5 sticky top-24">
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h3 className="font-display font-bold text-ivory-100">فیلترها</h3>
              <button onClick={() => setShowFilters(false)}>
                <X size={18} className="text-ivory-400" />
              </button>
            </div>

            {/* Stock status filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gold-200 mb-3">موجودی</h4>
              <div className="flex flex-col gap-2">
                {[
                  { value: "IN_STOCK", label: "موجود" },
                  { value: "LOW_STOCK", label: "رو به اتمام" },
                  { value: "OUT_OF_STOCK", label: "ناموجود" },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStock.includes(opt.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStock([...selectedStock, opt.value]);
                        } else {
                          setSelectedStock(selectedStock.filter((v) => v !== opt.value));
                        }
                      }}
                      className="w-4 h-4 rounded border-forest-500 bg-forest-900 text-gold-400 focus:ring-gold-400/30"
                    />
                    <span className="text-sm text-ivory-300">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <h4 className="text-sm font-medium text-gold-200 mb-3">بازه قیمت</h4>
              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min={0}
                  max={2000000}
                  step={50000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-gold-400"
                />
                <div className="flex items-center justify-between text-xs text-ivory-400">
                  <span>از {formatPrice(priceRange[0], false)}</span>
                  <span>تا {formatPrice(priceRange[1], false)}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-full bg-forest-700/50 flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-ivory-400/40" />
              </div>
              <p className="text-ivory-300 font-medium">محصولی با این فیلترها پیدا نشد</p>
              <p className="text-sm text-ivory-400/60 mt-1">فیلترها را تغییر دهید</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickAdd={() => handleQuickAdd(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onQuickAdd,
}: {
  product: MockProduct;
  onQuickAdd: () => void;
}) {
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const hasDiscount = product.variants.some((v) => v.compareAtPrice);

  return (
    <article className="product-card-reveal group relative bg-forest-800/60 border border-forest-600/30 rounded-2xl overflow-hidden hover:border-gold-400/30 hover:shadow-xl hover:shadow-forest-950/40 transition-all duration-300">
      <Link href={`/product/${product.slug}`} className="block relative">
        <div className="aspect-square bg-gradient-to-br from-forest-700 to-forest-900 relative overflow-hidden">
          {/* Product image or fallback */}
          {product.images && product.images.length > 0 && product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-linen-texture opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                  <ShoppingBag size={24} className="text-gold-400/40" />
                </div>
              </div>
            </>
          )}

          {product.isPremium && (
            <div className="absolute top-3 start-3">
              <WaxSeal label="ممتاز" className="w-12 h-12" />
            </div>
          )}

          {hasDiscount && (
            <div className="absolute top-3 end-3">
              <Badge variant="burgundy" className="bg-burgundy-700/80 text-ivory-50">
                تخفیف
              </Badge>
            </div>
          )}

          <div className="reveal-content absolute bottom-0 inset-x-0 bg-gradient-to-t from-forest-950/95 to-transparent p-4">
            <p className="text-xs text-ivory-300 line-clamp-2">{product.description}</p>
          </div>
        </div>
      </Link>

      <div className="p-4 lg:p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                className={
                  star <= Math.round(product.rating)
                    ? "fill-gold-400 text-gold-400"
                    : "text-forest-500"
                }
              />
            ))}
          </div>
          <span className="text-xs text-ivory-400">
            {toPersianDigits(product.rating)} ({toPersianDigits(product.reviewCount)})
          </span>
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="text-base lg:text-lg font-display font-bold text-ivory-50 hover:text-gold-200 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-ivory-400">{product.origin}</p>

        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gold-200">
              {formatPrice(minPrice)}
            </span>
            <span className="text-xs text-ivory-400">
              از {toPersianDigits(product.variants.length)} بسته‌بندی
            </span>
          </div>

          <button
            onClick={onQuickAdd}
            className="w-10 h-10 rounded-xl bg-gold-400/15 border border-gold-400/30 text-gold-200 hover:bg-gold-400 hover:text-forest-950 flex items-center justify-center transition-all duration-200 active:scale-90"
            aria-label={`افزودن ${product.name} به سبد`}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
