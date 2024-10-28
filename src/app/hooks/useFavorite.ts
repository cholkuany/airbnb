import axios from "axios";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { useLoginModal } from "./useModal";

import { FavoritesProps } from "@/types";

export const useFavorite = ({ listingId, user }: FavoritesProps) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const isFavorited = useMemo(() => {
    const list = user?.favoriteIds || [];

    return list.includes(listingId);
  }, [user, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!user) {
        return loginModal.onOpen();
      }

      try {
        let request;
        if (isFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch {
        toast.error("Something went wrong!");
      }
    },
    [user, isFavorited, listingId, loginModal, router]
  );
  return { isFavorited, toggleFavorite };
};
