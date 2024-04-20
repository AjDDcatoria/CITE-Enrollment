"use client";

import React, { useContext, useEffect, useState } from "react";
import Header from "@/components/ui/Header";
import SideBar from "@/components/ui/SideBar";
import { Outlet } from "react-router-dom";
import Avatar from "@/components/ui/Avatar";
import tempProfile from "@/assets/defaultProfile1.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Navigation, { NavList } from "@/components/ui/Navigation";
import { SideBarContext } from "@/context/sideBarContext";
import NavigationUSER from "@/utils/User";
import { useDispatch, useSelector } from "react-redux";
import Modal, { ModalHeader } from "@/components/ui/Modal";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { CREAT_ROOM, GET_ROOM } from "@/redux/action/roomActions";
import * as types from "../redux/constants/roomConstans";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function UserPanel() {
  const [isInstructor, setIsInstructor] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSideBarInfo } = useContext(SideBarContext);
  const userData = useSelector((state) => state.auth?.userData);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (userData.role == "chair" || userData.role == "instructor") {
      setIsInstructor(true);
    }
  }, [userData]);

  const navUser = NavigationUSER(userData?.role ? userData : null);
  const isSideBarOpen = (sidebarInfo) => {
    setSideBarInfo(sidebarInfo);
  };

  return (
    <>
      <Header variant={"space_between"} className={"top-0 "}>
        <span className="appTitle bg-transparent text-slate-100 text-2xl">
          {userData?.department}
        </span>
        <div className="bg-transparent flex gap-3">
          {isInstructor && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={openModal}
                    className="bg-transparent text-slate"
                  >
                    <i className="fi fi-sr-plus text-lg hover:bg-slate-600 pt-3 pl-3 pr-3 pb-2 rounded-full" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className={"mt-2 bg-white"}>
                  <p>Create Room</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar
                  img={userData.profile ? userData.profile : tempProfile}
                  variant={"small"}
                  className={"rounded-full"}
                />
              </TooltipTrigger>
              <TooltipContent className={"mt-2 bg-white"}>
                <p>Account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Header>
      <div>
        <SideBar
          sideBarOpen={isSideBarOpen}
          currentUser={userData}
          variant={"slide_left"}
          className={"bg-gray-950 w-72"}
        >
          <Navigation variant={"column"}>
            {navUser &&
              navUser.map((nav, index) => {
                return (
                  <NavList
                    key={index}
                    to={nav.to}
                    text={nav.text}
                    icon={nav.icon}
                  />
                );
              })}
          </Navigation>
        </SideBar>
        <Outlet />
        {isModalOpen && <CreateRoomModal closeModal={closeModal} />}
      </div>
    </>
  );
}

