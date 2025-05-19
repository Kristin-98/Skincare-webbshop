/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/

import { Product } from "@prisma/client";





/* Lägg till era produkter här */
export const products: Product[] = [
  {
    id: "1",
    articleNumber: "11",
    image:
      "https://beautyofjoseon.com/cdn/shop/files/RiceMilkThumb_0003_LayerComp4_1.jpg?v=1736150232&width=900",
    title: "Toner",
    description:
      "Denna toner är designad för att lugna och återfukta huden efter rengöring. Berikad med rismjölk och fermenterade ingredienser, hjälper den till att balansera hudens pH-nivå och ger en fräsch känsla. Den är perfekt för att förbereda huden för efterföljande hudvårdsprodukter",
    price: 199,
    categoryId: "sofa",
    stockQuantity: 1,
  },
  {
    id: "2",
    articleNumber: "22",
    image:
      "https://beautyofjoseon.com/cdn/shop/files/1_ed366512-7a8b-481b-aff1-13ff67549ae7.png?v=1705211742&width=900",
    title: "Refreshing Pore Mask",
    description:
      "En uppfriskande mask som minskar synligheten av porer och ger en renare, jämnare hudton. Masken innehåller naturliga ingredienser som hjälper till att kontrollera olja och förbättra hudens textur. Den passar bra för de med fet eller kombinerad hud som vill ha en klarare hud",
    categoryId: "sofa",
    stockQuantity: 1,
    price: 250,
  },
  {
    id: "3",
    articleNumber: "33",
    image:
      "https://beautyofjoseon.com/cdn/shop/files/1_8f4b1947-4539-4aff-b2f7-18192c23cbf8.png?v=1705211384&width=528",
    title: "Glow Serum",
    description:
      "Ett ljusgivande serum som hjälper till att ge huden en naturlig lyster. Formulerat med vitaminer och antioxidanter, förbättrar det hudens struktur och återfuktning. Perfekt för att ge trött och glåmig hud en fräsch och ungdomlig glöd",
    categoryId: "sofa",
    stockQuantity: 1,
    price: 79,
  },
  {
    id: "4",
    articleNumber: "44",
    image:
      "https://beautyofjoseon.com/cdn/shop/files/1_c7df0b43-9352-46c1-8dac-dd0602014d6b.png?v=1705211262&width=1080",
    title: "Essence Water",
    description:
      "En näringsrik essence som ger intensiv återfuktning och hjälper till att bibehålla hudens elasticitet. Den innehåller en blandning av fermenterade ingredienser som hjälper till att förbättra hudens allmänna hälsa och ger en plumpande effekt",
    categoryId: "sofa",
    stockQuantity: 1,
    price: 79,
  },
  {
    id: "5",
    articleNumber: "55",
    image:
      "https://beautyofjoseon.com/cdn/shop/files/1_de2af4bd-f530-45da-88bd-8710eb65e937.png?v=1705211261&width=3000",
    title: "Cleansing Oil",
    description:
      "En mild men effektiv rengöringsolja som löser upp smink och orenheter utan att torka ut huden. Oljan omvandlas till en mjuk emulsion vid kontakt med vatten och lämnar huden ren, återfuktad och silkeslen utan att lämna en fet hinna",
    categoryId: "sofa",
    stockQuantity: 1,
    price: 230,
  },
  {
    id: "6",
    articleNumber: "66",
    image:
      "https://beautyofjoseon.com/cdn/shop/files/1-NEW_1.png?v=1736151688&width=1080",
    title: "Dynasty Cream",
    description:
      "En lyxig ansiktskräm som erbjuder djup återfuktning och näring till huden. Med ingredienser som ginseng och andra naturliga extrakt hjälper den till att stimulera hudens återuppbyggnad och minskar synliga tecken på åldrande, såsom fina linjer och rynkor",
    categoryId: "sofa",
    stockQuantity: 1,
    price: 399,
  },
];
