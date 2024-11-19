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
  params: Promise<ListingByIdProps>;
}) {
  const searchParams = await params;

  if (!searchParams.listingId) {
    return <EmptyState title="Invalid Parameters" />;
  }

  try {
    const [listing, reservations, user] = await Promise.all([
      getListingById(searchParams),
      getReservations(searchParams),
      getUser(),
    ]);

    if (!listing) {
      return <EmptyState />;
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
  } catch (error) {
    console.error("Error in ListingDetails:", error);

    return (
      <EmptyState
        title="Something went wrong"
        subtitle="We couldn't load the listing details. Please try again later."
      />
    );
  }
}
