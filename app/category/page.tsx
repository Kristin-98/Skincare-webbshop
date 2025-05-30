import { getAllProducts } from "../product/[articleNumber]/[title]/product-queries";
import CategoryPageClient from "./category-page-client";
import { db } from "@/prisma/db";

export async function getAllCategories() {
	return await db.category.findMany();
}

export default async function CategoryPage() {
	const [categories, products] = await Promise.all([
		getAllCategories(),
		getAllProducts(),
	]);

	return <CategoryPageClient categories={categories} products={products} />;
}
