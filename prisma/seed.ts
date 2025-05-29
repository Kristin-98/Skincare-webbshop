import { products } from "@/data";
import { categories } from "@/data/categories";
import { db } from "./db";

async function main() {
	for (const category of categories) {
		await db.category.upsert({
			where: { id: category.id },
			update: {},
			create: category,
		});
	}
	for (const { id, categories: productCategoryIds, ...product } of products) {
		console.log("products", products);
		await db.product.upsert({
			where: { articleNumber: product.articleNumber },
			update: {
				...product,
				categories: {
					connect: productCategoryIds.map((id) => ({ id })),
				},
			},
			create: {
				...product,
				categories: {
					connect: productCategoryIds.map((id) => ({ id })),
				},
			},
		});
	}
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
