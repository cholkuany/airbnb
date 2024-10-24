"use client";

import { ButtonProps } from "@/types";

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
            relative 
            disabled:opacity-70 
            disabled:cursor-not-allowed 
            rounded-lg 
            hover:opacity-80 
            transition 
            w-full
            ${outline ? "bg-white" : "bg-rose-500"}
            ${outline ? "border-black" : "bg-rose-500"}
            ${outline ? "text-black" : "text-white"}
            ${small ? "py-1" : "py-3"}
            ${small ? "text-sm" : "text-md"}
            ${small ? "font-light" : "font-semibold"}
            ${small ? "border-[1px]" : "border-2"}
            `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                "
        />
      )}
      {label}
    </button>
  );
};
export default Button;
