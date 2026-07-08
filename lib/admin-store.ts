import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminState {
  isAuthenticated: boolean;
  username: string;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

/**
 * Admin auth store — mock implementation.
 * Default credentials: admin / admin123
 * In production, replace with NextAuth.js + admin role check.
 */
export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: "",
      login: (username, password) => {
        if (username === "admin" && password === "admin123") {
          set({ isAuthenticated: true, username });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, username: "" }),
    }),
    { name: "shahmaghz-admin" }
  )
);
