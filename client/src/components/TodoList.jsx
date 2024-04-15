import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext } from "react";
function TodoList() {
  const { sideBarInfo } = useContext(SideBarContext);

  return (
    <>
      <section className={`content-section ${sideBarInfo}`}>Todo-list</section>
    </>
  );
}

export default TodoList;
