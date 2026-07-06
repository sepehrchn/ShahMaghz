"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Package, AlertCircle } from "lucide-react";
import { useProductStore } from "@/lib/product-store";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

const stockStatusLabels: Record<string, string> = {
  IN_STOCK: "موجود",
  LOW_STOCK: "رو به اتمام",
  OUT_OF_STOCK: "ناموجود",
};

const stockStatusColors: Record<string, string> = {
  IN_STOCK: "text-green-400 bg-green-400/10",
  LOW_STOCK: "text-gold-300 bg-gold-400/10",
  OUT_OF_STOCK: "text-burgundy-700 bg-burgundy-700/10",
};

export default function AdminProductsPage() {
  const { products, deleteProduct } = useProductStore();
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = products.filter((p) =>
    p.name.includes(search) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-ivory-50">مدیریت محصولات</h1>
          <p className="text-sm text-ivory-400 mt-1">
            {toPersianDigits(products.length)} محصول
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          محصول جدید
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute top-1/2 -translate-y-1/2 start-4 text-ivory-400/50" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو بر اساس نام یا کد محصول..."
          className="w-full ps-12 pe-4 py-3 rounded-xl bg-forest-800/60 border border-forest-500/40 text-ivory-100 placeholder:text-ivory-400/50 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
        />
      </div>

      {/* Products table */}
      <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-ivory-400 border-b border-forest-600/30 bg-forest-900/40">
                <th className="text-start p-4 font-medium">نام محصول</th>
                <th className="text-start p-4 font-medium">کد محصول</th>
                <th className="text-start p-4 font-medium">دسته</th>
                <th className="text-start p-4 font-medium">قیمت از</th>
                <th className="text-start p-4 font-medium">موجودی</th>
                <th className="text-start p-4 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-ivory-400">
                    <Package size={32} className="mx-auto mb-2 opacity-40" />
                    محصولی یافت نشد
                  </td>
                </tr>
              ) : (
                filtered.map((product) => {
                  const minPrice = Math.min(...product.variants.map((v) => v.price));
                  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
                  return (
                    <tr key={product.id} className="border-b border-forest-600/20 last:border-0 hover:bg-forest-700/20">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-forest-700/60 border border-forest-500/30 flex items-center justify-center shrink-0">
                            <Package size={16} className="text-ivory-400/40" />
                          </div>
                          <div>
                            <p className="font-medium text-ivory-100">{product.name}</p>
                            {product.isPremium && (
                              <span className="text-2xs text-gold-300">ممتاز</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-ivory-400 text-xs font-mono">{product.sku}</td>
                      <td className="p-4 text-ivory-300">{product.categoryName}</td>
                      <td className="p-4 text-gold-200 font-medium">{formatPrice(minPrice, false)}</td>
                      <td className="p-4">
                        <span className={cn("text-xs px-2 py-1 rounded-full", stockStatusColors[product.stockStatus])}>
                          {stockStatusLabels[product.stockStatus]} ({toPersianDigits(totalStock)})
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Link
                            href={`/admin/products/${product.id}`}
                            className="p-1.5 rounded-lg text-ivory-400 hover:text-gold-200 hover:bg-forest-600/50 transition-all"
                          >
                            <Pencil size={14} />
                          </Link>
                          <button
                            onClick={() => setDeleteId(product.id)}
                            className="p-1.5 rounded-lg text-ivory-400 hover:text-burgundy-700 hover:bg-burgundy-700/10 transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="حذف محصول">
        <p className="text-sm text-ivory-300 mb-5">
          آیا از حذف این محصول اطمینان دارید؟ این عملیات قابل بازگشت نیست.
        </p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleDelete} className="gap-2">
            <Trash2 size={16} />
            بله، حذف کن
          </Button>
          <Button variant="ghost" onClick={() => setDeleteId(null)}>انصراف</Button>
        </div>
      </Modal>
    </div>
  );
}
