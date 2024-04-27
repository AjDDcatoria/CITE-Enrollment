import React from "react";
import Avatar from "./ui/Avatar";
import tempProfile from "@/assets/defaultProfile1.jpg";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "../assets/chat.scss";

function Chat({ props }) {
  return (
    <>
      <div id="chat" className="pr-3 pl-3 flex flex-col">
        <div className="border-b-2">
          <div className="flex items-center p-2 justify-between">
            <div className="flex items-center gap-5">
              <Avatar
                img={props?.instructorProfile ?? tempProfile}
                variant={"medium"}
                className={"rounded-full"}
              />
              <span>{props?.roomName}</span>
            </div>
            <div className="flex gap-6">
              <BsFillTelephoneFill className="" />
              <FaVideo />
              <FiMenu />
            </div>
          </div>
        </div>
        <div className="message-container flex items-center justify-center">
          <span className="text-5xl text-slate-300">N/A</span>
        </div>
        <div className="text-container p-1 border-t-2 flex gap-4 items-center">
          <div className="flex h-full items-center gap-2">
            <i className="fi fi-sr-square-plus"></i>
            <i className="fi fi-sr-picture"></i>
            <i className="fi fi-sr-file-pdf"></i>
            <i className="fi fi-sr-gif"></i>
          </div>
          <input
            type="text"
            placeholder="Aa"
            className="bg-slate-300 rounded pl-2 pr-2"
          />
          <i className="fi fi-sr-paper-plane-top text-slate-950"></i>
        </div>
      </div>
    </>
  );
}

export default Chat;
