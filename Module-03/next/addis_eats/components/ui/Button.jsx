const Button = ({
  children,
  onClick,
  color,
  primary,
  type,
  disabled
}) => {
  
  // Dynamic button decoration
  let btnDecore = "";
  switch(color) {
    case "white":
      btnDecore = "bg-white text-dark-red ";
      break;
    case "light-red":
      btnDecore = "bg-light-red text-dark-text";
      break;
    case "light-yellow":
      btnDecore = "bg-light-yellow text-light-text";
      break;
    case "brand":
      btnDecore = "bg-brand text-white w-full shadow-xl";
      break;
    case "red":
      btnDecore = "bg-red-600 text-white";
      break;
    default:
      return "Button color not provided"
  }

  return (
    <button
      type={type ? "submit" : "button"}
      disabled={disabled}
      onClick={onClick}
      className={
        `py-[0.3em] px-[1em] rounded-lg lg:hover:opacity-80 active:scale-95
        flex items-center gap-2 justify-center group cursor-pointer
        ${btnDecore} ${primary && 'w-full'} ${disabled && "bg-red-300"}`
      }
    >
      {children}
    </button>
  );
};

export default Button;