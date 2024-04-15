import React from "react";
const avatarVariant = (variant) => {
  const variants = {
    large: "h-20 w-20",
    medium: "h-12 w-12",
    small: "h-9 w-9",
  };
  return variants[variant] || "";
};

function Avatar({ img, variant, className }) {
  return (
    <img
      src={img}
      className={`${avatarVariant(
        variant
      )} ${className}  cursor-pointer object-cover`}
    />
  );
}

export default Avatar;
