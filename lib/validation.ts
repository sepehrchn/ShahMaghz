import { z } from "zod";

/**
 * Validation schemas for all forms.
 * Error messages are in Persian.
 */

// Iranian mobile: 09XXXXXXXXX (11 digits starting with 09)
export const mobileSchema = z
  .string()
  .min(1, "شماره موبایل الزامی است")
  .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)");

// Persian name: only Persian letters and spaces
export const nameSchema = z
  .string()
  .min(2, "نام باید حداقل ۲ حرف باشد")
  .max(50, "نام نباید بیش از ۵۰ حرف باشد");

export const lastNameSchema = z
  .string()
  .min(2, "نام خانوادگی باید حداقل ۲ حرف باشد")
  .max(50, "نام خانوادگی نباید بیش از ۵۰ حرف باشد");

export const emailSchema = z
  .string()
  .email("ایمیل معتبر نیست")
  .optional()
  .or(z.literal(""));

// Postal code: 10 digits
export const postalCodeSchema = z
  .string()
  .min(1, "کد پستی الزامی است")
  .regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد");

export const addressLineSchema = z
  .string()
  .min(10, "آدرس باید حداقل ۱۰ حرف باشد")
  .max(200, "آدرس نباید بیش از ۲۰۰ حرف باشد");

// Login/Register form
export const loginFormSchema = z.object({
  mobile: mobileSchema,
  firstName: nameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
});

// Address form
export const addressFormSchema = z.object({
  label: z.string().min(1, "عنوان آدرس الزامی است").max(30, "عنوان نباید بیش از ۳۰ حرف باشد"),
  recipient: nameSchema,
  mobile: mobileSchema,
  province: z.string().min(1, "استان را انتخاب کنید"),
  city: z.string().min(1, "شهر الزامی است").max(30, "نام شهر نباید بیش از ۳۰ حرف باشد"),
  postalCode: postalCodeSchema,
  addressLine: addressLineSchema,
});

// Checkout shipping form
export const checkoutShippingSchema = z.object({
  recipient: nameSchema,
  mobile: mobileSchema,
  province: z.string().min(1, "استان را انتخاب کنید"),
  city: z.string().min(1, "شهر الزامی است"),
  postalCode: postalCodeSchema,
  addressLine: addressLineSchema,
  customerNote: z.string().max(500, "یادداشت نباید بیش از ۵۰۰ حرف باشد").optional().or(z.literal("")),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type AddressFormValues = z.infer<typeof addressFormSchema>;
export type CheckoutShippingValues = z.infer<typeof checkoutShippingSchema>;
