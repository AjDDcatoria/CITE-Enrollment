import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext } from "react";
function AddSubjects() {
  const { sideBarInfo } = useContext(SideBarContext);

  return (
    <>
      <section className={`content-section ${sideBarInfo}`}>
        Add Subjects
      </section>
    </>
  );
}

export default AddSubjects;
