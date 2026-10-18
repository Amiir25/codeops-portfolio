import { FaArrowLeft, FaHandHoldingHeart } from "react-icons/fa6";
import Button from "@/components/ui/Button";
import { notFound } from "next/navigation";
import DishDetailLeftContent from "../(components)/(dish)/DishDetailLeftContent";
import DishDetailRightContent from "../(components)/(dish)/DishDetailRightContent";
import useFetchDishes from "@/hooks/useFetchDishes";
import CartInfo from "../(components)/CartInfo";

// Pre-build the dishes page
export function generateStaticParams(dishes) {
  return dishes.map((dish) => ({ slug: dish.slug }))
}

const DishDetail = async ({ params }) => {
  const { slug } = await params;
  const { dishes, loading, error } = useFetchDishes();
  const selectedDish = dishes.find((dish) => dish.slug === slug);

  generateStaticParams(dishes);

  if (loading || (dishes.length === 0 && !error)) {
    return (
      <main className="px-2 md:px-8 lg:px-18 mt-18">
        <div className="text-gray-500 mb-20">
          <span>Loading Dish...</span>
          <div className="space-y-2 mt-2">
            <div className="h-6 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-[80%] bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-[90%] bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="px-2 md:px-8 lg:px-18 mt-18">
        <p className="border-t-4 border-red-500 text-red-500 text-center rounded-2xl p-4">
          Unable to load the dish at the moment. Please try again later.
        </p>
      </main>
    );
  }

  if (!selectedDish) notFound();

  return (
    <main className="px-2 md:px-8 lg:px-18 mt-4 lg:mt-10">
      {/* Back arrow */}
      {/* <FaArrowLeft className="mb-8 ml-2 lg:text-lg cursor-pointer" onClick={() => router.back()}/> */}
      
      <section className="grid md:grid-cols-2 md:gap-6 lg:gap-12 mt-4">
        <DishDetailLeftContent selectedDish={selectedDish} />
        <DishDetailRightContent selectedDish={selectedDish} />
      </section>

      {/* Bottom Section */}
      <section className="mt-12">
        <div className="flex flex-col md:flex-row items-center justify-center lg:justify-between gap-4 bg-light-red px-6 py-4 rounded-xl">
          <div className="flex items-center gap-3">
            <FaHandHoldingHeart className="w-12 h-12 bg-light-yellow text-dark-yellow p-2 rounded-lg shrink-0" />
            <div>
              <p className="font-semibold">The Spirit of Gursha</p>
              <p className="text-xs md:text-sm">
                Sharing a bite directly into a companion's mouth is an act of
                deep hospitality and bond. Ask your server for communal Mesob
                presentation.
              </p>
            </div>
          </div>
          <Button color="white">Explore Full Feast Menu</Button>
        </div>
      </section>

      {/* Bottom Cart Info */}
      <CartInfo />
    </main>
  );
};

export default DishDetail;