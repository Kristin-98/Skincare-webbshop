import { db } from "@/prisma/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

 
export const auth = betterAuth({
    trustedOrigins: ["http://localhost:5173"],
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    socialProviders: { 
        github: { 
           clientId: process.env.GITHUB_CLIENT_ID as string, 
           clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
    }, 
 // 👇 Lägg till detta block
  transformSession: async ({ session, user }) => {
    return {
      ...session,
      user: {
        ...session.user,
        isAdmin: user.isAdmin, // 👈 lägg till isAdmin i sessionen
      },
    };
  },
});