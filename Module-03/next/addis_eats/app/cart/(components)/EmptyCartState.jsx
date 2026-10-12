import { FiShoppingCart } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

const EmptyCartState = ({ message }) => {
  return (
    <section className="text-center p-2 flex flex-col items-center justify-center h-screen">
      <FiShoppingCart className="text-3xl md:text-4xl lg:text-5xl bg-gray-100 text-gray-800 w-20 h-20 p-3 mb-4 mx-auto rounded" />
      <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>

      <p className="text-sm text-gray-500 mt-2 leading-relaxed">{message}</p>

      <div className="mt-6">
        <Link href={"/menu"}>
          <Button color="brand">
            <FaArrowLeft />
            Back to Menu
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default EmptyCartState;
