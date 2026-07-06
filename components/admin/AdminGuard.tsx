"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAdminStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center">
        <p className="text-ivory-400">در حال انتقال به صفحه ورود...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-forest-950 flex">
      <AdminSidebar />
      <div className="flex-1 overflow-x-auto">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}
