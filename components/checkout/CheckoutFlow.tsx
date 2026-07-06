"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShoppingBag, MapPin, Check, ChevronLeft, Plus,
  Truck, FileText, CheckCircle, ArrowLeft
} from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useAuthStore } from "@/lib/auth-store";
import { useAddressStore, iranianProvinces } from "@/lib/address-store";
import { useOrderStore, type ShippingInfo } from "@/lib/order-store";
import {
  calculateShippingCost, isFreeShipping, getRemainingForFreeShipping,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/shipping";
import { formatPrice, toPersianDigits } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { checkoutShippingSchema, type CheckoutShippingValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Step = "shipping" | "review" | "confirmation";

export function CheckoutFlow() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const { addresses, getDefault } = useAddressStore();
  const { createOrder } = useOrderStore();

  const [step, setStep] = useState<Step>("shipping");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completedOrder, setCompletedOrder] = useState<{ orderNumber: string; totalAmount: number } | null>(null);
  const [useSavedAddress, setUseSavedAddress] = useState<boolean>(getDefault() != null);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    getDefault()?.id ?? ""
  );

  const [formData, setFormData] = useState<CheckoutShippingValues>({
    recipient: user?.firstName ? `${user.firstName} ${user.lastName}` : "",
    mobile: user?.mobile ?? "",
    province: "",
    city: "",
    postalCode: "",
    addressLine: "",
    customerNote: "",
  });

  const subtotal = getSubtotal();

  // If cart is empty and not on confirmation step, show empty state
  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-forest-700/50 flex items-center justify-center mb-4">
          <ShoppingBag size={32} className="text-ivory-400/40" />
        </div>
        <p className="text-ivory-300 font-medium mb-1">سبد خرید شما خالی است</p>
        <p className="text-sm text-ivory-400/60 mb-4">
          برای ادامه فرآیند خرید، ابتدا محصولات را به سبد اضافه کنید
        </p>
        <Link href="/">
          <Button className="gap-2">
            <ArrowLeft size={18} />
            بازگشت به فروشگاه
          </Button>
        </Link>
      </div>
    );
  }

  const handleChange = (field: keyof CheckoutShippingValues, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSelectSavedAddress = (id: string) => {
    setSelectedAddressId(id);
    const addr = addresses.find((a) => a.id === id);
    if (addr) {
      setFormData((prev) => ({
        ...prev,
        recipient: addr.recipient,
        mobile: addr.mobile,
        province: addr.province,
        city: addr.city,
        postalCode: addr.postalCode,
        addressLine: addr.addressLine,
      }));
    }
  };

  const shippingCost = formData.province
    ? calculateShippingCost(formData.province, subtotal)
    : 0;
  const totalAmount = subtotal + shippingCost;

  const handleProceedToReview = () => {
    const result = checkoutShippingSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = () => {
    const shippingInfo: ShippingInfo = {
      recipient: formData.recipient,
      mobile: formData.mobile,
      province: formData.province,
      city: formData.city,
      postalCode: formData.postalCode,
      addressLine: formData.addressLine,
    };

    const order = createOrder({
      items,
      shippingInfo,
      shippingCost,
      discountAmount: 0,
      customerNote: formData.customerNote || undefined,
    });

    setCompletedOrder({ orderNumber: order.orderNumber, totalAmount: order.totalAmount });
    clearCart();
    setStep("confirmation");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── Step: Confirmation ─────────────────────────────
  if (step === "confirmation" && completedOrder) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center max-w-lg mx-auto">
        <div className="w-24 h-24 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center mb-6 animate-scale-in">
          <CheckCircle size={44} className="text-green-400" />
        </div>
        <h1 className="text-2xl lg:text-3xl font-display font-bold text-ivory-50 mb-3">
          سفارش شما با موفقیت ثبت شد
        </h1>
        <p className="text-ivory-300 mb-1">
          شماره سفارش:
          <span className="text-gold-200 font-bold mr-2">{completedOrder.orderNumber}</span>
        </p>
        <p className="text-sm text-ivory-400 mb-6">
          مبلغ پرداختی: {formatPrice(completedOrder.totalAmount)}
        </p>

        <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5 w-full text-start mb-6">
          <p className="text-sm text-ivory-300 leading-relaxed">
            سفارش شما در وضعیت «در انتظار بررسی» قرار گرفت. همکاران ما در کوتاه‌ترین
            زمان آن را بررسی کرده و برای ارسال هماهنگی‌های لازم را انجام خواهند داد.
            می‌توانید وضعیت سفارش را از صفحه سفارش‌های من پیگیری کنید.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link href="/account/orders" className="flex-1">
            <Button fullWidth size="lg">پیگیری سفارش</Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" fullWidth size="lg">بازگشت به فروشگاه</Button>
          </Link>
        </div>
      </div>
    );
  }

  // ─── Step indicators ─────────────────────────────
  const steps: { key: Step; label: string; icon: typeof MapPin }[] = [
    { key: "shipping", label: "اطلاعات ارسال", icon: MapPin },
    { key: "review", label: "بررسی سفارش", icon: FileText },
    { key: "confirmation", label: "تأیید نهایی", icon: CheckCircle },
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Left: Form / Review — 7 cols */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => {
            const isActive = step === s.key;
            const isPast =
              steps.findIndex((x) => x.key === step) > i;
            return (
              <div key={s.key} className="flex items-center gap-2 flex-1">
                <div className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                  isActive && "bg-gold-400/10 text-gold-200 border border-gold-400/30",
                  isPast && "text-green-400",
                  !isActive && !isPast && "text-ivory-400"
                )}>
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                    isActive && "bg-gold-400/20 text-gold-200",
                    isPast && "bg-green-400/20 text-green-400",
                    !isActive && !isPast && "bg-forest-700/50 text-ivory-400"
                  )}>
                    {isPast ? <Check size={14} /> : <s.icon size={14} />}
                  </div>
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={cn("h-px flex-1", isPast ? "bg-green-400/30" : "bg-forest-600/40")} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step: Shipping */}
        {step === "shipping" && (
          <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6 flex flex-col gap-5">
            <h2 className="text-lg font-display font-bold text-ivory-100 flex items-center gap-2">
              <MapPin size={20} className="text-gold-400" />
              اطلاعات تحویل
            </h2>

            {/* Saved addresses */}
            {addresses.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setUseSavedAddress(true)}
                    className={cn(
                      "text-sm px-4 py-2 rounded-lg border transition-all",
                      useSavedAddress
                        ? "border-gold-400/40 text-gold-200 bg-gold-400/10"
                        : "border-forest-500/40 text-ivory-400 hover:text-ivory-200"
                    )}
                  >
                    انتخاب از آدرس‌های ذخیره‌شده
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseSavedAddress(false)}
                    className={cn(
                      "text-sm px-4 py-2 rounded-lg border transition-all",
                      !useSavedAddress
                        ? "border-gold-400/40 text-gold-200 bg-gold-400/10"
                        : "border-forest-500/40 text-ivory-400 hover:text-ivory-200"
                    )}
                  >
                    وارد آدرس جدید
                  </button>
                </div>

                {useSavedAddress && (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {addresses.map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => handleSelectSavedAddress(addr.id)}
                        className={cn(
                          "text-start p-4 rounded-xl border transition-all",
                          selectedAddressId === addr.id
                            ? "border-gold-400/40 bg-gold-400/10"
                            : "border-forest-500/40 bg-forest-900/40 hover:border-gold-400/20"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gold-200">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="text-2xs text-gold-300">پیش‌فرض</span>
                          )}
                        </div>
                        <p className="text-xs text-ivory-300">{addr.recipient}</p>
                        <p className="text-xs text-ivory-400 mt-1">
                          {addr.province}، {addr.city}
                        </p>
                        <p className="text-xs text-ivory-400/60 mt-1 line-clamp-1">
                          {addr.addressLine}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Manual form */}
            {(!useSavedAddress || addresses.length === 0) && (
              <div className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="نام گیرنده"
                    name="recipient"
                    value={formData.recipient}
                    onChange={(e) => handleChange("recipient", e.target.value)}
                    error={errors.recipient}
                    placeholder="نام و نام خانوادگی"
                  />
                  <Input
                    label="شماره موبایل"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    error={errors.mobile}
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ivory-200">استان</label>
                    <select
                      value={formData.province}
                      onChange={(e) => handleChange("province", e.target.value)}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl bg-forest-900/60 border text-ivory-100 transition-all outline-none",
                        errors.province
                          ? "border-burgundy-700/60"
                          : "border-forest-500/40 focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20"
                      )}
                    >
                      <option value="">انتخاب استان</option>
                      {iranianProvinces.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    {errors.province && <p className="text-xs text-burgundy-700">{errors.province}</p>}
                  </div>
                  <Input
                    label="شهر"
                    name="city"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    error={errors.city}
                    placeholder="نام شهر"
                  />
                </div>

                <Input
                  label="کد پستی"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  error={errors.postalCode}
                  placeholder="کد پستی ۱۰ رقمی"
                />

                <Textarea
                  label="آدرس کامل"
                  name="addressLine"
                  rows={3}
                  value={formData.addressLine}
                  onChange={(e) => handleChange("addressLine", e.target.value)}
                  error={errors.addressLine}
                  placeholder="خیابان، کوچه، پلاک و جزئیات"
                />

                <Textarea
                  label="یادداشت سفارش (اختیاری)"
                  name="customerNote"
                  rows={2}
                  value={formData.customerNote}
                  onChange={(e) => handleChange("customerNote", e.target.value)}
                  error={errors.customerNote}
                  placeholder="هر نکته‌ای که برای ارسال باید بدانیم..."
                />
              </div>
            )}

            <Button
              size="lg"
              fullWidth
              onClick={handleProceedToReview}
              className="gap-2 mt-2"
            >
              ادامه به بررسی سفارش
              <ChevronLeft size={18} />
            </Button>
          </div>
        )}

        {/* Step: Review */}
        {step === "review" && (
          <div className="flex flex-col gap-5">
            {/* Shipping info review */}
            <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-display font-bold text-gold-200 flex items-center gap-2">
                  <MapPin size={16} />
                  آدرس ارسال
                </h3>
                <button
                  onClick={() => setStep("shipping")}
                  className="text-xs text-gold-200 hover:text-gold-100 transition-colors"
                >
                  ویرایش
                </button>
              </div>
              <div className="text-sm text-ivory-300 flex flex-col gap-1">
                <p className="font-medium text-ivory-100">{formData.recipient}</p>
                <p>{toPersianDigits(formData.mobile)}</p>
                <p>{formData.province}، {formData.city}</p>
                <p className="text-ivory-400 text-xs">{formData.addressLine}</p>
                <p className="text-xs text-ivory-400/60">کد پستی: {toPersianDigits(formData.postalCode)}</p>
                {formData.customerNote && (
                  <p className="text-xs text-ivory-400 mt-2 pt-2 border-t border-forest-600/20">
                    یادداشت: {formData.customerNote}
                  </p>
                )}
              </div>
            </div>

            {/* Items review */}
            <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
              <h3 className="text-sm font-display font-bold text-gold-200 mb-4">
                اقلام سفارش ({toPersianDigits(items.length)} کالا)
              </h3>
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.variantId} className="flex items-center gap-4 pb-4 border-b border-forest-600/20 last:border-0 last:pb-0">
                    <div className="w-12 h-12 rounded-xl bg-forest-700/60 border border-forest-500/30 flex items-center justify-center shrink-0">
                      <ShoppingBag size={16} className="text-ivory-400/40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ivory-100 truncate">{item.productName}</p>
                      <p className="text-xs text-ivory-400">
                        {item.variantLabel} — {toPersianDigits(item.quantity)} عدد
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gold-200 shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="ghost" size="lg" onClick={() => setStep("shipping")}>
                بازگشت
              </Button>
              <Button size="lg" fullWidth onClick={handlePlaceOrder} className="gap-2">
                <Check size={20} />
                ثبت نهایی سفارش
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Right: Order summary — 5 cols */}
      <div className="lg:col-span-5">
        <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6 sticky top-24">
          <h2 className="text-lg font-display font-bold text-ivory-100 mb-5">
            خلاصه سفارش
          </h2>

          {/* Items count */}
          <div className="flex items-center gap-2 text-sm text-ivory-400 mb-4 pb-4 border-b border-forest-600/30">
            <ShoppingBag size={16} className="text-gold-400" />
            {toPersianDigits(items.length)} کالا در سبد
          </div>

          {/* Items list */}
          <div className="flex flex-col gap-3 mb-4 pb-4 border-b border-forest-600/30">
            {items.map((item) => (
              <div key={item.variantId} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-ivory-300 truncate">{item.productName}</span>
                  <span className="text-xs text-ivory-400 shrink-0">
                    ×{toPersianDigits(item.quantity)}
                  </span>
                </div>
                <span className="text-ivory-200 shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Free shipping progress */}
          {subtotal < FREE_SHIPPING_THRESHOLD && (
            <div className="mb-4 p-3 bg-gold-400/5 border border-gold-400/20 rounded-xl">
              <div className="flex items-center gap-2 text-xs text-gold-200 mb-2">
                <Truck size={14} />
                تا ارسال رایگان: {formatPrice(getRemainingForFreeShipping(subtotal))}
              </div>
              <div className="h-2 bg-forest-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold-shimmer rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Price breakdown */}
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ivory-400">جمع کل</span>
              <span className="text-ivory-200">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ivory-400">هزینه ارسال</span>
              <span className="text-ivory-200">
                {formData.province
                  ? shippingCost === 0
                    ? "رایگان"
                    : formatPrice(shippingCost)
                  : "پس از انتخاب استان"}
              </span>
            </div>
          </div>

          <div className="border-t border-forest-600/30 mt-4 pt-4 flex items-center justify-between">
            <span className="text-base font-medium text-ivory-100">مبلغ نهایی</span>
            <span className="text-xl font-bold text-gold-200">
              {formData.province ? formatPrice(totalAmount) : formatPrice(subtotal)}
            </span>
          </div>

          {isFreeShipping(subtotal) && formData.province && (
            <p className="text-xs text-green-400 mt-3 flex items-center gap-1">
              <Truck size={12} />
              ارسال این سفارش رایگان است
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
