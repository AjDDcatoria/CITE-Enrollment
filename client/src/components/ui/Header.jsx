import React from "react";

const headerVariant = (variant) => {
  const variants = {
    space_between: "flex justify-between items-center",
  };
  return variants[variant] || "";
};

function Header({ className, variant, children }) {
  return (
    <div
      className={`${headerVariant(
        variant
      )} ${className} bg-gray-950 text-slate-200 h-14  fixed w-full pl-4 pr-4`}
    >
      {children}
    </div>
  );
}

export default Header;
