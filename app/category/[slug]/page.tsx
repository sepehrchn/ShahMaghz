import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory, categories } from "@/lib/mock-data";
import { ProductGrid } from "@/components/product/ProductGrid";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "دسته‌بندی یافت نشد" };

  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(params.slug);

  return (
    <div className="bg-forest-950 min-h-screen">
      {/* Category banner */}
      <div className="bg-forest-900 bg-kraft-texture py-12 lg:py-16">
        <div className="container-brand">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-ivory-50 mb-2">
            {category.name}
          </h1>
          <p className="text-ivory-400 max-w-2xl">{category.description}</p>
        </div>
      </div>

      <ProductGrid products={products} categoryName={category.name} />
    </div>
  );
}
