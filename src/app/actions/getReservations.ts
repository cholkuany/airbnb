import prisma from "@/libs/prismadb";

import { IParamReservationsProps } from "@/types";
import { Prisma } from "@prisma/client";

export const getReservations = async (params: IParamReservationsProps) => {
  try {
    const { listingId, userId, authorId } = params;

    const query: Prisma.ReservationWhereInput = {};
    if (listingId) {
      query.listingId = listingId;
    }
    if (userId) {
      query.userId = userId;
    }
    if (authorId) {
      // query.authorId = { userId: authorId }; INCLUDE authorId in database
      query.userId = authorId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));
    return safeReservations;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
