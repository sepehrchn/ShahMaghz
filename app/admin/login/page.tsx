"use client";

import { useAdminStore } from "@/lib/admin-store";

export default function AdminLoginPage() {
  const { isAuthenticated } = useAdminStore();

  // If already authenticated, the AdminLogin component will still render.
  // The layout handles redirect logic.
  return null;
}
