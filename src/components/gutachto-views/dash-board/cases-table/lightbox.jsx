import React, { useState } from "react";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import Lightbox from "react-image-lightbox";

export default function ImageLightbox({images,}) {
  const [photoIndex, setPhotoIndex] = useState({
    photoIndex: 0,
    isOpen: false,
  });
  return (
    <Lightbox
      mainSrc={images[photoIndex.photoIndex]}
      nextSrc={images[(photoIndex.photoIndex + 1) % images.length]}
      prevSrc={images[(photoIndex.photoIndex + images.length - 1) % images.length]}
      onCloseRequest={() => this.setState({ isOpen: false })}
      onMovePrevRequest={() =>
      setPhotoIndex((pre)=>{
        return {
          ...pre,
          photoIndex: (photoIndex.photoIndex + images.length - 1) % images.length,
        }
      })
      }
      onMoveNextRequest={() =>
        setPhotoIndex((pre)=>{
          return {
            ...pre,
            photoIndex: (photoIndex.photoIndex + 1) % images.length,
          }
        })
      }
    />
  );
}
