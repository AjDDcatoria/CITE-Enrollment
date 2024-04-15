const buttonVariant = (variant) => {
  const variants = {
    submit:
      "bg-gray-950 hover:bg-cyan-500 h-9 w-20 flex justify-center items-center rounded",
    enroll:
      "bg-gray-900 rounded-sm h-9 w-28 hover:bg-cyan-600 transition ease-in-out duration-300 active:bg-gray-800 ",
    cancel: "bg-red-700 hover:bg-red-500 h-9 w-20 rounded",
    auth: "bg-gray-950 text-slate-200 h-10 rounded-md hover:bg-gray-900 ease-in-out",
    logout:
      "bg-slate-800 text-xl rounded-md h-12 flex justify-center items-center gap-4",
  };
  return variants[variant] || "";
};

const Button = ({ className, variant, type, text, icon, disable, onClick }) => {
  return (
    <button
      className={`${buttonVariant(variant)} ${className}`}
      type={type}
      disabled={disable}
      onClick={onClick}
    >
      <span className="bg-transparent text-slate-200 font-bold text-1xl">
        {text}
      </span>
      {icon}
    </button>
  );
};

export default Button;
