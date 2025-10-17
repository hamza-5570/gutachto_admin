"use client";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const ImageCropper = ({ imageSrc, onCancel, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteInternal = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async () => {
    if (!croppedAreaPixels) return;

    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          onCropComplete(blob);
        }
        resolve();
      }, "image/jpeg");
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 border-none flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-[500px] h-[500px] flex flex-col">
        <div className="relative flex-1">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            cropSize={{ width: 500, height: 500 }}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteInternal}
            objectFit="horizontal-cover"
            classes={{
              containerClassName: "bg-gray-300",
            }}
          />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            type="button"
            className="w-[100px] h-[40px] rounded-lg border border-[#D1D5DB] text-sm text-[#374151]"
          >
            Cancel
          </button>
          <button
            onClick={getCroppedImage}
            type="button"
            className="w-[128px] h-[40px] rounded-lg text-sm text-white bg-gradient-to-r from-[#40B0EC] to-[#40CEEC]"
          >
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;

function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });
}
