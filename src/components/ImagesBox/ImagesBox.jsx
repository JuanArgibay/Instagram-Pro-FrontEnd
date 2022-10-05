import { useState } from "react";
import LoadingPhoto from "../../assets/icons/loadingPhoto.svg";
import Carousel, { CarouselItem } from "../Carousel/Carousel";

export const ImagesBox = ({ photos, entryOwnerUsername }) => {
  const [photoLoading, setPhotoLoading] = useState(true);

  return (
    photos.length >= 1 && (
      <Carousel>
        {photos.map((photo) => (
          <CarouselItem key={photo.imageId}>
            <img
              src={
                photoLoading
                  ? `${LoadingPhoto}`
                  : `${process.env.REACT_APP_SERVER}/${photo.imageName}`
              }
              alt={`Post from ${entryOwnerUsername}`}
              onLoad={() => {
                setPhotoLoading(false);
              }}
            ></img>
          </CarouselItem>
        ))}
      </Carousel>
    )
  );
};
