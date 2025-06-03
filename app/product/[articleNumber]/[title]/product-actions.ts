"use server";

import { assertIsAdmin } from "@/app/server-session";
import { db } from "@/prisma/db";
import { OrderStatus, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addNewProduct(product: Prisma.ProductCreateInput) {
  await assertIsAdmin();
  await db.product.create({ data: product });
  revalidatePath("/");
  redirect("/admin");
}

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

export async function updateProduct(
  id: string,
  data: Prisma.ProductUpdateInput
) {
  await assertIsAdmin();
  if (!id) throw new Error("Product ID is required");

  await db.product.update({ where: { id }, data });
  revalidatePath("/admin");
}

export async function deleteProduct(articleNumber: string) {
  await assertIsAdmin();
  if (!articleNumber) throw new Error("Product ID is required");

  await db.product.delete({ where: { articleNumber } });
  revalidatePath("/admin");
}

export async function updateOrderStatus(
  orderNumber: string,
  newStatus: OrderStatus
) {
  await assertIsAdmin();
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
