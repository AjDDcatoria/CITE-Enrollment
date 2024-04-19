import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Button from "./Button";
import tempProfile from "../../assets/defaultProfile1.jpg";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "@/redux/action/authAction";
import { useNavigate } from "react-router-dom";

const sideBarVariant = (variant) => {
  const variants = {
    slide_left: "fixed",
  };
  return variants[variant] || "";
};

function SideBar({ children, currentUser, variant, className, sideBarOpen }) {
  const [isOpen, setOpen] = useState(false);
  const [sidebar, setSideBar] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const mutate = useMutation({
    mutationFn: () => dispatch(LogoutAction(navigate)),
  });

  const logoutError = useSelector((state) => state.auth?.logoutError);
  const logoutSuccess = useSelector((state) => state.auth?.logoutSuccess);
  useEffect(() => {
    if (logoutError) {
      console.log(logoutError.message);
    }
    if (logoutSuccess) {
      console.log("Logout Successful");
    }
  }, [logoutError]);

  const handleLogout = () => {
    mutate.mutateAsync();
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
              img={currentUser.profile ? currentUser.profile : tempProfile}
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
            onClick={handleLogout}
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
