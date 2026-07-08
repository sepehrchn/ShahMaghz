"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAdminStore } from "@/lib/admin-store";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAdminStore();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isAuthenticated && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoginPage, router]);

  // Let the login page render without the guard
  if (isLoginPage) {
    return <>{children}</>;
  }

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
