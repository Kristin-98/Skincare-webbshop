// server-session.ts
import { auth } from "@/app/auth";
import { headers } from "next/headers";

export async function getServerSession() {
	return auth.api.getSession({ headers: await headers() });
}

export async function assertIsAdmin() {
	const session = await getServerSession();
	if (!session?.user.isAdmin) {
		throw new Error("403 - Not authorized");
	}
}
