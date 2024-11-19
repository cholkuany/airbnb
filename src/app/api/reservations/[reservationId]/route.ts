import { NextResponse } from "next/server";

import getUser from "@/app/actions/getUser";
import prisma from "@/libs/prismadb";
import { DeleteParams } from "@/types";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<DeleteParams> }
) {
  const user = await getUser();

  if (!user) {
    return NextResponse.error();
  }

  const { reservationId } = await params;

  if (!reservationId || typeof reservationId !== "string") {
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: user.id }, { listing: { userId: user.id } }],
    },
  });

  return NextResponse.json(reservation);
}
