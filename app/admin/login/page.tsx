import type { Metadata } from "next";
import { AdminLogin } from "@/components/admin/AdminLogin";

export const metadata: Metadata = {
  title: "ورود به پنل مدیریت — شاه‌مغز",
  description: "پنل مدیریت شاه‌مغز",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
