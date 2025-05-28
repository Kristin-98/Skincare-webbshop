// app/category/page.tsx
import { getAllProducts } from "../product-actions";
import { getAllCategories } from "@/app/category/category-actions";
import CategoryPageClient from "./category-page-client";

export default async function CategoryPage() {
	const [categories, products] = await Promise.all([
		getAllCategories(),
		getAllProducts(),
	]);

	return <CategoryPageClient categories={categories} products={products} />;
}
