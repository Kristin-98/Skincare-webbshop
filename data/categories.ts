import { Category } from "@prisma/client";

export const categories: Category[] = [
	{
		id: "chairs",
		name: "Chairs",
		description:
			"Timeless chairs focused on comfort, craftsmanship, and natural materials. Scandinavian simplicity for every room.",
	},
	{
		id: "tables",
		name: "Tables",
		description:
			"Minimalist tables made of wood and stone with clean lines and functional design built to last.",
	},
	{
		id: "sofas",
		name: "Sofas",
		description:
			"Elegant sofas with soft shapes and muted tones. A balance of relaxation, luxury, and Nordic aesthetics.",
	},
	{
		id: "sale",
		name: "Sale",
		description:
			"Selected design favorites at a reduced price for a limited time.",
	},
];
