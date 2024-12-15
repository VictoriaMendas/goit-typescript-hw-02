import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

import ImageModal from "../components/ImageModal/ImageModal";
import Loader from "../components/Loader/Loader";
import LoadMoreBtn from "../components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "../components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { fetchImages, Image } from "../services/api";
import { useEffect, useState } from "react";
import { ImageGallery } from "../components/ImageGallery/ImageGallery";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Image | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (query === "") {
      return;
    }

    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchImages(query, page);

        setImages((prevImages) => [...prevImages, ...data.results]);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    asyncWrapper();
  }, [query, page]);
  const getQuery = (query: string) => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const onLoadMoreBtn = () => {
    setPage((prevPage) => page + 1);
  };

  const openModal = (image: Image) => {
    setIsOpen(true);
    setModalData(image);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };
  return (
    <>
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 && <LoadMoreBtn onClick={onLoadMoreBtn} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage error={error} />}
      <SearchBar onSubmit={getQuery} />
      <ImageModal
        closeModal={closeModal}
        modalData={modalData}
        modalIsOpen={modalIsOpen}
      />
      <Toaster />
    </>
  );
}

export default App;
