"use server";

import { db } from "@/prisma/db";

export async function getAllCategories() {
	return await db.category.findMany();
}

export async function getProductsByCategory(categoryId: string) {
	if (!categoryId) throw new Error("CategoryId is required");

	return await db.products.findMany({
		where: {
			categoryId,
		},
	});
}