function CreateRoomModal({ closeModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const formData = new FormData();

  const createRoomMutate = useMutation({
    mutationFn: async (formData) => dispatch(CREAT_ROOM(formData)),
    onMutate: () => {
      console.log("Loading");
    },
  });

  const createRoomError = useSelector((state) => state.room?.errorMessage);
  const createRoomSuccess = useSelector((state) => state.room?.successMessage);

  useEffect(() => {
    if (createRoomError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: createRoomError,
      });
      dispatch({
        type: types.RESET_MESSAGE,
        payload: null,
      });
    }
    if (createRoomSuccess) {
      dispatch(GET_ROOM());
      dispatch({
        type: types.RESET_MESSAGE,
        payload: null,
      });
      closeModal();
    }
  });

  const onSubmit = async (roomData) => {
    formData.append("roomName", roomData.roomName);
    formData.append("block", roomData.block);
    formData.append("year", roomData.year);
    formData.append("schedStart", roomData.schedStart);
    formData.append("schedEnd", roomData.schedEnd);
    formData.append("role", userData.role);
    await createRoomMutate.mutateAsync(formData);
    formData.delete("roomName");
    formData.delete("block");
    formData.delete("year");
    formData.delete("schedStart");
    formData.delete("schedEnd");
    formData.delete("role");
  };
  return (
    <>
      <Toaster />
      <Modal closeModal={closeModal}>
        <ModalHeader>
          <span className="text-slate-100 text-2xl">Create Room</span>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 flex flex-col">
          <span className="text-lg">Subject</span>
          <select
            {...register("roomName", {
              required: "Enter Request",
            })}
            className="block text_input pr-16"
          >
            <option value={"Algorithms and Complexity"}>
              Algorithms and Complexity
            </option>
            <option value={"Discrete Structure 2"}>Discrete Structure 2</option>
            <option value={"Livin in the IT Era"}>Livin in the IT Era</option>
            <option value={"Fundaments of Programming C++"}>
              Fundaments of Programming C++
            </option>
            <option value={"Data Structure and Algorithms"}>
              Data Structure and Algorithms
            </option>
            <option value={"Object-Oriented Programming-VB.net"}>
              Object-Oriented Programming-VB.net
            </option>
            <option value={"Information Management"}>
              Information Management
            </option>
            <option value={"Introduction to Computing"}>
              Introduction to Computing
            </option>
            <option value={"Intermediate Programming - Java Prog"}>
              Intermediate Programming - Java Prog
            </option>
          </select>
          <div className="flex justify-between">
            <div>
              <span className="text-lg">Block</span>
              <select
                {...register("block", {
                  required: "Enter Request",
                })}
                className="block text_input pr-16 w-48"
              >
                <option value={"A"}>A</option>
                <option value={"B"}>B</option>
                <option value={"C"}>C</option>
                <option value={"D"}>D</option>
              </select>
            </div>
            <div>
              <span className="text-lg">Year</span>
              <select
                {...register("year", {
                  required: "Enter Request",
                })}
                className="block text_input pr-16 w-48"
              >
                <option value={"1"}>1</option>
                <option value={"2"}>2</option>
                <option value={"3"}>3</option>
                <option value={"4"}>4</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <span className="text-lg">Start at</span>
              <select
                {...register("schedStart", {
                  required: "Enter Request",
                })}
                className="block text_input pr-16 w-48"
              >
                <option value={"07:00:00"}>7:00 AM</option>
                <option value={"07:30:00"}>7:30 AM</option>
                <option value={"09:00:00"}>9:00 AM</option>
                <option value={"09:30:00"}>9:30 AM</option>
                <option value={"10:0:00"}>10:00 AM</option>
                <option value={"10:30:00"}>10:30 AM</option>
                <option value={"11:00:00"}>11:00 AM</option>
                <option value={"11:30:00"}>11:30 AM</option>
                <option value={"12:00:00"}>12:00 PM</option>
                <option value={"01:00:00"}>1:00 PM</option>
                <option value={"01:30:00"}>1:30 PM</option>
                <option value={"02:30:00"}>2:30 PM</option>
                <option value={"03:00:00"}>3:00 PM</option>
                <option value={"03:30:00"}>3:30 PM</option>
                <option value={"04:00:00"}>4:00 PM</option>
                <option value={"04:30:00"}>4:30 PM</option>
                <option value={"05:00:00"}>5:00 PM</option>
                <option value={"05:30:00"}>5:30 PM</option>
                <option value={"06:00:00"}>6:00 PM</option>
                <option value={"06:30:00"}>6:30 PM</option>
                <option value={"07:00:00"}>7:00 PM</option>
              </select>
            </div>
            <div>
              <span className="text-lg">End At</span>
              <select
                {...register("schedEnd", {
                  required: "Enter Request",
                })}
                className="block text_input pr-16 w-48"
              >
                <option value={"07:00:00"}>7:00 AM</option>
                <option value={"07:30:00"}>7:30 AM</option>
                <option value={"09:00:00"}>9:00 AM</option>
                <option value={"09:30:00"}>9:30 AM</option>
                <option value={"10:0:00"}>10:00 AM</option>
                <option value={"10:30:00"}>10:30 AM</option>
                <option value={"11:00:00"}>11:00 AM</option>
                <option value={"11:30:00"}>11:30 AM</option>
                <option value={"12:00:00"}>12:00 PM</option>
                <option value={"01:00:00"}>1:00 PM</option>
                <option value={"01:30:00"}>1:30 PM</option>
                <option value={"02:30:00"}>2:30 PM</option>
                <option value={"03:00:00"}>3:00 PM</option>
                <option value={"03:30:00"}>3:30 PM</option>
                <option value={"04:00:00"}>4:00 PM</option>
                <option value={"04:30:00"}>4:30 PM</option>
                <option value={"05:00:00"}>5:00 PM</option>
                <option value={"05:30:00"}>5:30 PM</option>
                <option value={"06:00:00"}>6:00 PM</option>
                <option value={"06:30:00"}>6:30 PM</option>
                <option value={"07:00:00"}>7:00 PM</option>
              </select>
            </div>
          </div>
          <div className="flex mt-8 gap-4">
            <Button text={"Create"} variant={"submit"} type={"submit"} />
            <Button text={"Cancel"} variant={"cancel"} onClick={closeModal} />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default UserPanel;
