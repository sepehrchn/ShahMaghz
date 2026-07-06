"use client";

import { useAuthStore } from "@/lib/auth-store";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { OrderList } from "@/components/account/OrderList";
import { LoginForm } from "@/components/account/LoginForm";

export default function OrdersPage() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="bg-forest-950 min-h-screen">
        <div className="bg-forest-900 bg-kraft-texture py-12">
          <div className="container-brand">
            <h1 className="text-3xl font-display font-bold text-ivory-50">سفارش‌های من</h1>
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

  return (
    <div className="bg-forest-950 min-h-screen">
      <div className="bg-forest-900 bg-kraft-texture py-12">
        <div className="container-brand">
          <h1 className="text-3xl font-display font-bold text-ivory-50">سفارش‌های من</h1>
        </div>
      </div>
      <div className="container-brand py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <AccountSidebar />
          <div className="flex-1">
            <OrderList />
          </div>
        </div>
      </div>
    </div>
  );
}
