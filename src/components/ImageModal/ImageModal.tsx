import Modal from "react-modal";
import { Image } from "../../services/api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

interface ModalProps {
  modalIsOpen: boolean;
  closeModal: VoidFunction;
  modalData: Image | null;
}
export default function ImageModal({
  modalIsOpen,
  closeModal,
  modalData,
}: ModalProps) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <button onClick={closeModal}>close</button>

      {modalData && (
        <img src={modalData.urls.regular} alt={modalData.alt_description} />
      )}
    </Modal>
  );
}
