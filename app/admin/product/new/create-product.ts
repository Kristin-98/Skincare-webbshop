
"use server";

import { db } from "@/db";
import { Prisma } from "@prisma/client";

export async function createProduct(data: Prisma.ProductCreateInput) {
	try {
		const newProduct = await db.product.create({
			data: {
				...data,
				categories: {
					connect: data.categories?.connect || [],
				},
			},
		});
		return newProduct;
	} catch (error) {
		console.error("Error creating product:", error);
		throw error;
	}
}
