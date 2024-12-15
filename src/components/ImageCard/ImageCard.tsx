import { FC } from "react";
import { Image } from "../../services/api";

interface ImageCardProp {
  image: Image;

  onImageClick: (image: Image) => void;
}

const ImageCard: FC<ImageCardProp> = ({ image, onImageClick }) => {
  const handleClick = () => {
    onImageClick(image);
  };
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={handleClick}
      />
    </div>
  );
};
export default ImageCard;
