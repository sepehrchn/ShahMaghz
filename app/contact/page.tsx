import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "با شاه‌مغز در تماس باشید. پشتیبانی و پاسخ به سوالات شما.",
};

export default function ContactPage() {
  return (
    <div className="bg-forest-950 min-h-screen">
      <div className="bg-forest-900 bg-kraft-texture py-12 lg:py-16">
        <div className="container-brand">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-ivory-50 mb-2">
            تماس با ما
          </h1>
          <p className="text-ivory-400 max-w-2xl">
            سوال یا پیشنهاد دارید؟ خوشحال می‌شویم بشنویم.
          </p>
        </div>
      </div>

      <div className="container-brand py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[
              { icon: Phone, label: "تلفن پشتیبانی", value: "۰۲۱-۸۸۷۷۶۶۵۵" },
              { icon: Mail, label: "ایمیل", value: "info@shahmaghz.ir" },
              { icon: MapPin, label: "آدرس", value: "تهران، خیابان ولیعصر، پلاک ۱۲۳" },
              { icon: Clock, label: "ساعات کاری", value: "شنبه تا پنجشنبه، ۹ تا ۱۸" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 bg-forest-800/50 border border-forest-600/30 rounded-xl p-5"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-sm text-ivory-400">{item.label}</p>
                  <p className="text-base font-medium text-ivory-100 mt-1">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <form className="bg-forest-800/50 border border-forest-600/30 rounded-2xl p-6 lg:p-8 flex flex-col gap-4">
              <h2 className="text-xl font-display font-bold text-ivory-50 mb-2">
                پیام خود را بفرستید
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="نام و نام خانوادگی" name="name" placeholder="نام شما" />
                <Input label="شماره موبایل" name="mobile" placeholder="۰۹۱۲۳۴۵۶۷۸۹" />
              </div>

              <Input label="موضوع" name="subject" placeholder="موضوع پیام" />

              <Textarea
                label="متن پیام"
                name="message"
                rows={5}
                placeholder="پیام خود را اینجا بنویسید..."
              />

              <Button type="submit" size="lg" fullWidth>
                ارسال پیام
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
