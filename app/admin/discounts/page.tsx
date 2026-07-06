"use client";

import { useState } from "react";
import { Plus, Trash2, Ticket, Power, Search } from "lucide-react";
import { useDiscountStore, type DiscountType } from "@/lib/discount-store";
import { formatPrice, formatPersianDate, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const typeLabels: Record<DiscountType, string> = {
  PERCENTAGE: "درصدی",
  FIXED_AMOUNT: "مبلغ ثابت",
  FREE_SHIPPING: "ارسال رایگان",
};

export default function AdminDiscountsPage() {
  const { codes, addCode, deleteCode, toggleActive } = useDiscountStore();
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    type: "PERCENTAGE" as DiscountType,
    value: 10,
    minOrderAmount: 0,
    maxUsageCount: 100,
    isActive: true,
  });

  const filtered = codes.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.description.includes(search)
  );

  const handleAdd = () => {
    if (!formData.code) return;
    addCode({
      code: formData.code.toUpperCase(),
      description: formData.description,
      type: formData.type,
      value: formData.value,
      minOrderAmount: formData.minOrderAmount || undefined,
      maxUsageCount: formData.maxUsageCount || undefined,
      isActive: formData.isActive,
    });
    setShowForm(false);
    setFormData({
      code: "", description: "", type: "PERCENTAGE", value: 10,
      minOrderAmount: 0, maxUsageCount: 100, isActive: true,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-ivory-50">کدهای تخفیف</h1>
          <p className="text-sm text-ivory-400 mt-1">{toPersianDigits(codes.length)} کد</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus size={18} />
          کد تخفیف جدید
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute top-1/2 -translate-y-1/2 start-4 text-ivory-400/50" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو بر اساس کد یا توضیحات..."
          className="w-full ps-12 pe-4 py-3 rounded-xl bg-forest-800/60 border border-forest-500/40 text-ivory-100 placeholder:text-ivory-400/50 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20 outline-none transition-all"
        />
      </div>

      {/* Discount codes table */}
      <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-ivory-400 border-b border-forest-600/30 bg-forest-900/40">
                <th className="text-start p-4 font-medium">کد</th>
                <th className="text-start p-4 font-medium">توضیحات</th>
                <th className="text-start p-4 font-medium">نوع</th>
                <th className="text-start p-4 font-medium">مقدار</th>
                <th className="text-start p-4 font-medium">استفاده</th>
                <th className="text-start p-4 font-medium">وضعیت</th>
                <th className="text-start p-4 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-ivory-400">
                    <Ticket size={32} className="mx-auto mb-2 opacity-40" />
                    کد تخفیفی یافت نشد
                  </td>
                </tr>
              ) : (
                filtered.map((dc) => (
                  <tr key={dc.id} className="border-b border-forest-600/20 last:border-0 hover:bg-forest-700/20">
                    <td className="p-4">
                      <span className="font-mono font-bold text-gold-200">{dc.code}</span>
                    </td>
                    <td className="p-4 text-ivory-300 text-xs max-w-xs">{dc.description}</td>
                    <td className="p-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-forest-600/40 text-ivory-300">
                        {typeLabels[dc.type]}
                      </span>
                    </td>
                    <td className="p-4 text-ivory-200">
                      {dc.type === "PERCENTAGE"
                        ? `${toPersianDigits(dc.value)}٪`
                        : dc.type === "FIXED_AMOUNT"
                        ? formatPrice(dc.value, false)
                        : "—"}
                    </td>
                    <td className="p-4 text-ivory-400 text-xs">
                      {toPersianDigits(dc.usageCount)}
                      {dc.maxUsageCount && ` / ${toPersianDigits(dc.maxUsageCount)}`}
                    </td>
                    <td className="p-4">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        dc.isActive
                          ? "text-green-400 bg-green-400/10"
                          : "text-ivory-400 bg-forest-600/30"
                      )}>
                        {dc.isActive ? "فعال" : "غیرفعال"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleActive(dc.id)}
                          className={cn(
                            "p-1.5 rounded-lg transition-all",
                            dc.isActive
                              ? "text-green-400 hover:bg-green-400/10"
                              : "text-ivory-400 hover:text-gold-200 hover:bg-forest-600/50"
                          )}
                          title={dc.isActive ? "غیرفعال کردن" : "فعال کردن"}
                        >
                          <Power size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteId(dc.id)}
                          className="p-1.5 rounded-lg text-ivory-400 hover:text-burgundy-700 hover:bg-burgundy-700/10 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="کد تخفیف جدید" className="max-w-lg">
        <div className="flex flex-col gap-4">
          <Input
            label="کد تخفیف"
            name="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder="WELCOME10"
          />
          <Input
            label="توضیحات"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="تخفیف خوش‌آمدگویی"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ivory-200">نوع تخفیف</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as DiscountType })}
                className="w-full px-4 py-3 rounded-xl bg-forest-900/60 border border-forest-500/40 text-ivory-100 outline-none focus:border-gold-400/60"
              >
                <option value="PERCENTAGE">درصدی</option>
                <option value="FIXED_AMOUNT">مبلغ ثابت</option>
                <option value="FREE_SHIPPING">ارسال رایگان</option>
              </select>
            </div>
            <Input
              label="مقدار (٪ یا تومان)"
              type="number"
              value={String(formData.value)}
              onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="حداقل مبلغ سفارش (تومان)"
              type="number"
              value={String(formData.minOrderAmount)}
              onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
            />
            <Input
              label="حداکثر استفاده"
              type="number"
              value={String(formData.maxUsageCount)}
              onChange={(e) => setFormData({ ...formData, maxUsageCount: Number(e.target.value) })}
            />
          </div>
          <div className="flex gap-3 mt-2">
            <Button onClick={handleAdd} className="gap-2">
              <Plus size={16} />
              ایجاد کد
            </Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>انصراف</Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirmation */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="حذف کد تخفیف">
        <p className="text-sm text-ivory-300 mb-5">آیا از حذف این کد تخفیف اطمینان دارید؟</p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={() => { if (deleteId) { deleteCode(deleteId); setDeleteId(null); } }} className="gap-2">
            <Trash2 size={16} /> بله، حذف کن
          </Button>
          <Button variant="ghost" onClick={() => setDeleteId(null)}>انصراف</Button>
        </div>
      </Modal>
    </div>
  );
}
