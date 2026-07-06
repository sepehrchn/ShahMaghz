import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  mobile: string;
  firstName: string;
  lastName: string;
  email?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (mobile: string, firstName: string, lastName: string, email?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, "firstName" | "lastName" | "email">>) => void;
}

/**
 * Client-side auth store.
 * Phase 2 uses a simplified mock auth (no OTP/SMS).
 * In production this will be replaced by NextAuth.js with real OTP.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (mobile, firstName, lastName, email) =>
        set({
          isAuthenticated: true,
          user: {
            id: `user-${Date.now()}`,
            mobile,
            firstName,
            lastName,
            email,
            createdAt: new Date().toISOString(),
          },
        }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    { name: "shahmaghz-auth" }
  )
);
