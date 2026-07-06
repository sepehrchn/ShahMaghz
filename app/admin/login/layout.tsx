import type { Metadata } from "next";
import { AdminLogin } from "@/components/admin/AdminLogin";

export const metadata: Metadata = {
  title: "ورود به پنل مدیریت",
  description: "پنل مدیریت شاه‌مغز",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  // If this is the login page itself, render without admin layout
  return <AdminLogin />;
}
