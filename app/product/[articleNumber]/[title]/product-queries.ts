import { db } from "@/prisma/db";

export async function getAllProducts() {
	return db.product.findMany({
		include: {
			categories: true,
		},
	});
}

export async function getProductById(id: string) {
	if (!id) throw new Error("Product ID is required");

	const product = await db.product.findUnique({ where: { id } });

	if (!product) throw new Error("Product not found");

	return product;
}
