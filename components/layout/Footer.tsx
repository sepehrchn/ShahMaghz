import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { HandDrawnDivider } from "@/components/ui/BrandMotifs";

const footerLinks = {
  store: {
    title: "فروشگاه",
    links: [
      { href: "/category/nuts", label: "آجیل" },
      { href: "/category/dried-fruits", label: "خشکبار" },
      { href: "/category/chocolate-dipped", label: "شکلاتی و شیرینی" },
      { href: "/category/gift-boxes", label: "جعبه‌های هدیه" },
    ],
  },
  account: {
    title: "حساب کاربری",
    links: [
      { href: "/account", label: "ورود / ثبت‌نام" },
      { href: "/account/orders", label: "سفارش‌های من" },
      { href: "/account/addresses", label: "آدرس‌های من" },
      { href: "/loyalty", label: "باشگاه مشتریان" },
    ],
  },
  company: {
    title: "شرکت",
    links: [
      { href: "/about", label: "درباره شاه‌مغز" },
      { href: "/blog", label: "مجله شاه‌مغز" },
      { href: "/contact", label: "تماس با ما" },
      { href: "/faq", label: "سوالات متداول" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-forest-950 border-t border-forest-700/40 mt-20">
      <div className="container-brand py-12">
        <HandDrawnDivider className="py-0 mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-display font-bold text-gold-200">
              شاه‌مغز
            </span>
            <p className="text-sm text-ivory-400 leading-relaxed">
              منتخب‌ترین آجیل و خشکبار ایران، با عشق و تجربه‌ای سی‌ساله.
              از باغ‌های ایران تا سفره شما، با کیفیتی شاهانه.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://instagram.com/shahmaghz"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-forest-700/50 text-ivory-300 hover:text-gold-200 hover:bg-forest-600 transition-all"
                aria-label="اینستاگرام"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:info@shahmaghz.ir"
                className="p-2 rounded-lg bg-forest-700/50 text-ivory-300 hover:text-gold-200 hover:bg-forest-600 transition-all"
                aria-label="ایمیل"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key} className="flex flex-col gap-3">
              <h4 className="text-sm font-display font-bold text-gold-200">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory-400 hover:text-gold-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-10 pt-8 border-t border-forest-700/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-ivory-400">
            <span className="flex items-center gap-2">
              <Phone size={14} className="text-gold-400" />
              ۰۲۱-۸۸۷۷۶۶۵۵
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} className="text-gold-400" />
              info@shahmaghz.ir
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-gold-400" />
              تهران، خیابان ولیعصر
            </span>
          </div>
          <p className="text-xs text-ivory-400/60">
            © ۱۴۰۳ شاه‌مغز. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
