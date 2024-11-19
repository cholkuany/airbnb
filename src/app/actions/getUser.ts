import prisma from "../../libs/prismadb";
import { auth } from "../../auth";

export async function getSession() {
  try {
    const session = await auth();
    if (!session?.user) return null;
    return session;
  } catch (error: unknown) {
    console.log("Failed to fetch session:", error);
    return null;
  }
}

export default async function getUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      console.warn("No user session or email found");
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    if (!user) {
      console.warn("No user found for the given email");
      return null;
    }

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    };
  } catch (error: unknown) {
    console.error("An error occurred in getUser:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("An unexpected error occurred");
  }
}
