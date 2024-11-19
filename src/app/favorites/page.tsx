import { EmptyState } from "@/components/emptyState";
import getUser from "../actions/getUser";
import getFavoriteListings from "../actions/getFavoritesListings";
import { FavoritesClient } from "./FavoritesClient";

export const dynamic = "force-dynamic";

export default async function FavoriteListings() {
  const favorites = await getFavoriteListings();
  const user = await getUser();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found."
        subtitle="Looks like you have no favorite listings."
      />
    );
  }
  return <FavoritesClient favorites={favorites} user={user} />;
}
