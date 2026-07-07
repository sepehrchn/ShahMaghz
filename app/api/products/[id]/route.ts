import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products/[id] - Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.products.findUnique({
      where: { id: params.id },
      include: {
        product_variants: {
          orderBy: { weightGrams: "asc" },
        },
        categories: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      longDescription,
      images,
      tags,
      stockStatus,
      isFeatured,
      isPremium,
      origin,
      ingredients,
      storageTips,
      nutritionInfo,
    } = body;

    const product = await prisma.products.update({
      where: { id: params.id },
      data: {
        name,
        description,
        longDescription,
        images,
        tags,
        stockStatus,
        isFeatured,
        isPremium,
        origin,
        ingredients,
        storageTips,
        nutritionInfo,
        updatedAt: new Date(),
      },
      include: {
        product_variants: true,
        categories: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.products.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
