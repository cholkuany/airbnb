import { getListingById } from "@/app/actions/getListingById";
import getUser from "@/app/actions/getUser";
import Container from "@/components/container";
import { EmptyState } from "@/components/emptyState";
import { ListingByIdProps } from "@/types";
import { ListingClient } from "./listingClient";
import { getReservations } from "@/app/actions/getReservations";

export default async function ListingDetails({
  params,
}: {
  params: ListingByIdProps;
}) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const user = await getUser();

  if (!listing) {
    return (
      <>
        <EmptyState />
      </>
    );
  }
  return (
    <Container>
      <ListingClient
        listing={listing}
        user={user}
        reservations={reservations}
      />
    </Container>
  );
}
