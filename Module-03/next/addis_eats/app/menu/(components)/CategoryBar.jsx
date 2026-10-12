import Button from "@/components/ui/Button";

// Categories
const categories = [
  { id: 0, text: "All Dishes" },
  { id: 1, text: "Traditional Stews & Wat" },
  { id: 2, text: "Tibs & Grills" },
  { id: 3, text: "Raw & Cured Delicacies / Kitfo" },
  { id: 4, text: "Fasting & Vegan / Tsom" },
  { id: 5, text: "Hot Drinks" },
];

const CategoryBar = ({ selectedCat, onChangeCat }) => {
  return (
    <section className="mt-8 flex flex-wrap gap-2 items-center lg:justify-center">
      {categories.map((cat) => {
        const { id, text } = cat;
        return (
          <div key={id} className="text-sm">
            <Button
              key={id}
              color={selectedCat === text ? "brand" : "light-red"}
              onClick={() => onChangeCat(text)}
            >
              {text}
            </Button>
          </div>
        );
      })}
    </section>
  );
};

export default CategoryBar;