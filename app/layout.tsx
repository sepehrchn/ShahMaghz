import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ScrollReveal } from "@/components/layout/ScrollReveal";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "شاه‌مغز | آجیل و خشکبار ممتاز ایرانی",
    template: "%s | شاه‌مغز",
  },
  description:
    "فروشگاه آنلاین شاه‌مغز، منتخب‌ترین آجیل، خشکبار و جعبه‌های هدیه لوکس ایران. از باغ‌های رفسنجان تا سفره شما، با کیفیتی شاهانه.",
  keywords: ["آجیل", "خشکبار", "پسته", "بادام", "گردو", "زعفران", "انجیر خشک", "جعبه هدیه", "شاه‌مغز"],
  openGraph: {
    title: "شاه‌مغز | آجیل و خشکبار ممتاز ایرانی",
    description: "منتخب‌ترین آجیل و خشکبار ایران، با عشق و تجربه‌ای سی‌ساله.",
    type: "website",
    locale: "fa_IR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <ScrollReveal />
      </body>
    </html>
  );
}
