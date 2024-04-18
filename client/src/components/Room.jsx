import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "./ui/SearchBar";
import Card from "./ui/Cards";
import Button from "./ui/Button";
import Avatar from "./ui/Avatar";
import backgroundTemp from "@/assets/CET.jpg";
import tempProfile from "@/assets/tempProfile2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { GET_ROOM } from "@/redux/action/roomActions";
import { useNavigate } from "react-router-dom";

function Room() {
  const { sideBarInfo } = useContext(SideBarContext);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const getRoomSuccess = useSelector((state) => state.room?.roomsData);

  useEffect(() => {
    dispatch(GET_ROOM());
  }, [dispatch]);

  useEffect(() => {
    if (getRoomSuccess) {
      setRooms(getRoomSuccess);
    }
  }, [getRoomSuccess]);

  const filteredSubjects = rooms.filter((rooms) =>
    rooms.roomName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section
        className={`content-section overflow-y-auto gap-5 ${sideBarInfo}`}
      >
        <SearchBar
          placeholder={"Search Subject..."}
          variant={"square"}
          onChange={handleChange}
          color={"dark"}
          btnText={"Subject+"}
          position={"mt-5 p-1 relative"}
          icon={
            <i className="bx bx-search search-bar-icon absolute text-3xl text-slate-200 left-5"></i>
          }
          className={
            "outline-none h-9 bg-slate-700 searchBar-width1 text-slate-100 rounded-md"
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
                      src={room.background ? room.background : backgroundTemp}
                      className="object-cover h-32 w-full"
                    />
                  </div>
                  <Avatar
                    img={room.profile ? room.profile : tempProfile}
                    variant={"large"}
                    className={"rounded-full absolute subject-profile"}
                  />
                </div>
                <div className="content bg-transparent text-center mt-10 ">
                  <span className="username text-slate-700 bg-transparent text-lg hover:underline">
                    {room.firstname + " " + room.lastname}
                  </span>
                  <br />
                  <span className="subjectname text-sm  text-slate-700 bg-transparent ">
                    {room.roomName + `(${room.block})`}
                  </span>
                  <br />
                  <span className="schedule text-slate-700 text-sm bg-transparent">
                    {room.schedStart + " to  " + room.schedEnd}
                  </span>
                  <br />
                </div>
                <Button text={"Room"} variant={"enroll"} className={"mt-5"} />
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

export default Room;
