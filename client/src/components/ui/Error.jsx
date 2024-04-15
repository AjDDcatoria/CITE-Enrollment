const errorVariant = (variant) => {
  const variants = {
    error_text: "text-red-600 font-medium",
    error_card:
      "error_card text-left p-2 rounded-sm bg-red-500 text-medium text-red-900",
  };
  return variants[variant] || "";
};

const Error = ({ className, variant, message }) => {
  return (
    <>
      <span
        className={`font-semibold bg-transparent ${errorVariant(
          variant
        )} ${className}`}
      >
        {message}
      </span>
    </>
  );
};

export default Error;
