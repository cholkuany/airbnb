import prisma from "@/libs/prismadb";
import { PropertiesSearchParams } from "@/types";
import { Prisma } from "@prisma/client";

export default async function getListings(params: PropertiesSearchParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    const query: Prisma.ListingWhereInput = {};

    if (userId) {
      query.userId = userId;
    }
    if (category) {
      query.category = category;
    }
    if (roomCount) {
      query.roomCount = { gte: +roomCount };
    }
    if (guestCount) {
      query.guestCount = { gte: +guestCount };
    }
    if (bathroomCount) {
      query.bathroomCount = { gte: +bathroomCount };
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const SafeListing = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return SafeListing;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
}
