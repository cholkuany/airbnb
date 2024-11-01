"use client";

export default function MenuItem({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <div
      onClick={onClick}
      className="
            px-4
            py-3
            hover:bg-neutral-100
            transition
            font-semibold
        "
    >
      {label}
    </div>
  );
}
