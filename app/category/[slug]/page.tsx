import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categories as mockCategories } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: { slug: string };
}

async function getCategories() {
  try {
    const categories = await prisma.categories.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { sortOrder: "asc" },
    });
    return categories.map((cat) => ({
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      description: cat.description || '',
      productCount: cat._count.products,
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return mockCategories;
  }
}

async function getProducts(categoryId: string) {
  try {
    const products = await prisma.products.findMany({
      where: { categoryId },
      include: {
        product_variants: {
          orderBy: { weightGrams: "asc" },
        },
        categories: {
          select: {
            id: true,
            slug: true,
            name: true,
          },
        },
      },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c: any) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categories = await getCategories();
  const category = categories.find((c: any) => c.slug === params.slug);
  
  if (!category) return { title: "دسته‌بندی یافت نشد" };

  return {
    title: category.name,
    description: category.description || '',
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const categories = await getCategories();
  const category = categories.find((c: any) => c.slug === params.slug);
  
  if (!category) notFound();

  const productsRaw = await getProducts(category.id);
  
  // Transform to match expected format
  const products = productsRaw.map((p: any) => ({
    ...p,
    variants: p.product_variants,
    categorySlug: p.categories?.slug || '',
    categoryName: p.categories?.name || '',
  }));

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
