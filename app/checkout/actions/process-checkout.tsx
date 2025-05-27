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
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    throw new Error("Not logged in");
  }

  if (cart.length === 0) {
    throw new Error("Cart is empty");
  }

  const address = await db.adress.create({
    data: shippingAdress,
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await db.order.create({
    data: {
      shippingAdressId: address.id,
      totalPrice,
      customerId: session.user.id,
      orderRows: {
        create: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price, // vad händer om klinten sätter pris till 0??
        })),
      },
    },
  });

  return order.orderNumber;
}
