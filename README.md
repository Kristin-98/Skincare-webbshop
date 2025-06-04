# Webbshop - Scandi Furniture

## Description

Webshop -- Scandi Furniture is a modern e-commerce application where users can browse and shop for elegant Scandinavian-style furniture and home decor. The app features a curated selection of products that emphasize minimalist design, natural materials, and functional beauty. Built with modern web technologies, Scandi Furniture offers a smooth, responsive, and intuitive user experience making it easy to explore, discover, and purchase stylish interior pieces.

![Responsive Mockup](https://github.com/Kristin-98/Skincare-webbshop/blob/main/public/responsive.png)

[Click to View Live Website](https://skincare-webbshop.vercel.app/)

## Technologies

The project is built with the following technologies:

- **React** - To create a dynamic and interactive frontend
- **Next.js** - For server-side rendering and better performance
- **TypeScript** - For type-safe development
- **MUI (Material-UI)** - For sleek and responsive UI components
- **Prisma** - For database management

## Installation and Running

Follow these steps to install and run the project locally:

1. Clone this repository:

   ```sh
   git clone https://github.com/Kristin-98/Skincare-webbshop.git
   ```

2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables by creating a .env file and filling in the relevant variables for Prisma and other services.

4. Migrate the database:
   ```sh
   npx prisma migrate dev
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## Link to Design System

We use **MUI (Material-UI)** as the design system. The documentation can be found here:
[Material-UI Documentation](https://mui.com/)

Kravspecifikationpåprojektet:

•Alla sidor skall vara responsiva. (G) [ja]
•Arbetet ska implementeras med NextJS. (G) [ja]
•Backenden ska ha validering på samtliga endpoints (även Server Actions). (G) [ja i våra actions-filer]
•Skapa ett ER diagram som ska ha visats vid idégodkännandet (G) [ja]
•Beskriv er företagsidé i en kort textuell presentation, detta ska ha visats vid idégodkännandet (G) [ja]
•All data som programmet utnyttjar ska vara sparat i en SQL databas (produkter, beställningar, konton, mm) med undantaget av bilder. (G) [ja]
•Man ska kunna logga in som administratör i systemet (G) [ja]
•Inga Lösenord får sparas i klartext i databasen (G) [ja]
•En besökare ska kunna beställa produkter från sidan, detta ska uppdatera lagersaldot i databasen (G) [ja]
•Administratörer ska kunna uppdatera antalet produkter i lager från admin delen av sidan (G) [ja]
•Administratörer ska kunna se en lista på alla gjorda beställningar (G) [ja]
•Sidans produkter ska delas upp i kategorier, en produkt ska tillhöra minst en kategori, men kan tillhöra flera (G) [ja]
•Från hemsidan ska man kunna se en lista över alla produkter, och man ska kunna lista bara dom produkter som tillhör en kategori (G) [ja i categories]
•Besökare ska kunna lägga produkterna i en kundkorg, som är sparad i local-storage på klienten (G) [ja]
•En besökare som gör en beställning ska få möjligheten att registrera sig samt logga in och måste vara inloggad som kund innan beställningen skapas (G) [ja, det står att man måste logga in]
•Checkoutflödet i frontendapplikationen ska ha validering på samtliga fält (G) [ja zod]
•När man är inloggad som kund ska man kunna se sina gjorda beställning och om det är skickade eller inte (G) [ja, your orders]
•Administratörer ska kunna redigera produkt (G) [ja]
•Administratörer ska kunna lägga till och ta bort produkter (G) [ja]
•Administratörer ska kunna markera beställningar som skickade (G) [ja, admin-sidan]