import { EmptyState } from "@/components/emptyState";

import getUser from "../actions/getUser";
import { getReservations } from "../actions/getReservations";
import { TripsClient } from "./tripsClient";
import { Suspense } from "react";
import { SearchLoader } from "@/components/loader";

export const dynamic = "force-dynamic";

const Trips = async () => {
  const user = await getUser();

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }
  const reservations = await getReservations({
    userId: user.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you have not reserved any trips."
      />
    );
  }

  return (
    <Suspense fallback={<SearchLoader />}>
      <TripsClient reservations={reservations} user={user} />
    </Suspense>
  );
};
export default Trips;
