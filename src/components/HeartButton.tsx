"use client";

import { useFavorite } from "@/app/hooks/useFavorite";
import { HeartButtonProps } from "@/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  user,
}) => {
  const { isFavorited, toggleFavorite } = useFavorite({ listingId, user });
  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          hover:fill-rose-500
          absolute
          -top-[2px]
          -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={
          isFavorited
            ? "fill-rose-500"
            : "fill-neutral-500/70 hover:fill-rose-500"
        }
      />
    </div>
  );
};
