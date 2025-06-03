"use server";

import { auth } from "@/app/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getServerSession() {
	return auth.api.getSession({ headers: await headers() });
}

export async function assertIsAdmin() {
	const session = await getServerSession();
	if (!session?.user.isAdmin) {
		redirect("/signin?to=/admin");
	}
}
