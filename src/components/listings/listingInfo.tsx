"use client";

import React, { memo } from "react";

import { useCountries } from "@/app/hooks/useCountries";
import { ListingInfoProps } from "@/types";
import Avatar from "../avatar";
import { ListingCategory } from "./listingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../map").then((module) => module.Map), {
  ssr: false,
});

export const ListingInfo: React.FC<ListingInfoProps> = memo((props) => {
  const {
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue,
  } = props;
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  console.log("ListingInfo re-rendered due to props:", props);

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          name={category.name}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      {coordinates && <Map key={coordinates.toString()} center={coordinates} />}
    </div>
  );
});
