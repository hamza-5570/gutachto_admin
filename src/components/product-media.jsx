import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import { ErrorMessage, getIn, useFormikContext } from "formik";
import { LoaderCircle } from "lucide-react";
import { getFileType, normalizeUrl } from "@/utils/helper";
import ImageCropper from "./image-cropper";
import { useUploadImageMutation } from "@/services/admin-api";
import Thumbnail from "./Thumbnail";
import { useTranslation } from "react-i18next";

const MAX_IMAGES = 15;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const DEFAULT_ANGLE = "diagonal view";

export default function ProductMedia({
  title = " Product Media",
  fieldname = "accident.vehicle_images",
}) {
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  const [isDragging, setIsDragging] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [imageIndex, setImageIndex] = React.useState(-1);
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const currentValues = getIn(values, fieldname);
  const { t } = useTranslation();

  const handleUpload = async (file) => {
    console.log("file", file);
    try {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size must be less than 5MB");
        return;
      }

      if ((currentValues?.length || 0) >= MAX_IMAGES) {
        alert(`You can upload up to ${MAX_IMAGES} images only`);
        return;
      }

      // ✅ Prevent upload if same file name & size already exists
      const isDuplicate = currentValues?.some(
        (item) => item.image_url?.includes(file.name) // or better use a hash/id
      );
      if (isDuplicate) {
        alert("This image is already uploaded.");
        return;
      }

      const formData = new FormData();
      formData.append("images", file);
      const response = await uploadImage(formData).unwrap();
      const imageUrl = response[0];
      const FileType = getFileType(imageUrl);

      setFieldValue(fieldname, [
        ...(currentValues || []),
        {
          angle: DEFAULT_ANGLE,
          image_url: normalizeUrl(imageUrl),
          type: FileType,
        },
      ]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      if (
        file?.type === "video/mp4" ||
        file?.type === "video/avi" ||
        file?.type === "video/mov" ||
        file?.type === "video/webm"
      ) {
        await handleUpload(file);
      } else {
        setCropImage(reader.result);
      }
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  const handleCropped = async (blob) => {
    setCropImage(null);
    const uniqueName = `cropped_${Date.now()}.jpg`; // or crypto.randomUUID()
    const file = new File([blob], uniqueName, { type: "image/jpeg" });
    await handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      if (
        file?.type === "video/mp4" ||
        file?.type === "video/avi" ||
        file?.type === "video/mov" ||
        file?.type === "video/webm"
      ) {
        await handleUpload(file);
      } else {
        setCropImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = currentValues?.filter((_, i) => i !== index) || [];
    setFieldValue(fieldname, updatedImages);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#1a1c1e] mt-5">
        <p className="text-sm  text-[#111827] dark:text-white font-semibold">
          {title}
        </p>

        <div
          className={`w-full h-[300px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg mt-4 cursor-pointer transition-colors 
  ${
    errors[fieldname] && touched[fieldname]
      ? "border-[#E90000] focus:ring-[#E90000]"
      : isDragging
      ? "border-[#40CEEC]"
      : "border-[#D1D5DB] focus:ring-[#40B0EC]"
  }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="w-14 h-14 flex items-center justify-center bg-[#EFF6FF] rounded-full">
            <img
              src={"/assets/svg/upload.svg"}
              alt="upload"
              width={27}
              height={28}
            />
          </div>

          <p className="text-sm text-[#111827] dark:text-white font-medium text-center mt-3">
            {t("upload_img.drag_drop")}
          </p>
          <p className="text-sm text-[#6B7280] dark:text-white text-center mt-2">
            {t("upload_img.browse_file")}
          </p>

          <button
            disabled={isLoading || (currentValues?.length || 0) >= MAX_IMAGES}
            className="w-[132px] h-9 rounded-md bg-black hover:bg-black text-sm text-white mt-3 disabled:opacity-50"
            type="button"
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            {t("upload_img.choose_file")}
          </button>

          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/png, image/jpeg, image/jpg , video/avi, video/mov, video/mp4, video/webm, image/webp"
            onChange={handleFileChange}
          />

          <p className="text-sm text-[#9CA3AF] text-center mt-3">
            {t("upload_img.upload")} {MAX_IMAGES} {t("upload_img.images")} •{" "}
            {t("upload_img.max")}
            5MB • JPG, PNG
          </p>
        </div>
        {/* 
        <ErrorMessage
          name={fieldname}
          component="p"
          className="text-[#E90000] text-xs mt-1"
        /> */}

        <div className="flex flex-wrap items-center gap-3 mt-4">
          {currentValues?.map((item, i) => (
            <Thumbnail
              key={i}
              handleRemoveImage={handleRemoveImage}
              i={i}
              src={item.image_url}
              type={item?.type}
              onSetImageIndex={setImageIndex}
            />
          ))}

          {isLoading && (
            <div className="w-[138px] h-[138px] flex items-center justify-center bg-[#F3F4F6] border border-[#D1D5DB] border-dashed rounded-lg cursor-pointer">
              <LoaderCircle size={20} className="animate-spin text-[#40CEEC]" />
            </div>
          )}
        </div>
      </div>

      {cropImage && (
        <ImageCropper
          imageSrc={cropImage}
          onCancel={() => setCropImage(null)}
          onCropComplete={handleCropped}
        />
      )}
    </>
  );
}
