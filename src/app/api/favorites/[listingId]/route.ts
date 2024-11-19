import { NextResponse } from "next/server";

import getUser from "@/app/actions/getUser";
import prisma from "@/libs/prismadb";

import { ListingParams } from "@/types";

const getFavorites = async (listingId: string | undefined, type: string) => {
  const user = await getUser();

  if (!user) return NextResponse.error();
  // const { listingId } = params;
  if (!listingId || typeof listingId !== "string")
    throw new Error("Invalid ID");

  let favoriteIds = [...(user.favoriteIds || [])];

  if (type === "POST") {
    favoriteIds.push(listingId);
  } else if (type === "DELETE") {
    favoriteIds = favoriteIds.filter((id) => id !== listingId);
  } else {
    return "Invalid type";
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      favoriteIds,
    },
  });
  return updatedUser;
};

export async function POST(
  request: Request,
  { params }: { params: Promise<ListingParams> }
) {
  const { listingId } = await params;
  const updatedUser = await getFavorites(listingId, "POST");
  return NextResponse.json(updatedUser);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<ListingParams> }
) {
  const { listingId } = await params;
  const updatedUser = await getFavorites(listingId, "DELETE");
  return NextResponse.json(updatedUser);
}
