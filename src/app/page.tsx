import Container from "@/components/container";
import { EmptyState } from "@/components/emptyState";
import getListings from "./actions/getListings";
import { ListingCard } from "@/components/listings/listingCard";
import getUser from "./actions/getUser";
import { SafeListing } from "@/types";
import { PropertiesSearchParams } from "@/types";

type Params = Promise<PropertiesSearchParams>;

export const dynamic = "force-dynamic";

const Home = async ({ params }: { params: Params }) => {
  const searchParams = await params;
  const listings = await getListings(searchParams);
  const user = await getUser();

  if (listings.length === 0) {
    return (
      <>
        <EmptyState showReset />
      </>
    );
  }
  return (
    <Container>
      <div
        className="
        p-24 grid grid-cols-1 sm:grid-cols-2
        md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
        2xl:grid-cols-6 gap-8
      "
      >
        {listings.map((listing: SafeListing) => {
          return <ListingCard key={listing.id} data={listing} user={user} />;
        })}
      </div>
    </Container>
  );
};
export default Home;
