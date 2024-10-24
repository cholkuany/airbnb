import prisma from "@/libs/prismadb";
import getUser from "./getUser";

export default async function getFavoriteListings() {
  try {
    const user = await getUser();

    if (!user) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));
    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
