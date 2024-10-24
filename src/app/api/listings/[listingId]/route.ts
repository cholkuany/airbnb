import { NextResponse } from "next/server";

import getUser from "@/app/actions/getUser";
import prisma from "@/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const user = await getUser();

  if (!user) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: user.id,
    },
  });
  return NextResponse.json(listing);
}
