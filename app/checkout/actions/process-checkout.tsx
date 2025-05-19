"use server";

import { CartItem } from "@/app/providers/cart-provider";
import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";

export async function processCheckout(
  cart: CartItem[],
  customerData: Prisma.UserCreateInput
) {
  console.log("Hej");

  if (cart.length === 0) {
    throw new Error("Cart is empty");
  }

  const address = await db.address.create({
    data: {
      name: "John Doe",
      streetAdressId: "123-Street-Id", // Note: This name seems odd — did you mean `streetAddress`?
      email: "john@example.com",
      phone: 1234567890,
      postalCode: 12345,
      city: "Sample City",
    },
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await db.order.create({
    data: {
      shippingAdressId: address.id,
      totalPrice,
      customerId: "some-customer-id",
      orderRows: {
        create: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  return order.orderNumber;
}
