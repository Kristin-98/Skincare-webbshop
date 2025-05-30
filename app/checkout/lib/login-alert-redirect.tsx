"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotLoggedInRedirect() {
	const router = useRouter();

	useEffect(() => {
		alert("Must be logged in to checkout");
		router.push("/");
	}, [router]);

	return null;
}
