"use client";

import qs from "query-string";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

import { CategoryWrapperProps } from "@/types";

const CategoryWrapper: React.FC<CategoryWrapperProps> = ({
  icon: Icon,
  label,
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const category = searchParams?.get("category");
  const selected = category === label;

  const handleCLick = useCallback(() => {
    let currentQuery = {};
    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }
    const updatedQuery: Record<string, string | number | string[] | undefined> =
      {
        ...currentQuery,
        category: label,
      };

    if (searchParams?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true }
    );
    router.push(url);
  }, [label, searchParams, router]);

  return (
    <div
      onClick={handleCLick}
      className={`
            flex 
            flex-col 
            items-center 
            justify-center 
            gap-2 
            p-4 
            border-b-2 
            hover:text-neutral-800 
            transition 
            cursor-pointer
            ${
              selected
                ? "border-b-neutral-800 text-neutral-800"
                : "border-transparent text-neutral-500"
            }
        `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryWrapper;
