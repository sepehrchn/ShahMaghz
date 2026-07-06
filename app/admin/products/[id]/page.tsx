"use client";

import { useState, use } from "react";
import Link from "next/link";
import { ArrowRight, Save, Package, AlertCircle } from "lucide-react";
import { useProductStore } from "@/lib/product-store";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function AdminProductEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getProductById, updateProduct, updateVariantStock } = useProductStore();
  const product = getProductById(id);

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [longDescription, setLongDescription] = useState(product?.longDescription ?? "");
  const [origin, setOrigin] = useState(product?.origin ?? "");
  const [storageTips, setStorageTips] = useState(product?.storageTips ?? "");
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);
  const [isPremium, setIsPremium] = useState(product?.isPremium ?? false);
  const [saved, setSaved] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Package size={40} className="text-ivory-400/40 mb-4" />
        <p className="text-ivory-300 font-medium">محصول یافت نشد</p>
        <Link href="/admin/products" className="mt-4">
          <Button variant="outline">بازگشت به محصولات</Button>
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    updateProduct(product.id, {
      name,
      description,
      longDescription,
      origin,
      storageTips,
      isFeatured,
      isPremium,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="text-ivory-400 hover:text-gold-200">
            <ArrowRight size={20} />
          </Link>
          <h1 className="text-2xl font-display font-bold text-ivory-50">ویرایش محصول</h1>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save size={16} />
          {saved ? "ذخیره شد ✓" : "ذخیره تغییرات"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main info — 2 cols */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-sm font-display font-bold text-gold-200">اطلاعات اصلی</h2>
            <Input label="نام محصول" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="توضیح کوتاه" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Textarea
              label="توضیحات کامل"
              rows={5}
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="خاستگاه" value={origin} onChange={(e) => setOrigin(e.target.value)} />
              <Input label="کد محصول (SKU)" value={product.sku} disabled />
            </div>
            <Textarea
              label="راهنمای نگه‌داری"
              rows={2}
              value={storageTips}
              onChange={(e) => setStorageTips(e.target.value)}
            />
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded accent-gold-400"
                />
                <span className="text-sm text-ivory-200">محصول ویژه</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPremium}
                  onChange={(e) => setIsPremium(e.target.checked)}
                  className="w-4 h-4 rounded accent-gold-400"
                />
                <span className="text-sm text-ivory-200">محصول ممتاز (مهر مومی)</span>
              </label>
            </div>
          </div>

          {/* Variants / inventory */}
          <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
            <h2 className="text-sm font-display font-bold text-gold-200 mb-4">
              بسته‌بندی‌ها و موجودی
            </h2>
            <div className="flex flex-col gap-3">
              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-forest-900/40 rounded-xl border border-forest-600/20"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ivory-100">{variant.packageLabel}</p>
                    <p className="text-xs text-ivory-400 mt-0.5">
                      قیمت: {formatPrice(variant.price)}
                      {variant.compareAtPrice && (
                        <span className="text-ivory-400/50 line-through ms-2">
                          {formatPrice(variant.compareAtPrice)}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-ivory-400">موجودی:</label>
                    <input
                      type="number"
                      defaultValue={variant.stock}
                      onBlur={(e) => updateVariantStock(product.id, variant.id, Number(e.target.value))}
                      className="w-20 px-3 py-2 rounded-lg bg-forest-800 border border-forest-500/40 text-ivory-100 text-sm focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20 outline-none"
                    />
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      variant.stock === 0
                        ? "text-burgundy-700 bg-burgundy-700/10"
                        : variant.stock <= 5
                        ? "text-gold-300 bg-gold-400/10"
                        : "text-green-400 bg-green-400/10"
                    )}>
                      {variant.stock === 0 ? "ناموجود" : variant.stock <= 5 ? "رو به اتمام" : "موجود"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar — 1 col */}
        <div className="flex flex-col gap-6">
          {/* Status */}
          <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5">
            <h3 className="text-sm font-display font-bold text-gold-200 mb-3">وضعیت</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ivory-400">دسته‌بندی:</span>
                <span className="text-ivory-200">{product.categoryName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-400">امتیاز:</span>
                <span className="text-ivory-200">{toPersianDigits(product.rating)} از ۵</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-400">نظرات:</span>
                <span className="text-ivory-200">{toPersianDigits(product.reviewCount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory-400">تگ‌ها:</span>
                <span className="text-ivory-200 text-xs">{product.tags.join("، ")}</span>
              </div>
            </div>
          </div>

          {/* Low stock alert */}
          {product.variants.some((v) => v.stock <= 5) && (
            <div className="bg-burgundy-700/5 border border-burgundy-700/20 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle size={18} className="text-burgundy-700 shrink-0 mt-0.5" />
              <p className="text-xs text-burgundy-700">
                برخی بسته‌بندی‌ها موجودی کمی دارند. موجودی را به‌روزرسانی کنید.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
