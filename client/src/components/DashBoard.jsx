import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext } from "react";

function DashBoard() {
  const { sideBarInfo } = useContext(SideBarContext);

  return (
    <>
      <section className={`content-section ${sideBarInfo}`}></section>
    </>
  );
}

export default DashBoard;
