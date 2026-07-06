import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { WaxSeal } from "@/components/ui/BrandMotifs";

export default function NotFound() {
  return (
    <div className="bg-forest-950 min-h-screen flex items-center justify-center">
      <div className="container-brand">
        <div className="max-w-md mx-auto text-center flex flex-col items-center gap-6">
          <WaxSeal label="۴۰۴" className="w-20 h-20" />

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-display font-bold text-ivory-50">
              صفحه یافت نشد
            </h1>
            <p className="text-ivory-400">
              صفحه‌ای که دنبال آن بودید وجود ندارد یا جابه‌جا شده است.
            </p>
          </div>

          <Link href="/">
            <Button size="lg">
              بازگشت به خانه
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
