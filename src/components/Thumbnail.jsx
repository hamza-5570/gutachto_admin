import { Loader, Maximize } from "lucide-react";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function Thumbnail({
  handleRemoveImage,
  i,
  src,
  isRemove = true,
  type,
  onSetImageIndex,
}) {
  return (
    <div
      key={i}
      style={{ width: type == "video" ? 220 : 120 }}
      className=" h-[120px] relative overflow-hidden rounded-lg border border-[#D1D5DB]"
    >
      {isRemove && (
        <div
          onClick={() => {
            handleRemoveImage(i);
          }}
          className="z-10 absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-white rounded-full cursor-pointer"
        >
          {<FiTrash2 size={13} className="text-[#E90000]" />}
        </div>
      )}
      <img
        src={src}
        alt={`uploaded-${i}`}
        fill
        className="object-cover rounded-lg"
      />
    </div>
  );
}
