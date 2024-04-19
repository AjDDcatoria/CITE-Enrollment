"user client";

import React, { useContext } from "react";
import Header from "@/components/ui/Header";
import SideBar from "@/components/ui/SideBar";
import { Outlet } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import tempProfile from "@/assets/defaultProfile1.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Navigation, { NavList } from "@/components/ui/Navigation";
import { SideBarContext } from "@/context/sideBarContext";
import NavigationUSER from "@/utils/User";
import { useSelector } from "react-redux";

function UserPanel() {
  const { setSideBarInfo } = useContext(SideBarContext);
  const userData = useSelector((state) => state.auth?.userData);

  const navUser = NavigationUSER(userData?.role ? userData : null);
  const isSideBarOpen = (sidebarInfo) => {
    setSideBarInfo(sidebarInfo);
  };
  return (
    <>
      <Header variant={"space_between"} className={"top-0"}>
        <span className="appTitle bg-transparent text-slate-100 text-2xl">
          {userData?.department}
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Avatar
                img={userData.profile ? userData.profile : tempProfile}
                variant={"small"}
                className={"rounded-full"}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Account</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Header>
      <div>
        <SideBar
          sideBarOpen={isSideBarOpen}
          currentUser={userData}
          variant={"slide_left"}
          className={"bg-gray-950 w-72"}
        >
          <Navigation variant={"column"}>
            {navUser &&
              navUser.map((nav, index) => {
                return (
                  <NavList
                    key={index}
                    to={nav.to}
                    text={nav.text}
                    icon={nav.icon}
                  />
                );
              })}
          </Navigation>
        </SideBar>
        <Outlet />
      </div>
    </>
  );
}

export default UserPanel;
