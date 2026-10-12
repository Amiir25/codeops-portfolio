const Spinner = () => {

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-white z-30 text-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="border border-blue-700 border-t-transparent w-8 h-8 rounded-full animate-spin"></div>
        <p>Loading...</p>
      </div>
    </section>
  );
};

export default Spinner;