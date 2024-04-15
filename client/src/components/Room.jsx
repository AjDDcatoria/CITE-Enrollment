import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext } from "react";

function Room() {
  const { sideBarInfo } = useContext(SideBarContext);

  return (
    <>
      <section className={`content-section ${sideBarInfo}`}>room</section>
    </>
  );
}

export default Room;
