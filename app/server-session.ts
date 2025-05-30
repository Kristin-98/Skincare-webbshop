import { auth } from "@/app/auth";

export async function getServerSession() {
	return await auth();
}
