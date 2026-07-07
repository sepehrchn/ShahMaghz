import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders - Fetch orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    const where: any = {};
    if (userId) where.userId = userId;
    if (status) where.status = status;

    const orders = await prisma.orders.findMany({
      where,
      include: {
        order_items: {
          include: {
            products: {
              select: {
                slug: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      guestMobile,
      guestName,
      items,
      shippingInfo,
      subtotal,
      shippingCost,
      discountAmount,
      customerNote,
    } = body;

    // Generate order number
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    const orderNumber = `SM-${year}${month}${day}-${random}`;

    const totalAmount = subtotal + shippingCost - discountAmount;

    const order = await prisma.orders.create({
      data: {
        id: `order-${Date.now()}`,
        orderNumber,
        userId: userId || null,
        guestMobile: guestMobile || null,
        guestName: guestName || null,
        shippingAddress: shippingInfo,
        subtotal,
        shippingCost,
        discountAmount,
        totalAmount,
        status: "PENDING",
        paymentStatus: "PENDING",
        customerNote,
        updatedAt: new Date(),
        order_items: {
          create: items.map((item: any) => ({
            id: `item-${Date.now()}-${Math.random()}`,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
            productName: item.productName,
            variantLabel: item.variantLabel,
          })),
        },
      },
      include: {
        order_items: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
