"use server";

import { categories } from "@/data/categories";
import { db } from "@/prisma/db";
import { OrderStatus, Prisma } from "@prisma/client";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { object } from "zod";

export async function addNewProduct(product: Prisma.ProductCreateInput) {
	// Kontrollera att det är admin (better-auth)
	// kontrollera att product objekt är ok (zod)
	await db.product.create({ data: product });
	revalidatePath("/");
	redirect("/admin");
}

export async function updateProduct(
	id: string,
	data: Prisma.ProductUpdateInput
) {
	if (!id) throw new Error("Product ID is required");

	await db.product.update({ where: { id }, data });
	revalidatePath("/admin");
}

export async function deleteProduct(articleNumber: string) {
	if (!articleNumber) throw new Error("Product ID is required");

	await db.product.delete({ where: { articleNumber } });
	revalidatePath("/admin");
}

//denna ska kanske vara i admin? /h
export async function updateOrderStatus(
	orderNumber: string,
	newStatus: OrderStatus
) {
	if (!orderNumber) {
		throw new Error("Order number is required to update status");
	}

	const updatedOrder = await db.order.update({
		where: { orderNumber },
		data: { status: newStatus },
	});

	revalidatePath(`/admin/orders/${orderNumber}`);
	revalidatePath("/admin/orders");

	return updatedOrder;
}
