/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/

import { Product } from "@prisma/client";

/* Lägg till era produkter här */
export const products: (Product & { categories: string[] })[] = [
	{
		id: "1",
		articleNumber: "11",
		image:
			"https://cimmermann.uk/cdn/shop/products/tradition-drawn-chair-hm3-oak-1_2048x.jpg?v=1607527835",
		title: "Drawn HM3 Dining Chair",
		description:
			"The Drawn HM3 chair is a classic Danish design from &Tradition, created by Hvidt & Mølgaard in 1956. The chair is based on traditional craftsmanship and made from organic materials. It is available in the following finishes: oiled oak, soap-treated oak, oiled walnut, and black-painted, with a fixed backrest. The seat is hand-woven with more than 100 meters of natural paper cord, ensuring a comfortable sitting experience. This timeless chair fits into any home with its simplicity and elegant design, making it perfect as a dining chair that adds a Nordic and stylish atmosphere.",
		price: 8230,
		categories: ["chairs", "sale"],
		stockQuantity: 8,
	},
	{
		id: "2",
		articleNumber: "22",
		image:
			"https://media.royaldesign.se/1/ferm-living-distinct-soffbord-travertin-100x55-cm-15?quality=80&w=2560",
		title: "Distinct Coffee Table",
		description:
			"Originally inspired by Japanese minimalism, the Distinct Coffee Table - Travertine explores the creation of complex structures from a single element. Its minimalist construction contrasts beautifully with the earthy textures of travertine. With the natural and versatile characteristics of the sand-colored limestone, the piece highlights a raw tactility that enhances its architectural character.",
		categories: ["tables"],
		stockQuantity: 3,
		price: 17185,
	},
	{
		id: "3",
		articleNumber: "33",
		image:
			"https://www.nordicnest.se/assets/blobs/warm-nordic-cow-horn-stol-lader-ivory-valnotsstativ/Cow-Horn-stol-oak-2405059-t-ivory-leathe-78eb173c59.jpeg?preset=medium&dpr=2",
		title: "Dining Chair by EW Bach",
		description:
			"Set of 4 chairs manufactured in Denmark during the 1950s–60s by Skovby. Designed by EW Bach, these chairs feature a mahogany frame with rosewood veneer on the backrest. The chairs have been fully restored and reupholstered by our team. The padding has been replaced and we selected an off-white fabric for the new look. Sold as a set of 4 — the price listed is per piece.",
		categories: ["chairs"],
		stockQuantity: 10,
		price: 4650,
	},
	{
		id: "4",
		articleNumber: "44",
		image:
			"https://www.nordicnest.se/assets/blobs/tradition-little-petra-vb1-fatolj-inkl-pouf-atd1-vitoljad-ek-moonlight/516155-01_1_ProductImageMain_1-a177da6b5f.jpeg?preset=medium",
		title: "Little Petra Lounge Chair + Ottoman",
		description:
			"The Little Petra lounge chair with matching ottoman was designed in the late 1930s by Viggo Boesen and quickly gained attention and awards. It’s one of the relatively few works by Boesen associated with the Danish functionalist style. Despite its robust appearance, Little Petra is compact and fits into a variety of interiors. With its open, inviting, and low-slung lounge style, it’s the perfect choice for a cozy evening at home. Sold here in four versions with matching ottoman. Choose between Sahara or Moonlight sheepskin with legs in white-oiled oak or walnut. Additional versions available for order in-store.",
		categories: ["sofas"],
		stockQuantity: 4,
		price: 66410,
	},
	{
		id: "5",
		articleNumber: "55",
		image:
			"https://media.royaldesign.se/1/tradition-ita-bord-18?quality=80&w=1080",
		title: "Ita OS2 Dining Table, Oak",
		description:
			"The Ita OS2 table from &Tradition embodies the Japandi spirit by blending the best of Scandinavian and Japanese design. Perfect for both private and public spaces, the table works beautifully as a dining table in a home or restaurant, a desk in an office, or a centerpiece in a meeting room. Its minimalist design captivates with pure functionality and serene harmony. Designed by Copenhagen-based OEO Studio, the Ita collection includes a range of wooden tables and benches suited for various interiors. This timeless series adds balance and understated elegance to any space. 260 x 95 cm.",
		categories: ["tables", "sale"],
		stockQuantity: 1,
		price: 29840,
	},
	{
		id: "6",
		articleNumber: "66",
		image:
			"https://image.hm.com/assets/hm/11/83/11832aa11272bb7d8aa3dc9d4bf8f8b2597389f2.jpg?imwidth=768",
		title: "Sigrid",
		description:
			"Sigrid is a classic piece of furniture with a soft, subtly muted expression that radiates pure elegance. The design is timeless, featuring angled armrests and solid wooden legs, while the simple cushions reinforce the strict design language. The Vega Sand Dune fabric is a classic and timeless textile with a monochrome weave structure and a smooth natural look and feel. It's made from a blend of polyester and acrylic, providing excellent durability and lightfastness, ensuring long-lasting performance and easy maintenance. The color is a true classic, blending beige, grey, and off-white yarns to highlight its natural look. The fabric meets all OEKO-TEX® 100 standards.",
		categories: ["sofas"],
		stockQuantity: 1,
		price: 9999,
	},
];