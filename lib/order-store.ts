import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "./cart-store";

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
  productId: string;
  productSlug: string;
  productName: string;
  variantId: string;
  variantLabel: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
}

export interface ShippingInfo {
  recipient: string;
  mobile: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  status: OrderStatus;
  customerNote?: string;
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  createOrder: (data: {
    items: CartItem[];
    shippingInfo: ShippingInfo;
    shippingCost: number;
    discountAmount: number;
    customerNote?: string;
  }) => Order;
  getOrderById: (id: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  cancelOrder: (id: string) => void;
}

function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `SM-${year}${month}${day}-${random}`;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      createOrder: (data) => {
        const subtotal = data.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const order: Order = {
          id: `order-${Date.now()}`,
          orderNumber: generateOrderNumber(),
          items: data.items.map((item) => ({
            productId: item.productId,
            productSlug: item.productSlug,
            productName: item.productName,
            variantId: item.variantId,
            variantLabel: item.variantLabel,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
            image: item.image,
          })),
          shippingInfo: data.shippingInfo,
          subtotal,
          shippingCost: data.shippingCost,
          discountAmount: data.discountAmount,
          totalAmount: subtotal + data.shippingCost - data.discountAmount,
          status: "PENDING",
          customerNote: data.customerNote,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },
      getOrderById: (id) => get().orders.find((o) => o.id === id),
      getOrderByNumber: (orderNumber) =>
        get().orders.find((o) => o.orderNumber === orderNumber),
      cancelOrder: (id) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === id ? { ...o, status: "CANCELLED" as OrderStatus } : o
          ),
        })),
    }),
    { name: "shahmaghz-orders" }
  )
);
