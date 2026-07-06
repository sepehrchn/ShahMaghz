import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as initialProducts, categories, type MockProduct } from "./mock-data";

interface ProductState {
  products: MockProduct[];
  addProduct: (product: MockProduct) => void;
  updateProduct: (id: string, data: Partial<MockProduct>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => MockProduct | undefined;
  updateVariantStock: (productId: string, variantId: string, stock: number) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (id, data) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      getProductById: (id) => get().products.find((p) => p.id === id),
      updateVariantStock: (productId, variantId, stock) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId
              ? {
                  ...p,
                  variants: p.variants.map((v) =>
                    v.id === variantId ? { ...v, stock } : v
                  ),
                  stockStatus:
                    stock === 0
                      ? "OUT_OF_STOCK" as const
                      : stock <= 5
                      ? "LOW_STOCK" as const
                      : "IN_STOCK" as const,
                }
              : p
          ),
        })),
    }),
    { name: "shahmaghz-products" }
  )
);

export { categories };
