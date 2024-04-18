import React from "react";

const searchColor = (color) => {
  const colors = {
    dark: "bg-slate-950",
  };
  return colors[color] || "";
};

function SearchBar({
  className,
  icon,
  placeholder,
  color,
  position,
  onChange,
  onClick,
  btnText,
}) {
  return (
    <>
      <div
        className={`${searchColor(
          color
        )} ${position} form-search flex gap-3 p-2 rounded-md`}
      >
        {icon}
        <input
          type="text"
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} pl-2`}
        />
        <button
          onClick={onClick}
          className="text-slate-300 bg-slate-700 pl-4 pr-4 rounded-sm"
        >
          {btnText ? btnText : "Search"}
        </button>
      </div>
    </>
  );
}

export default SearchBar;
