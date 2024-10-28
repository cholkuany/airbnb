"use client";

import { useCallback } from "react";
import Image from "next/image";

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

import { TbPhotoPlus } from "react-icons/tb";
import { ImageUploadProps } from "@/types";

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
}) => {
  const handleUpload = useCallback(
    (info: CloudinaryUploadWidgetResults["info"]) => {
      if (typeof info === "object" && info?.secure_url) {
        onChange(info.secure_url);
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={(result: CloudinaryUploadWidgetResults) => {
        handleUpload(result?.info);
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
      uploadPreset="tg5pwssv"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed
              border-2
              p-20
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
