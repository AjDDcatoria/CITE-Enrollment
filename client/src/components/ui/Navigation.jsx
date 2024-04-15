import React from "react";
import { Link } from "react-router-dom";

const navigationVariant = (variant) => {
  const variants = {
    row: "flex",
    column: "flex flex-col gap-2",
  };
  return variants[variant] || "";
};

function Navigation({ className, children, variant }) {
  return (
    <nav className={`${className} bg-gray-950 pt-4 `}>
      <ul className={`${navigationVariant(variant)} bg-gray-950  ul-list`}>
        {children}
      </ul>
    </nav>
  );
}

export const NavList = ({ text, icon, className, to }) => {
  return (
    <>
      <Link to={to}>
        <li
          className={`cursor-pointer ${className} bg-slate-800 rounded h-12 flex items-center  pl-3 overflow-hidden `}
        >
          {icon}
          <span className="bg-transparent pl-7 text-slate-200">{text}</span>
        </li>
      </Link>
    </>
  );
};
export default Navigation;
