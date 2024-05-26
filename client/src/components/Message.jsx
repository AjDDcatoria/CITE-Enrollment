import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext, useEffect, useState } from "react";
import "../assets/message.scss";
import tempProfile from "../assets/defaultProfile1.jpg";
import Avatar from "./ui/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { GET_ROOM } from "@/redux/action/roomActions";
import Chat from "./Chat";

function Message() {
  const { sideBarInfo } = useContext(SideBarContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [groupChat, setGroupChat] = useState([]);
  const roomData = useSelector((state) => state.room?.roomsData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roomData) {
      setGroupChat(roomData);
    } else {
      dispatch(GET_ROOM());
    }
  }, [roomData]);

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <>
      <section
        className={`content-section ${sideBarInfo} flex items-center pr-3`}
      >
        <div className="message-container h-full flex justify-between w-full gap-4 pt-2">
          <div className="message w-full rounded overflow-hidden bg-white">
            <div className="h-16 w-full bg-slate-950 flex items-center justify-center">
              <span className="text-3xl text-slate-50">Message</span>
            </div>
            {selectedChat && <Chat props={selectedChat} />}
          </div>
          <div className="right-bar w-full rounded overflow-hidden bg-white">
            <div className="h-16 w-full bg-slate-950 flex items-center justify-center">
              <span className="text-3xl text-slate-50">Group chat's</span>
            </div>
            <div>
              <ul className="pl-1 pr-1 flex flex-col gap-1 pt-2">
                {groupChat &&
                  groupChat.map((chat, index) => {
                    return (
                      <li
                        key={index}
                        className="flex justify-between h-14 rounded items-center p-2"
                        onClick={() => {
                          selectChat(chat);
                        }}
                      >
                        <div className="flex gap-5 items-center">
                          <Avatar
                            img={chat.instructorProfile || tempProfile}
                            variant={"small"}
                            className={"rounded-full"}
                          />
                          <div className="text-sm">{chat.roomName}</div>
                        </div>
                        <div className=" flex gap-1 items-center rounded-full icon">
                          <span> &#x2022;</span>
                          <span> &#x2022;</span>
                          <span> &#x2022;</span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Message;
