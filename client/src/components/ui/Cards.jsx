const cardVariant = (variant) => {
  const variants = { box1: "box1", box2: "box2", box3: "box3" };
  return variants[variant] || "";
};

const Card = ({ children, className, variant }) => {
  return (
    <div className={`${cardVariant(variant)} ${className}`}>{children}</div>
  );
};

export default Card;
