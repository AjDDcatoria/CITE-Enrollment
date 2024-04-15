import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext } from "react";

function Settings() {
  const { sideBarInfo } = useContext(SideBarContext);

  return (
    <>
      <section className={`content-section ${sideBarInfo}`}>Settings</section>
    </>
  );
}

export default Settings;
