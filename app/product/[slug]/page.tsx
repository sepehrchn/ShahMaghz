import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ShoppingBag, Star, MapPin, Shield, Truck } from "lucide-react";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";
import { products as mockProducts, getProductBySlug } from "@/lib/mock-data";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  // Use mock data for static generation
  return mockProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  
  if (!product) return { title: "محصول یافت نشد" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | شاه‌مغز`,
      description: product.description,
      type: "website",
      locale: "fa_IR",
    },
    other: {
      // Schema.org Product markup
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        sku: product.sku,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "IRR",
          price: Math.min(...product.variants.map((v) => v.price)),
          availability:
            product.stockStatus === "OUT_OF_STOCK"
              ? "https://schema.org/OutOfStock"
              : "https://schema.org/InStock",
        },
      }),
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  
  if (!product) notFound();

  return (
    <div className="bg-forest-950 min-h-screen">
      {/* Breadcrumb */}
      <div className="container-brand py-4">
        <nav className="flex items-center gap-2 text-sm text-ivory-400">
          <Link href="/" className="hover:text-gold-200 transition-colors">
            خانه
          </Link>
          <ChevronLeft size={14} />
          <Link
            href={`/category/${product.categorySlug}`}
            className="hover:text-gold-200 transition-colors"
          >
            {product.categoryName}
          </Link>
          <ChevronLeft size={14} />
          <span className="text-ivory-200">{product.name}</span>
        </nav>
      </div>

      <ProductDetailClient product={product} />

      {/* Trust badges */}
      <section className="container-brand py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Truck, title: "ارسال سریع", desc: "تحویل ۲۴ ساعته در تهران، ۳-۵ روز در سراسر کشور" },
            { icon: Shield, title: "ضمانت اصالت", desc: "تضمین کیفیت و اصالت تمام محصولات" },
            { icon: MapPin, title: "خاستگاه مشخص", desc: "هر محصول از منطقه‌ای مشخص، با ذکر منبع" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 bg-forest-800/50 border border-forest-600/30 rounded-xl p-5"
            >
              <div className="w-10 h-10 rounded-lg bg-gold-400/10 border border-gold-400/20 flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-gold-400" />
              </div>
              <div>
                <h3 className="text-sm font-display font-bold text-ivory-100">
                  {item.title}
                </h3>
                <p className="text-xs text-ivory-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
