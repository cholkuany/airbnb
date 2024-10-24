import Container from "@/components/container";
import { Heading } from "@/components/heading";
import { ListingCard } from "@/components/listings/listingCard";
import { FavoriteClientProps } from "@/types";

export const FavoritesClient: React.FC<FavoriteClientProps> = ({
  favorites,
  user,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div
        className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            "
      >
        {favorites.map((favorite) => (
          <ListingCard key={favorite.id} user={user} data={favorite} />
        ))}
      </div>
    </Container>
  );
};
