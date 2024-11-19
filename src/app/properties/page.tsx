import { EmptyState } from "@/components/emptyState";

import getUser from "../actions/getUser";
import getListings from "../actions/getListings";
import { PropertiesClient } from "./propertiesClient";

export const dynamic = "force-dynamic";

const Properties = async () => {
  const user = await getUser();

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListings({
    userId: user.id,
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have not listed any properties."
      />
    );
  }

  return <PropertiesClient listings={listings} user={user} />;
};
export default Properties;
