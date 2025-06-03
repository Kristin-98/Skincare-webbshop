import { getAllCategories } from "@/app/category/category-actions";
import { getAllProducts } from "../product/[articleNumber]/[title]/product-actions";
import CategoryPageClient from "./category-page-client";

export default async function CategoryPage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return <CategoryPageClient categories={categories} products={products} />;
}
