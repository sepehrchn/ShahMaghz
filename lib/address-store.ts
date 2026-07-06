import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  id: string;
  label: string;
  recipient: string;
  mobile: string;
  province: string;
  city: string;
  postalCode: string;
  addressLine: string;
  isDefault: boolean;
}

interface AddressState {
  addresses: Address[];
  addAddress: (data: Omit<Address, "id" | "isDefault">) => void;
  updateAddress: (id: string, data: Partial<Omit<Address, "id">>) => void;
  removeAddress: (id: string) => void;
  setDefault: (id: string) => void;
  getDefault: () => Address | undefined;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      addAddress: (data) =>
        set((state) => {
          const isFirst = state.addresses.length === 0;
          const newAddr: Address = {
            ...data,
            id: `addr-${Date.now()}`,
            isDefault: isFirst,
          };
          return { addresses: [...state.addresses, newAddr] };
        }),
      updateAddress: (id, data) =>
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...a, ...data } : a
          ),
        })),
      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),
      setDefault: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),
      getDefault: () => get().addresses.find((a) => a.isDefault),
    }),
    { name: "shahmaghz-addresses" }
  )
);

export const iranianProvinces = [
  "تهران",
  "اصفهان",
  "فارس",
  "خراسان رضوی",
  "خراسان جنوبی",
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "گیلان",
  "مازندران",
  "گلستان",
  "کرمان",
  "یزد",
  "البرز",
  "قم",
  "زنجان",
  "قزوین",
  "همدان",
  "کردستان",
  "کرمانشاه",
  "لرستان",
  "ایلام",
  "خوزستان",
  "بوشهر",
  "هرمزگان",
  "سیستان و بلوچستان",
  "چهارمحال و بختیاری",
  "کهگیلویه و بویراحمد",
];
