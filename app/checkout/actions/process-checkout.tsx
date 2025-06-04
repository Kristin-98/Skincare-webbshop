"use server";

import { CartItem } from "@/app/providers/cart-provider";
import { getServerSession } from "@/app/server-session";
import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";

export async function processCheckout(
  cart: CartItem[],
  shippingAdress: Prisma.AdressCreateInput
) {
  const session = await getServerSession();

  if (!session) {
    throw new Error("Not logged in");
  }

  if (cart.length === 0) {
    throw new Error("Cart is empty");
  }

  const address = await db.adress.create({
    data: shippingAdress,
  });

  const productIds = cart.map((item) => item.id);
  const existingProducts = await db.product.findMany({
    where: { id: { in: productIds } },
  });

  if (existingProducts.length !== productIds.length) {
    throw new Error("One or more products in cart do not exist");
  }

  const productMap = new Map(existingProducts.map((p) => [p.id, p]));

  const totalPrice = cart.reduce((sum, item) => {
    const product = productMap.get(item.id);
    if (!product) {
      throw new Error(`Product not found: ${item.id}`);
    }
    return sum + product.price * item.quantity;
  }, 0);

  const order = await db.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        shippingAdressId: address.id,
        totalPrice,
        customerId: session.user.id,
        orderRows: {
          create: cart.map((item) => {
            const product = productMap.get(item.id);
            if (!product) {
              throw new Error(
                `Product not found during order creation: ${item.id}`
              );
            }

            return {
              productId: item.id,
              quantity: item.quantity,
              price: product.price,
            };
          }),
        },
      },
    });

    for (const item of cart) {
      const product = await tx.product.findUnique({ where: { id: item.id } });

      if (!product) throw new Error(`Product not found: ${item.id}`);

      await tx.product.update({
        where: { id: item.id },
        data: { stockQuantity: product.stockQuantity - item.quantity },
      });
    }

    return createdOrder;
  });

  return order.orderNumber;
}
