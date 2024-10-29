"use client";

import Container from "../container";

import { TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiIsland,
  GiWindmill,
  GiGrapes,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { LiaUmbrellaBeachSolid } from "react-icons/lia";
import { FaSkiing } from "react-icons/fa";
import { PiCactus } from "react-icons/pi";
import { IoSnowOutline } from "react-icons/io5";

import { MdOutlineVilla } from "react-icons/md";
import CategoryWrapper from "../categoryWrapper";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LoadSuspense } from "../contentFiller";

export const categories = [
  {
    name: "Beach",
    icon: LiaUmbrellaBeachSolid,
    description: "The property is close to the beach.",
  },
  {
    name: "Windmills",
    icon: GiWindmill,
    description: "The property has a wind mill.",
  },
  {
    name: "Modern",
    icon: MdOutlineVilla,
    description: "The property is close to the beach.",
  },
  {
    name: "Countryside",
    icon: TbMountain,
    description: "The property is close to the beach.",
  },
  {
    name: "Pool",
    icon: TbPool,
    description: "The property is close to the beach.",
  },
  {
    name: "Island",
    icon: GiIsland,
    description: "The property is close to the beach.",
  },
  {
    name: "Lakefront",
    icon: GiBoatFishing,
    description: "The property is close to the beach.",
  },
  {
    name: "Skiing",
    icon: FaSkiing,
    description: "The property is close to the beach.",
  },
  {
    name: "Castle",
    icon: GiCastle,
    description: "The property is close to the beach.",
  },
  {
    name: "Camping",
    icon: GiForestCamp,
    description: "The property is close to the beach.",
  },
  {
    name: "Arctic",
    icon: IoSnowOutline,
    description: "The property is close to the beach.",
  },
  {
    name: "Desert",
    icon: PiCactus,
    description: "The property is close to the beach.",
  },
  {
    name: "Barns",
    icon: GiBarn,
    description: "The property is close to the beach.",
  },
  {
    name: "Luxe",
    icon: IoDiamond,
    description: "The property is close to the beach.",
  },
  {
    name: "Vineyard",
    icon: GiGrapes,
    description: "The property is close to the beach.",
  },
];

export default function Categories() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category");
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  if (!isHomePage) return;
  return (
    <Container>
      <Suspense fallback={<LoadSuspense />}>
        <div className="pt-4 gap-4 flex flex-row items-center justify-center overflow-x-auto">
          {categories.map((item) => {
            return (
              <CategoryWrapper
                key={item.name}
                label={item.name}
                icon={item.icon}
                selected={category === item.name}
              />
            );
          })}
        </div>
      </Suspense>
    </Container>
  );
}
