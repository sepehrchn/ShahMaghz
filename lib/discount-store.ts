import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DiscountType = "PERCENTAGE" | "FIXED_AMOUNT" | "FREE_SHIPPING";

export interface DiscountCode {
  id: string;
  code: string;
  description: string;
  type: DiscountType;
  value: number;
  minOrderAmount?: number;
  maxUsageCount?: number;
  usageCount: number;
  perUserLimit?: number;
  startsAt?: string;
  endsAt?: string;
  isActive: boolean;
  createdAt: string;
}

interface DiscountState {
  codes: DiscountCode[];
  addCode: (data: Omit<DiscountCode, "id" | "usageCount" | "createdAt">) => void;
  updateCode: (id: string, data: Partial<Omit<DiscountCode, "id">>) => void;
  deleteCode: (id: string) => void;
  toggleActive: (id: string) => void;
}

export const useDiscountStore = create<DiscountState>()(
  persist(
    (set) => ({
      codes: [
        {
          id: "dc-1",
          code: "WELCOME10",
          description: "تخفیف خوش‌آمدگویی برای مشتریان جدید",
          type: "PERCENTAGE" as DiscountType,
          value: 10,
          minOrderAmount: 200000,
          maxUsageCount: 1000,
          usageCount: 142,
          perUserLimit: 1,
          isActive: true,
          createdAt: new Date("2024-01-01").toISOString(),
        },
        {
          id: "dc-2",
          code: "YALDA1403",
          description: "تخفیف ویژه شب یلدا",
          type: "PERCENTAGE" as DiscountType,
          value: 15,
          minOrderAmount: 300000,
          maxUsageCount: 500,
          usageCount: 87,
          perUserLimit: 1,
          startsAt: new Date("2024-12-15").toISOString(),
          endsAt: new Date("2024-12-25").toISOString(),
          isActive: true,
          createdAt: new Date("2024-12-01").toISOString(),
        },
        {
          id: "dc-3",
          code: "FREESHIP",
          description: "ارسال رایگان برای سفارش‌های بالای ۳۰۰ هزار تومان",
          type: "FREE_SHIPPING" as DiscountType,
          value: 0,
          minOrderAmount: 300000,
          maxUsageCount: undefined,
          usageCount: 312,
          isActive: true,
          createdAt: new Date("2024-06-01").toISOString(),
        },
      ],
      addCode: (data) =>
        set((state) => ({
          codes: [
            {
              ...data,
              id: `dc-${Date.now()}`,
              usageCount: 0,
              createdAt: new Date().toISOString(),
            },
            ...state.codes,
          ],
        })),
      updateCode: (id, data) =>
        set((state) => ({
          codes: state.codes.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),
      deleteCode: (id) =>
        set((state) => ({
          codes: state.codes.filter((c) => c.id !== id),
        })),
      toggleActive: (id) =>
        set((state) => ({
          codes: state.codes.map((c) =>
            c.id === id ? { ...c, isActive: !c.isActive } : c
          ),
        })),
    }),
    { name: "shahmaghz-discounts" }
  )
);
