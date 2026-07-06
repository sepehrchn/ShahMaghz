import type { Metadata } from "next";
import { AdminGuard } from "@/components/admin/AdminGuard";

export const metadata: Metadata = {
  title: "پنل مدیریت — شاه‌مغز",
  description: "مدیریت محصولات، سفارش‌ها و مشتریان",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>;
}
