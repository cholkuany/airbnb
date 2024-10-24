"use client";

import { useCountries } from "@/app/hooks/useCountries";
import { ListingHeadProps } from "@/types";
import { Heading } from "../heading";
import Image from "next/image";
import { HeartButton } from "../HeartButton";

export const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  user,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.name}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} user={user} />
        </div>
      </div>
    </>
  );
};
