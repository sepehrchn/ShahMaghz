/**
 * Shipping cost calculation.
 * Assumption: 50,000 Toman base + per-province rate.
 * Free shipping for orders over 500,000 Toman.
 */

export const FREE_SHIPPING_THRESHOLD = 500_000;
export const BASE_SHIPPING_COST = 50_000;

// Additional cost per province (in Toman)
const provinceShippingRates: Record<string, number> = {
  "تهران": 0,
  "البرز": 10_000,
  "قم": 15_000,
  "قزوین": 15_000,
  "اصفهان": 20_000,
  "فارس": 25_000,
  "خراسان رضوی": 30_000,
  "خراسان جنوبی": 30_000,
  "آذربایجان شرقی": 30_000,
  "آذربایجان غربی": 30_000,
  "گیلان": 20_000,
  "مازندران": 20_000,
  "گلستان": 25_000,
  "کرمان": 30_000,
  "یزد": 25_000,
  "زنجان": 20_000,
  "همدان": 20_000,
  "کردستان": 25_000,
  "کرمانشاه": 25_000,
  "لرستان": 25_000,
  "ایلام": 30_000,
  "خوزستان": 30_000,
  "بوشهر": 35_000,
  "هرمزگان": 35_000,
  "سیستان و بلوچستان": 40_000,
  "چهارمحال و بختیاری": 30_000,
  "کهگیلویه و بویراحمد": 30_000,
};

export function calculateShippingCost(province: string, subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  const provinceRate = provinceShippingRates[province] ?? 30_000;
  return BASE_SHIPPING_COST + provinceRate;
}

export function isFreeShipping(subtotal: number): boolean {
  return subtotal >= FREE_SHIPPING_THRESHOLD;
}

export function getRemainingForFreeShipping(subtotal: number): number {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
}
