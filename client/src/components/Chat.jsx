import React, { useState } from "react";
import Avatar from "./ui/Avatar";
import tempProfile from "@/assets/defaultProfile1.jpg";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "../assets/chat.scss";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { GET_CLASSMEMBERS } from "@/redux/action/roomActions";
import Modal, { ModalHeader } from "./ui/Modal";
import defaultPicture from "../assets/defaultProfile1.jpg";

function Chat({ props }) {
  const dispatch = useDispatch();
  const formData = new FormData();
  const [isModalOpen, setIsOpenModal] = useState(false);

  const getClassMembers = useMutation({
    mutationFn: async (formData) => dispatch(GET_CLASSMEMBERS(formData)),
    onMutate: () => {
      console.log("Loading");
    },
  });

  const members = useSelector((state) => state.room?.classMembers);

  const getMembers = async (roomId) => {
    formData.append("roomId", roomId);
    formData.append("role", "chair");
    await getClassMembers.mutateAsync(formData);
    setIsOpenModal(true);
    formData.delete("roomId");
    formData.delete("role");
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

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
              <FiMenu
                onClick={() => {
                  getMembers(props.roomId);
                }}
              />
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
      {isModalOpen && <MemberModal closeModal={closeModal} members={members} />}
    </>
  );
}

function MemberModal({ closeModal, members }) {
  return (
    <>
      <Modal closeModal={closeModal}>
        <ModalHeader className={"text-2xl"}>Members</ModalHeader>
        <ul style={{ width: "400px" }}>
          {members &&
            members.map((person, index) => {
              return (
                <li
                  key={index}
                  className="border pl-2 h-14 text-lg flex gap-3 items-center"
                >
                  <Avatar
                    img={person.profile ?? defaultPicture}
                    variant={"small"}
                    className={"rounded-full"}
                  />
                  <span className="flex gap-2">
                    <span>{person.firstname + " " + person.lastname}</span>
                    <span>
                      {person.role == "chair" || person.role == "instructor"
                        ? " (instructor)"
                        : ""}
                    </span>
                  </span>
                </li>
              );
            })}
        </ul>
      </Modal>
    </>
  );
}

export default Chat;
