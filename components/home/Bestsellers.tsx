"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Star, Plus } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { WaxSeal } from "@/components/ui/BrandMotifs";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: string[];
  origin: string;
  rating: number;
  reviewCount: number;
  isPremium: boolean;
  product_variants: Array<{
    id: string;
    packageLabel: string;
    price: number;
    compareAtPrice: number | null;
  }>;
}

export function Bestsellers() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then(data => {
        // Handle both success (array) and error (object with error field)
        if (Array.isArray(data)) {
          setFeatured(data.slice(0, 6));
        } else {
          console.error('API returned non-array:', data);
          setFeatured([]);
        }
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setFeatured([]);
      });
  }, []);

  const handleQuickAdd = (product: Product) => {
    const variant = product.product_variants[0];
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
    <section className="py-16 lg:py-20 bg-forest-950">
      <div className="container-brand">
        <div className="flex items-end justify-between mb-10 reveal-on-scroll">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gold-200 font-medium">پرفروش‌ترین‌ها</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-ivory-50">
              محبوب‌ترین طعم‌ها
            </h2>
          </div>
          <Link
            href="/category/nuts"
            className="text-sm text-gold-200 hover:text-gold-100 transition-colors flex items-center gap-1"
          >
            همه محصولات
          </Link>
        </div>

        {/* Product grid — responsive, not uniform 3-col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickAdd={() => handleQuickAdd(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onQuickAdd,
}: {
  product: Product;
  onQuickAdd: () => void;
}) {
  const minPrice = Math.min(...product.product_variants.map((v) => v.price));
  const hasDiscount = product.product_variants.some((v) => v.compareAtPrice);

  return (
    <article
      className={cn(
        "product-card-reveal group relative bg-forest-800/60 border border-forest-600/30 rounded-2xl overflow-hidden",
        "hover:border-gold-400/30 hover:shadow-xl hover:shadow-forest-950/40 reveal-on-scroll"
      )}
    >
      {/* Image area */}
      <Link href={`/product/${product.slug}`} className="block relative">
        <div className="aspect-square bg-gradient-to-br from-forest-700 to-forest-900 relative overflow-hidden">
          {/* TODO: replace placeholder image */}
          <div className="absolute inset-0 bg-linen-texture opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
              <ShoppingBag size={24} className="text-gold-400/40" />
            </div>
          </div>

          {/* Premium wax seal */}
          {product.isPremium && (
            <div className="absolute top-3 start-3">
              <WaxSeal label="ممتاز" className="w-12 h-12" />
            </div>
          )}

          {/* Discount badge */}
          {hasDiscount && (
            <div className="absolute top-3 end-3">
              <Badge variant="burgundy" className="bg-burgundy-700/80 text-ivory-50">
                تخفیف
              </Badge>
            </div>
          )}

          {/* Hover overlay — reveals secondary info */}
          <div className="reveal-content absolute bottom-0 inset-x-0 bg-gradient-to-t from-forest-950/95 to-transparent p-4">
            <p className="text-xs text-ivory-300 line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 lg:p-5 flex flex-col gap-3">
        {/* Rating */}
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
            {toPersianDigits(product.rating)} ({toPersianDigits(product.reviewCount)} نظر)
          </span>
        </div>

        {/* Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-base lg:text-lg font-display font-bold text-ivory-50 hover:text-gold-200 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Origin */}
        <p className="text-xs text-ivory-400 flex items-center gap-1">
          <span className="text-gold-400/60">خاستگاه:</span>
          {product.origin}
        </p>

        {/* Price + add to cart */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gold-200">
              {formatPrice(minPrice)}
            </span>
            <span className="text-xs text-ivory-400">
              از {toPersianDigits(product.product_variants.length)} بسته‌بندی
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
