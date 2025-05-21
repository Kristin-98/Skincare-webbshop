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
      "https://media.royaldesign.se/1/tradition-drawn-hm3-stol-20?quality=80&w=1366",
    title: "&Tradition Drawn HM3 Matbordsstol Valnöt",
    description:
      "Drawn HM3-stolen är en klassisk dansk design från &Tradition och designad av Hvidt & Mølgaard 1956. Stolen är baserad på traditionella hantverkstekniker och är tillverkad av organiska material. Stolen finns i följande färger: oljad ek, tvålbehandlad ek, oljad valnöt och svartmålad samt har ett fast ryggstöd. Sitsen är handvävd av mer än 100 meter naturpappersnöre, vilket säkerställer en bekväm sittplats. Det är en tidlös stol som med sin enkelhet och eleganta design passar in i alla hem. Stolen är perfekt som matbordsstol och bidrar till en nordisk och stilren atmosfär",
    price: 8230,
    categoryId: "sofa",
    stockQuantity: 1,
  },
  {
    id: "2",
    articleNumber: "22",
    image:
      "https://media.royaldesign.se/1/ferm-living-distinct-soffbord-travertin-100x55-cm-15?quality=80&w=2560",
    title: "Distinct Coffee Table",
    description:
      "Ursprungligen inspirerad av japansk minimalism utforskar Distinct Coffee Table - Travertine skapandet av komplexa strukturer baserade på ett enda element. Den minimalistiska konstruktionen skapar en kontrast till travertinens jordnära texturer. Med de naturliga och mångsidiga egenskaperna hos den sandfärgade kalkstenen tillför den obearbetadhet och påtaglighet som framhäver möbelstyckets arkitektoniska karaktär.",
    categoryId: "sofa",
    stockQuantity: 1,
    price: 17185,
  },
  {
    id: "3",
    articleNumber: "33",
    image:
      "https://image-resizing.booztcdn.com/warm-nordic-furniture/wnf13010801040_c2198870549.webp?has_grey=1&has_webp=1&version=1d2c8dae281b17e45717bd1f977392c4&size=source",
    title: "Dining chair by EW Bach, Skovby, 1950s-60s, Denmark",
    description:
      "Set of 4 chairs manufactured in Denmark in the 1950s-60s by Skovby. The chairs are designed by EW Bach. The chairs are made of mahogany on the structure and veneered with rosewood on the backrest. The chairs have been fully restored and reupholstered by our team. The padding has been changed, and we choose an off-white fabric for these pieces. They are sold as a set of 4 and the price is per piece.",
    categoryId: "sofa",
    stockQuantity: 1,
    price: 4650,
  },
  {
    id: "4",
    articleNumber: "44",
    image:
      "https://www.nordicnest.se/assets/blobs/tradition-little-petra-vb1-fatolj-inkl-pouf-atd1-vitoljad-ek-moonlight/516155-01_1_ProductImageMain_1-a177da6b5f.jpeg?preset=medium",
    title: "FÅTÖLJ + PALL LITTLE PETRA",
    description:
      "Fåtöljen Little Petra med tillhörande fotpall formgavs i slutet på 1930-talet av Viggo Boesen och vann tidigt både uppmärksamhet och utmärkelser. Little Petra är en av relativt få verk formgivna av Viggo Boesen som kom att förknippas med danska funkis-stilen. Little Petra är en robust men samtidigt nätt fåtölj som passar i alla varierande omgivningar. Med sin öppna, inbjudande och låga loungestil är den det självklara valet för en mysig hemmakväll. Säljs här i fyra olika utföranden med tillhörande fotpall. Välj mellan fårskinn Sahara samt Moonlight med benstativ i vitoljad ek eller valnöt. Finns även i fler utföranden för beställning i butik.",
    categoryId: "sofa",
    stockQuantity: 1,
    price: 66410,
  },
  {
    id: "5",
    articleNumber: "55",
    image:
      "https://media.royaldesign.se/1/tradition-ita-bord-18?quality=80&w=1080",
    title: "Ita OS2 matbord, 260 x 95 cm, ek",
    description:
      "Matbordet Ita OS2 från &Tradition förkroppsligar Japandi-andan genom att blanda det bästa från skandinavisk och japansk design. Ita-bordet passar perfekt i både privata och offentliga utrymmen, och fungerar utmärkt som matbord i hemmet eller på restauranger, som skrivbord på kontor eller som blickfång i mötesrum. Bordets minimalistiska design fängslar med sin rena funktionalitet och sin fridfulla harmoni. Ita-kollektionen, som designats av det Köpenhamnsbaserade OEO Studio, består av en rad olika träbord och bänkar som passar in i olika typer av inredningar. Den tidlösa serien ger en känsla av balans och diskret elegans i alla miljöer",
    categoryId: "sofa",
    stockQuantity: 1,
    price: 29840,
  },
  {
    id: "6",
    articleNumber: "66",
    image:
      "https://content.cylindo.com/api/v2/4608/products/161503/frames/1/161503.webp?size=1024&feature=1:261_DANNY_CREAM&feature=LEGS:Walnut_Natural",
    title: "Sigrid",
    description:
      "Sigrid är en klassisk möbel med ett mjukt, subtilt nedtonat uttryck som samtidigt utstrålar ren elegans. Designen är tidlös med vinklade armstöd och massiva träben, där kuddarnas enkelhet understryker designens strama formspråk. Vega Sand Dune är en klassisk och tidlös textil med en enfärgad vävstruktur och en slät naturlig look och känsla. Den har fördelen av att vara tillverkad av en blandning av polyester och akryl, vilket ger hög slitstyrka och ljusbeständighet. Detta säkerställer lång fysisk hållbarhet och gör den lätt att underhålla. Färgen är en verklig klassiker med en blandning av beige, grå och offwhite garn, och de naturliga färgerna framhäver den övergripande naturliga looken. Textilfärgen uppfyller alla OEKO-TEX® 100-standarder.",
    categoryId: "sofa",
    stockQuantity: 1,
    price: 9999,
  },
];
