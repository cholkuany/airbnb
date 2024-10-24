"use client";

import { CategorySelectionProps } from "@/types";

export const CategorySelection: React.FC<CategorySelectionProps> = ({
  onClick,
  selected,
  label,
  icon: Icon,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={30} color="skyblue" />
      <div className="font-semibold">{label}</div>
    </div>
  );
};
