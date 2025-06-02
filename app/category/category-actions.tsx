"use server";

import { db } from "@/prisma/db";

export async function getAllCategories() {
	return await db.category.findMany();
}
