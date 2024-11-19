import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { z } from "zod";
import prisma from "./libs/prismadb";
import bcrypt from "bcrypt";

import { User } from "@prisma/client";

async function queryUser(email: string): Promise<User | null | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Google,

    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error("Invalid credentials format");
        }

        const { email, password } = parsedCredentials.data;

        try {
          const user = await queryUser(email);
          if (!user || !user.hashedPassword) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashedPassword
          );

          return passwordsMatch ? user : null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
});

// GoogleProvider({
//   clientId: process.env.GOOGLE_CLIENT_ID as string,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
// }),
