"use server";

import { auth } from "@/app/auth";
import { CartItem } from "@/app/providers/cart-provider";
import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { headers } from "next/headers";

export async function processCheckout(
  cart: CartItem[],
  shippingAdress: Prisma.AdressCreateInput
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) throw new Error("Not logged in");
  if (cart.length === 0) throw new Error("Cart is empty");

  const address = await db.adress.create({
    data: shippingAdress,
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const productIds = cart.map((item) => item.id);
  const existingProducts = await db.product.findMany({
    where: { id: { in: productIds } },
  });

  if (existingProducts.length !== productIds.length) {
    throw new Error("One or more products in cart do not exist");
  }

  // Transaktion
  const order = await db.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        shippingAdressId: address.id,
        totalPrice,
        customerId: session.user.id,
        orderRows: {
          create: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    for (const item of cart) {
      const product = await tx.product.findUnique({ where: { id: item.id } });

      if (!product) throw new Error(`Product not found: ${item.id}`);

      if (product.stockQuantity < item.quantity) {
        throw new Error(
          `Not enough stock for product ${product.title}. Available: ${product.stockQuantity}, requested: ${item.quantity}`
        );
      }

      await tx.product.update({
        where: { id: item.id },
        data: { stockQuantity: product.stockQuantity - item.quantity },
      });
    }

    return createdOrder;
  });

  return order.orderNumber;
}
