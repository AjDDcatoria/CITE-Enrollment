import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./ui/SearchBar";
import tempProfile from "@/assets/tempProfile2.jpg";
import Card from "./ui/Cards";
import Button from "./ui/Button";
import backgroundTemp from "@/assets/CET.jpg";
import Avatar from "./ui/Avatar";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useDispatch, useSelector } from "react-redux";
import { GET_AVAIBLE_ROOMS, SEND_ENROLL } from "@/redux/action/roomActions";
import { useMutation } from "@tanstack/react-query";
import * as types from "../redux/constants/roomConstans";

function Enroll() {
  const { toast } = useToast();
  const { sideBarInfo } = useContext(SideBarContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjects, setSubject] = useState([]);
  const dispatch = useDispatch();
  const formData = new FormData();

  useEffect(() => {
    dispatch(GET_AVAIBLE_ROOMS);
  }, [dispatch]);

  const availableRooms = useSelector((state) => state.room?.availableRooms);
  const sendSuccessfull = useSelector((state) => state.room?.successMessage);

  useEffect(() => {
    if (availableRooms) {
      setSubject(
        availableRooms.flatMap(({ firstname, lastname, profile, rooms }) =>
          rooms.map((room) => ({
            id: room.id,
            subject_name: room.roomName,
            block: room.block,
            year: room.year,
            schedule: `${room.schedStart} to ${room.schedEnd}`,
            instructor: `${firstname} ${lastname}`,
            background: backgroundTemp,
            profile: profile || tempProfile,
          }))
        )
      );
    }
  }, [availableRooms]);

  useEffect(() => {
    if (sendSuccessfull) {
      toast({
        title: "Successfull",
        description: `${sendSuccessfull}`,
      });
      dispatch({
        type: types.RESET_MESSAGE,
        payload: null,
      });
    }
  }, [sendSuccessfull]);

  const sendEnrollMustate = useMutation({
    mutationFn: async (formData) => dispatch(SEND_ENROLL(formData)),
  });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSubjects = subjects.filter((room) =>
    room.subject_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = async (data) => {
    formData.append("roomId", data);
    await sendEnrollMustate.mutateAsync(formData);
    formData.delete("id");
  };

  return (
    <>
      <section
        className={`content-section pt-3 overflow-y-auto gap-5 ${sideBarInfo}`}
      >
        <Toaster />
        <SearchBar
          placeholder={"Search Subjects..."}
          color={"dark"}
          onChange={handleChange}
          position={"p-1 relative"}
          icon={
            <i className="bx bx-search search-bar-icon absolute text-3xl text-slate-200 left-5"></i>
          }
          className={
            "outline-none h-9 bg-slate-700 searchBar-width1 text-slate-100 rounded-sm"
          }
        />
        <div className="list-subjects ">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((room, index) => (
              <Card
                key={index}
                variant={"box2"}
                className={
                  "h-80 rounded-lg overflow-hidden flex flex-col items-center bg-white"
                }
              >
                <div className="background relative w-full">
                  <div className="background-container relative">
                    <img
                      src={room.background}
                      className="object-cover h-32 w-full"
                    />
                  </div>
                  <Avatar
                    img={room.profile}
                    variant={"large"}
                    className={"rounded-full absolute subject-profile"}
                  />
                </div>
                <div className="content bg-transparent text-center mt-10 ">
                  <span className="username text-slate-700 bg-transparent text-lg hover:underline">
                    {room.instructor}
                  </span>
                  <br />
                  <span className="subjectname text-sm  text-slate-700 bg-transparent ">
                    {room.subject_name + ` (${room.block})`}
                  </span>
                  <br />
                  <span className="schedule text-slate-700 text-sm bg-transparent">
                    {room.schedule}
                  </span>
                  <br />
                </div>
                <Button
                  text={"Enroll"}
                  variant={"enroll"}
                  className={"mt-5"}
                  onClick={() => {
                    handleEnroll(room.id);
                  }}
                />
              </Card>
            ))
          ) : (
            <div className="text-5xl text-slate-400 mt-36 w-72">
              No Subjects
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Enroll;
