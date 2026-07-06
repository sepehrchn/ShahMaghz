"use client";

import { useState } from "react";
import { User, Phone, Mail, Calendar, Pencil, Check } from "lucide-react";
import { useAuthStore } from "@/lib/auth-store";
import { useOrderStore } from "@/lib/order-store";
import { useAddressStore } from "@/lib/address-store";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { LoginForm } from "@/components/account/LoginForm";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatPersianDate, toPersianDigits } from "@/lib/format";

export default function AccountPage() {
  const { user, isAuthenticated, updateProfile } = useAuthStore();
  const { orders } = useOrderStore();
  const { addresses } = useAddressStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-forest-950 min-h-screen">
        <div className="bg-forest-900 bg-kraft-texture py-12">
          <div className="container-brand">
            <h1 className="text-3xl font-display font-bold text-ivory-50">حساب کاربری</h1>
          </div>
        </div>
        <div className="container-brand py-12">
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    updateProfile(profileData);
    setIsEditing(false);
  };

  return (
    <div className="bg-forest-950 min-h-screen">
      <div className="bg-forest-900 bg-kraft-texture py-12">
        <div className="container-brand">
          <h1 className="text-3xl font-display font-bold text-ivory-50">حساب کاربری</h1>
        </div>
      </div>

      <div className="container-brand py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <AccountSidebar />

          <div className="flex-1 flex flex-col gap-6">
            {/* Profile card */}
            <div className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-display font-bold text-ivory-50">
                  پروفایل من
                </h2>
                {!isEditing ? (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                    <Pencil size={14} />
                    ویرایش
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" onClick={handleSaveProfile} className="gap-2">
                    <Check size={14} />
                    ذخیره
                  </Button>
                )}
              </div>

              {!isEditing ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <InfoRow icon={User} label="نام" value={`${user.firstName} ${user.lastName}`} />
                  <InfoRow icon={Phone} label="شماره موبایل" value={toPersianDigits(user.mobile)} />
                  <InfoRow icon={Mail} label="ایمیل" value={user.email || "ثبت نشده"} />
                  <InfoRow icon={Calendar} label="تاریخ عضویت" value={formatPersianDate(user.createdAt)} />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="نام"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  />
                  <Input
                    label="نام خانوادگی"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  />
                  <Input
                    label="ایمیل"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    placeholder="example@email.com"
                  />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-ivory-200">شماره موبایل</label>
                    <input
                      disabled
                      value={toPersianDigits(user.mobile)}
                      className="w-full px-4 py-3 rounded-xl bg-forest-900/40 border border-forest-500/20 text-ivory-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <StatCard
                label="سفارش‌ها"
                value={toPersianDigits(orders.length)}
                href="/account/orders"
              />
              <StatCard
                label="آدرس‌ها"
                value={toPersianDigits(addresses.length)}
                href="/account/addresses"
              />
              <StatCard
                label="خرج‌شده"
                value={toPersianDigits(
                  orders
                    .filter((o) => o.status !== "CANCELLED")
                    .reduce((sum, o) => sum + o.totalAmount, 0) / 10000
                ) + " امتیاز"}
                href="/loyalty"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-gold-400" />
      </div>
      <div>
        <p className="text-xs text-ivory-400">{label}</p>
        <p className="text-sm font-medium text-ivory-100 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-5 hover:border-gold-400/20 transition-all flex flex-col gap-1"
    >
      <p className="text-2xl font-display font-bold text-gold-200">{value}</p>
      <p className="text-xs text-ivory-400">{label}</p>
    </a>
  );
}
