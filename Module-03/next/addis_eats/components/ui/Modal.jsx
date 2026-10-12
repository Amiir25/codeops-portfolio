import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = ({ onClose, children }) => {

  return (
    <section
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black/80 transition-all duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded w-[90%] max-w-120 py-8">
        {/* Close Icon */}
        <IoIosCloseCircleOutline
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl cursor-pointer"
        />

        {/* Dynamic content */}
        <div>{children}</div>
      </div>
    </section>
  );
};

export default Modal;