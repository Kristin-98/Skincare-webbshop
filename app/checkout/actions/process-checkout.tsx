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
	const products = await db.product.findMany({
		where: { id: { in: productIds } },
	});

	const productMap = new Map(products.map((p) => [p.id, p.price]));

	const orderRows = cart.map((item) => {
		const price = productMap.get(item.id);
		if (price === undefined) {
			throw new Error(`Product with ID ${item.id} not found`);
		}

		return {
			productId: item.id,
			quantity: item.quantity,
			price,
		};
	});

	const totalPrice = orderRows.reduce(
		(sum, row) => sum + row.price * row.quantity,
		0
	);

	const order = await db.order.create({
		data: {
			shippingAdressId: address.id,
			totalPrice,
			customerId: session.user.id,
			orderRows: {
				create: orderRows,
			},
		},
	});

	return order.orderNumber;
}
