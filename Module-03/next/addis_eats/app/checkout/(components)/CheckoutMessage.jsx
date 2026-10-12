import { MdCelebration } from "react-icons/md";
import Button from "@/components/ui/Button";

const CheckoutMessage = ({ onFinish }) => {
  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black/80 transition-all duration-200">
      <div className="relative bg-white rounded w-[90%] max-w-120 py-8 px-2 flex flex-col items-center text-center">
        
        <header className="flex items-center gap-4 text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
          <MdCelebration className="w-18 h-12 p-2 bg-rose-100 text-rose-600 rounded" />
          <h1 className="text-gray-800">Order Accepted</h1>
        </header>
        
        <h2 className="text-lg leading-5 font-serif tracking-wider mb-8">
          Your order has been successfully placed and sent straight to the
          kitchen.
        </h2>
        
        <p className="text-sm mb-4">
          Our chefs are already preparing your meal with care, and it will be
          ready for pickup or delivery very soon!
        </p>

        <Button color={"light-red"} onClick={onFinish}>
            Finish
        </Button>
      </div>
    </section>
  );
};

export default CheckoutMessage;