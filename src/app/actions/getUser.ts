import prisma from "../../libs/prismadb";
import { auth } from "../../auth";

export async function getSession() {
  const sess = await auth();
  if (!sess?.user) return null;
  return sess;
}

export default async function getUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });
    if (!user) return null;

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
