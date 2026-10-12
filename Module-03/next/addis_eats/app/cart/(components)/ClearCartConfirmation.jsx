import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { BsCartX } from "react-icons/bs";

const ClearCartConfirmation = ({ onClose, onConfirm }) => {
  return (
    <Modal onClose={onClose}>
      <section className="text-center p-2">
        <BsCartX className="text-3xl md:text-4xl lg:text-5xl bg-red-100 text-red-800 w-20 h-20 p-3 mb-4 mx-auto rounded" />
        <h3 className="text-lg font-bold text-gray-900">Clear Your Cart ?</h3>

        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          This will remove all items from your order. You cannot undo this
          action.
        </p>

        <div className="flex items-center justify-center gap-10 mt-6">
          <Button color="light-red" onClick={onClose}>
            Cancel
          </Button>
          <Button color="red" onClick={onConfirm}>
            Yes, Clear Cart
          </Button>
        </div>
      </section>
    </Modal>
  );
};

export default ClearCartConfirmation;