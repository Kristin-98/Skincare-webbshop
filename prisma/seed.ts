import { products } from "@/data";
import { categories } from "@/data/categories";
import { db } from "./db";

async function main() {
	for (const { id, ...product } of products) {
		await db.product.upsert({
			where: { articleNumber: product.articleNumber },
			update: product,
			create: product,
		});
	}

	for (const category of categories) {
		await db.category.upsert({
			where: { id: category.id },
			update: {},
			create: category,
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
