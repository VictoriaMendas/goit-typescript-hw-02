import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import { fetchImages } from "./services/api";
import { useEffect, useState } from "react";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query === "") {
      return;
    }
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchImages(query, page);

        setImages((prevImages) => {
          return [...prevImages, ...data.results];
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    asyncWrapper();
  }, [query, page]);
  const getQuery = async (query) => {
    setQuery(query);
    setImages([]);
  };

  const onLoadMoreBtn = async () => {
    setPage(page + 1);
  };

  const openModal = (image) => {
    setIsOpen(true);
    setModalData(image);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };
  return (
    <>
      <SearchBar onSubmit={getQuery} />
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 && <LoadMoreBtn onClick={onLoadMoreBtn} />}
      {isLoading && <Loader />}
      {error && <ErrorMessage error={error} />}
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
