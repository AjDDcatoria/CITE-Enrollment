import React from "react";

export const TableHeader = ({ children, className }) => {
  return <thead className={`${className || ""}`}>{children}</thead>;
};

export const TableHead = ({ children, className }) => {
  return <th className={` ${className || ""} `}>{children}</th>;
};

export const TableData = ({ children, className, colSpan }) => {
  return (
    <td
      className={`${className || ""} pl-3 h-12 bg-transparent`}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

export const TableRow = ({ children, className }) => {
  return <tr className={`${className || ""} bg-transparent`}>{children}</tr>;
};

export const TableBody = ({ children, className }) => {
  return <tbody className={`${className}`}>{children}</tbody>;
};

export const CreateTableHeaders = ({ values }) => {
  return (
    <>
      <TableHeader className={""}>
        <TableRow className={""}>
          {values &&
            values.map((value, index) => {
              return (
                <TableHead
                  key={index}
                  className={"bg-gray-950 text-slate-100 pl-2 h-10 text-lg"}
                >
                  {value}
                </TableHead>
              );
            })}
        </TableRow>
      </TableHeader>
    </>
  );
};

function Table({ children, className }) {
  return <table className={`${className || ""}`}>{children}</table>;
}

export default Table;
