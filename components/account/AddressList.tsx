"use client";

import { useState } from "react";
import { MapPin, Pencil, Trash2, Plus, Check, Star } from "lucide-react";
import { useAddressStore, type Address } from "@/lib/address-store";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AddressForm } from "./AddressForm";
import { toPersianDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export function AddressList() {
  const { addresses, removeAddress, setDefault } = useAddressStore();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Address | null>(null);

  const handleEdit = (addr: Address) => {
    setEditingAddress(addr);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      removeAddress(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  if (addresses.length === 0 && !showForm) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-forest-700/50 flex items-center justify-center mb-4">
          <MapPin size={32} className="text-ivory-400/40" />
        </div>
        <p className="text-ivory-300 font-medium mb-1">هنوز آدرسی ثبت نکرده‌اید</p>
        <p className="text-sm text-ivory-400/60 mb-4">
          برای تسریع فرآیند خرید، آدرس‌های خود را ذخیره کنید
        </p>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus size={18} />
          افزودن آدرس جدید
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-bold text-ivory-50">
          آدرس‌های من
        </h2>
        <Button onClick={() => setShowForm(true)} size="sm" className="gap-2">
          <Plus size={16} />
          آدرس جدید
        </Button>
      </div>

      {/* Address cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={cn(
              "bg-forest-800/50 border rounded-2xl p-5 flex flex-col gap-3 transition-all",
              addr.isDefault
                ? "border-gold-400/40 shadow-lg shadow-gold-400/5"
                : "border-forest-600/30 hover:border-gold-400/20"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-display font-bold text-gold-200">
                  {addr.label}
                </span>
                {addr.isDefault && (
                  <span className="text-2xs text-gold-300 bg-gold-400/15 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star size={10} className="fill-gold-300" />
                    پیش‌فرض
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(addr)}
                  className="p-1.5 rounded-lg text-ivory-400 hover:text-gold-200 hover:bg-forest-600/50 transition-all"
                  aria-label="ویرایش"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => setDeleteConfirm(addr)}
                  className="p-1.5 rounded-lg text-ivory-400 hover:text-burgundy-700 hover:bg-burgundy-700/10 transition-all"
                  aria-label="حذف"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-sm text-ivory-300">
              <p className="font-medium text-ivory-100">{addr.recipient}</p>
              <p>{toPersianDigits(addr.mobile)}</p>
              <p className="text-ivory-400">
                {addr.province}، {addr.city}
              </p>
              <p className="text-ivory-400 text-xs leading-relaxed">
                {addr.addressLine}
              </p>
              <p className="text-xs text-ivory-400/60">
                کد پستی: {toPersianDigits(addr.postalCode)}
              </p>
            </div>

            {!addr.isDefault && (
              <button
                onClick={() => setDefault(addr.id)}
                className="text-xs text-gold-200 hover:text-gold-100 transition-colors flex items-center gap-1 mt-1"
              >
                <Check size={12} />
                تنظیم به عنوان پیش‌فرض
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit modal */}
      <Modal
        isOpen={showForm}
        onClose={handleCloseForm}
        title={editingAddress ? "ویرایش آدرس" : "آدرس جدید"}
        className="max-w-2xl"
      >
        <AddressForm
          initialData={editingAddress ?? undefined}
          onSubmit={handleCloseForm}
          onCancel={handleCloseForm}
        />
      </Modal>

      {/* Delete confirmation */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="حذف آدرس"
      >
        <p className="text-sm text-ivory-300 mb-5">
          آیا از حذف این آدرس اطمینان دارید؟ این عملیات قابل بازگشت نیست.
        </p>
        <div className="flex gap-3">
          <Button variant="danger" onClick={handleDelete} className="gap-2">
            <Trash2 size={16} />
            بله، حذف کن
          </Button>
          <Button variant="ghost" onClick={() => setDeleteConfirm(null)}>
            انصراف
          </Button>
        </div>
      </Modal>
    </div>
  );
}
