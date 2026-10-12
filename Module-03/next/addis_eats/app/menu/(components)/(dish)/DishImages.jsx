const DishImages = ({ selectedDish }) => {

  return (
    <section className="mb-8 w-86 lg:w-full mx-auto">
      {/* Big image */}
      <img
        src={`${selectedDish?.imagePath}/image-main.webp`}
        alt=""
        className="rounded"
      />

      {/* Small images */}
      <div className="flex items-center gap-4 mt-2 flex-nowrap overflow-x-auto scrollbar-thin">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <img
            key={n}
            src={`${selectedDish?.imagePath}/image-${n}.webp`}
            alt=""
            className="rounded shrink-0 w-30"
          />
        ))}
      </div>
    </section>
  );
};

export default DishImages;