import { Image } from "../../services/api";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface ImageProps {
  images: Image[];

  onImageClick: (image: Image) => void;
}
export const ImageGallery: React.FC<ImageProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <ul className={css.photo}>
      {images.map((image) => {
        return (
          <li key={image.id}>
            <ImageCard image={image} onImageClick={onImageClick} />
          </li>
        );
      })}
    </ul>
  );
};
