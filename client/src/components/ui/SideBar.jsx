import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import tempProfile from "../../assets/tempProfile.jpg";

const sideBarVariant = (variant) => {
  const variants = {
    slide_left: "fixed",
  };
  return variants[variant] || "";
};

function SideBar({ children, currentUser, variant, className, sideBarOpen }) {
  const [isOpen, setOpen] = useState(false);
  const [sidebar, setSideBar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSideBar("openSidebar");
      sideBarOpen("");
    } else {
      sideBarOpen("openSidebar");
      setSideBar("");
    }
  }, [isOpen]);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`sidebar ${sideBarVariant(
          variant
        )} ${className} ${sidebar} text-slate-200 p-3 flex flex-col h-full`}
      >
        <div className="bg-transparent relative pb-3">
          <div className="bg-transparent flex gap-5">
            <Avatar
              img={currentUser?.profile ? currentUser.profile : tempProfile}
              variant={"medium"}
              className={"rounded-lg"}
            />
            <div className="bg-transparent mt-3 leading-4">
              <span
                className={`${sidebar} bg-transparent text-slate-200 name hover:underline cursor-pointer`}
              >
                {`${currentUser?.firstname} ${currentUser?.lastname}`}
              </span>
              <span
                className={`${sidebar} bg-transparent text-slate-400 block text-sm  name`}
              >
                {currentUser?.role}
              </span>
            </div>
          </div>
          <i
            onClick={handleClick}
            className={`${sidebar} fi fi-sr-angle-small-right text-slate-200  text-2xl cursor-pointer absolute`}
          ></i>
        </div>
        <div className="">
          {children}
          <Button
            text={"Logout"}
            variant={"logout"}
            className={`${sidebar} absolute logout-btn`}
            icon={<i className="bx bx-log-out bx-flip-horizontal"></i>}
          />
        </div>
      </div>
    </>
  );
}

export default SideBar;
