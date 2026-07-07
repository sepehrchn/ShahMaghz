import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products - Fetch all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const featured = searchParams.get("featured");

    const where: any = {};
    if (categoryId) where.categoryId = categoryId;
    if (featured === "true") where.isFeatured = true;

    const products = await prisma.products.findMany({
      where,
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

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      name,
      description,
      longDescription,
      categoryId,
      images,
      tags,
      stockStatus,
      isFeatured,
      isPremium,
      sku,
      origin,
      ingredients,
      storageTips,
      nutritionInfo,
      variants,
    } = body;

    const product = await prisma.products.create({
      data: {
        id: `prod-${Date.now()}`,
        slug,
        name,
        description,
        longDescription,
        categoryId,
        images: images || [],
        tags: tags || [],
        stockStatus: stockStatus || "IN_STOCK",
        isFeatured: isFeatured || false,
        isPremium: isPremium || false,
        sku,
        origin,
        ingredients: ingredients || [],
        storageTips,
        nutritionInfo,
        rating: 0,
        reviewCount: 0,
        updatedAt: new Date(),
        product_variants: {
          create: variants.map((v: any) => ({
            id: `${slug}-${v.weightGrams}`,
            sku: `${sku}-${v.weightGrams}G`,
            weightGrams: v.weightGrams,
            packageLabel: v.packageLabel,
            price: v.price,
            compareAtPrice: v.compareAtPrice,
            stock: v.stock,
            updatedAt: new Date(),
          })),
        },
      },
      include: {
        product_variants: true,
        categories: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
