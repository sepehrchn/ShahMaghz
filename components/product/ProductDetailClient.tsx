"use client";

import { useState } from "react";
import { ShoppingBag, Check, Minus, Plus, Star, Leaf, Award, Package } from "lucide-react";
import { type MockProduct } from "@/lib/mock-data";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, formatWeight, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WaxSeal } from "@/components/ui/BrandMotifs";
import { cn } from "@/lib/utils";

export function ProductDetailClient({ product }: { product: MockProduct }) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "nutrition" | "reviews">("description");
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId)!;
  const totalPrice = selectedVariant.price * quantity;

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        variantId: selectedVariant.id,
        variantLabel: selectedVariant.packageLabel,
        price: selectedVariant.price,
        image: product.images[0],
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container-brand pb-12">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Image gallery — 6 cols */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Main image */}
          <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-forest-700 to-forest-900 border border-gold-400/20 overflow-hidden">
            {/* TODO: replace placeholder image */}
            <div className="absolute inset-0 bg-linen-texture opacity-20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
                <ShoppingBag size={32} className="text-gold-400/40" />
              </div>
            </div>

            {product.isPremium && (
              <div className="absolute top-4 start-4">
                <WaxSeal label="ممتاز" />
              </div>
            )}
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-xl bg-forest-800 border border-forest-600/40 overflow-hidden flex items-center justify-center"
              >
                {/* TODO: replace placeholder image */}
                <ShoppingBag size={16} className="text-ivory-400/30" />
              </div>
            ))}
          </div>
        </div>

        {/* Product info — 6 cols */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-ivory-50 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(product.rating)
                      ? "fill-gold-400 text-gold-400"
                      : "text-forest-500"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-ivory-300">
              {toPersianDigits(product.rating)} از ۵
            </span>
            <span className="text-sm text-ivory-400">
              ({toPersianDigits(product.reviewCount)} نظر)
            </span>
          </div>

          {/* Short description */}
          <p className="text-ivory-300 leading-relaxed">{product.description}</p>

          {/* Origin */}
          <div className="flex items-center gap-2 text-sm text-ivory-400">
            <MapPin size={16} className="text-gold-400" />
            <span>خاستگاه: {product.origin}</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-forest-600/40" />

          {/* Variant selector */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-ivory-200">
              انتخاب بسته‌بندی:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={cn(
                    "px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-right",
                    selectedVariantId === variant.id
                      ? "border-gold-400 bg-gold-400/10 text-gold-200"
                      : "border-forest-500/40 bg-forest-800/60 text-ivory-300 hover:border-gold-400/40"
                  )}
                >
                  <div className="flex flex-col gap-0.5">
                    <span>{variant.packageLabel}</span>
                    <span className="text-xs font-normal text-ivory-400">
                      {formatPrice(variant.price)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-display font-bold text-gold-200">
              {formatPrice(selectedVariant.price)}
            </span>
            {selectedVariant.compareAtPrice && (
              <span className="text-lg text-ivory-400 line-through">
                {formatPrice(selectedVariant.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2 text-sm">
            {selectedVariant.stock > 10 ? (
              <span className="flex items-center gap-1.5 text-green-400/80">
                <Check size={14} /> موجود در انبار
              </span>
            ) : selectedVariant.stock > 0 ? (
              <span className="flex items-center gap-1.5 text-gold-300">
                <Package size={14} /> تنها {toPersianDigits(selectedVariant.stock)} عدد باقی مانده
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-burgundy-700">
                ناموجود
              </span>
            )}
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-3 mt-2">
            {/* Quantity selector */}
            <div className="flex items-center gap-2 bg-forest-800/60 border border-forest-500/40 rounded-xl p-1">
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-lg bg-forest-600/50 text-ivory-300 hover:bg-forest-500 hover:text-gold-200 flex items-center justify-center transition-all"
                aria-label="افزایش تعداد"
              >
                <Plus size={16} />
              </button>
              <span className="text-base font-medium text-ivory-100 w-8 text-center">
                {toPersianDigits(quantity)}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-lg bg-forest-600/50 text-ivory-300 hover:bg-forest-500 hover:text-gold-200 flex items-center justify-center transition-all"
                aria-label="کاهش تعداد"
              >
                <Minus size={16} />
              </button>
            </div>

            {/* Add to cart button */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="flex-1 gap-2"
              disabled={selectedVariant.stock === 0}
            >
              {added ? (
                <>
                  <Check size={20} />
                  به سبد اضافه شد
                </>
              ) : (
                <>
                  <ShoppingBag size={20} />
                  افزودن به سبد — {formatPrice(totalPrice)}
                </>
              )}
            </Button>
          </div>

          {/* Quick features */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { icon: Leaf, label: "طبیعی" },
              { icon: Award, label: "درجه یک" },
              { icon: Package, label: "بسته‌بندی نفیس" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex flex-col items-center gap-2 bg-forest-800/40 border border-forest-600/30 rounded-xl py-3"
              >
                <f.icon size={18} className="text-gold-400" />
                <span className="text-xs text-ivory-300">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="mt-12 lg:mt-16">
        {/* Tab buttons */}
        <div className="flex items-center gap-1 border-b border-forest-600/40 mb-6">
          {[
            { key: "description", label: "توضیحات کامل" },
            { key: "nutrition", label: "اطلاعات تغذیه‌ای" },
            { key: "reviews", label: `نظرات (${toPersianDigits(product.reviewCount)})` },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={cn(
                "px-5 py-3 text-sm font-medium border-b-2 transition-all duration-200",
                activeTab === tab.key
                  ? "border-gold-400 text-gold-200"
                  : "border-transparent text-ivory-400 hover:text-ivory-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-forest-800/40 border border-forest-600/30 rounded-2xl p-6 lg:p-8">
          {activeTab === "description" && (
            <div className="flex flex-col gap-5">
              <p className="text-ivory-200 leading-loose text-base">
                {product.longDescription}
              </p>

              {/* Ingredients */}
              <div>
                <h3 className="text-sm font-display font-bold text-gold-200 mb-2">
                  مواد تشکیل‌دهنده
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <Badge key={ing} variant="forest">
                      {ing}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Storage tips */}
              <div>
                <h3 className="text-sm font-display font-bold text-gold-200 mb-2">
                  راهنمای نگه‌داری
                </h3>
                <p className="text-sm text-ivory-300 leading-relaxed">
                  {product.storageTips}
                </p>
              </div>
            </div>
          )}

          {activeTab === "nutrition" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(product.nutritionInfo).map(([key, value]) => {
                const labels: Record<string, string> = {
                  calories: "کالری",
                  fat: "چربی",
                  protein: "پروتئین",
                  carbs: "کربوهیدرات",
                  fiber: "فیبر",
                };
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between bg-forest-900/50 border border-forest-600/30 rounded-xl px-5 py-4"
                  >
                    <span className="text-sm text-ivory-300">{labels[key]}</span>
                    <span className="text-sm font-medium text-gold-200">{value}</span>
                  </div>
                );
              })}
              <p className="text-xs text-ivory-400/60 col-span-full mt-2">
                * مقادیر به ازای هر ۱۰۰ گرم محصول است (در صورت وجود).
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="flex flex-col gap-6">
              {/* Summary */}
              <div className="flex items-center gap-6 pb-5 border-b border-forest-600/30">
                <div className="text-center">
                  <p className="text-4xl font-display font-bold text-gold-200">
                    {toPersianDigits(product.rating)}
                  </p>
                  <div className="flex items-center gap-0.5 mt-1 justify-center">
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
                  <p className="text-xs text-ivory-400 mt-1">
                    {toPersianDigits(product.reviewCount)} نظر
                  </p>
                </div>
                <p className="text-sm text-ivory-300 flex-1">
                  این محصول بر اساس نظرات مشتریان، امتیاز بالایی دریافت کرده است.
                  تجربه خود را با ما به اشتراک بگذارید.
                </p>
              </div>

              {/* Sample reviews */}
              <div className="flex flex-col gap-4">
                {[
                  {
                    name: "سارا احمدی",
                    rating: 5,
                    text: "کیفیت فوق‌العاده! طعم و تردی عالی، بسته‌بندی هم خیلی خوب بود.",
                  },
                  {
                    name: "محمد کاظمی",
                    rating: 4,
                    text: "محصول خوبی بود ولی قیمتش کمی بالاست. با این حال کیفیتش توجیه می‌کنه.",
                  },
                ].map((review, i) => (
                  <div
                    key={i}
                    className="bg-forest-900/40 border border-forest-600/30 rounded-xl p-5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-ivory-100">
                        {review.name}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={12}
                            className={
                              star <= review.rating
                                ? "fill-gold-400 text-gold-400"
                                : "text-forest-500"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-ivory-300 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
