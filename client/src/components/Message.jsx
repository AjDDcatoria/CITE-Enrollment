import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext } from "react";

function Message() {
  const { sideBarInfo } = useContext(SideBarContext);

  return (
    <>
      <section className={`content-section ${sideBarInfo}`}>Message</section>
    </>
  );
}

export default Message;
