import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext } from "react";

function ErrorPath() {
  const { sideBarInfo } = useContext(SideBarContext);

  return (
    <section className={`content-section overflow-y-auto gap-5 ${sideBarInfo}`}>
      Something Wrong
    </section>
  );
}

export default ErrorPath;
