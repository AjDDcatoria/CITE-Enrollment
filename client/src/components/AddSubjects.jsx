import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext, useState } from "react";
import backgroundTemp from "@/assets/CET.jpg";
import SearchBar from "./ui/SearchBar";
import Avatar from "./ui/Avatar";
import Button from "./ui/Button";
import Card from "./ui/Cards";

function AddSubjects() {
  const { sideBarInfo } = useContext(SideBarContext);
  return (
    <>
      <section className={`content-section ${sideBarInfo}`}>
        Add Subject
      </section>
    </>
  );
}

export default AddSubjects;
