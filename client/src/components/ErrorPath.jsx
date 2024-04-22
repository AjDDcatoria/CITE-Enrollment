import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext } from "react";

function ErrorPath() {
  const { sideBarInfo } = useContext(SideBarContext);

  return (
    <section className={`content-section overflow-y-auto gap-5 ${sideBarInfo}`}>
      <div className="text-5xl text-slate-400 mt-36 w-72">ERROR PAGE</div>
    </section>
  );
}

export default ErrorPath;
