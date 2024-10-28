import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./libs/prismadb";
import bcrypt from "bcrypt";

import GoogleProvider from "next-auth/providers/google";
import { User } from "@prisma/client";

async function getUser(email: string): Promise<User | null | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          if (user?.hashedPassword) {
            const passwordsMatch = await bcrypt.compare(
              password,
              user.hashedPassword
            );
            if (passwordsMatch) return user;
          }
        }
        return null;
      },
    }),
  ],
});

// if(!credentials?.email || !credentials?.password){
//     throw new Error('Invalid credentials')
// }

// const user = await prisma?.user.findUnique({
//     where: {
//         email: credentials.email
//     }
// })

// if(!user || !user?.hashedPassword){
//     throw new Error('Invalid credentials')
// }

// const isCorrectPassword = await bcrypt.compare(
//     credentials.password,
//     user.hashedPassword
// )

// if(!isCorrectPassword){
//     throw new Error('Invalid credentials')
// }

// return user
