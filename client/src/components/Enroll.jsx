import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext, useState } from "react";
import SearchBar from "./ui/SearchBar";
import tempProfile from "@/assets/tempProfile2.jpg";
import Card from "./ui/Cards";
import Button from "./ui/Button";
import backgroundTemp from "@/assets/CET.jpg";
import Avatar from "./ui/Avatar";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "./ui/toaster";

function Enroll() {
  const { toast } = useToast();
  const { sideBarInfo } = useContext(SideBarContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjects, setSubjects] = useState([
    {
      subject_name: "Algorithmn and Complexity",
      year: 2,
      schedule: "10:00 am to 11:30 am",
      instructor: "Lea Mae Rebuyon",
      background: backgroundTemp,
      profile: tempProfile,
    },
    {
      subject_name: "Introduction to Computing",
      year: 2,
      schedule: "10:00 am to 11:30 am",
      instructor: "Aj DDcatoria",
      background: backgroundTemp,
      profile: tempProfile,
    },
    {
      subject_name: "Intermediate Programming Java",
      year: 2,
      schedule: "10:00 am to 11:30 am",
      instructor: "Aj DDcatoria",
      background: backgroundTemp,
      profile: tempProfile,
    },
  ]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSubjects = subjects.filter((sub) =>
    sub.subject_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            filteredSubjects.map((sub, index) => (
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
                      src={sub.background}
                      className="object-cover h-32 w-full"
                    />
                  </div>
                  <Avatar
                    img={sub.profile}
                    variant={"large"}
                    className={"rounded-full absolute subject-profile"}
                  />
                </div>
                <div className="content bg-transparent text-center mt-10 ">
                  <span className="username text-slate-700 bg-transparent text-lg hover:underline">
                    {sub.instructor}
                  </span>
                  <br />
                  <span className="subjectname text-sm  text-slate-700 bg-transparent ">
                    {sub.subject_name}
                  </span>
                  <br />
                  <span className="schedule text-slate-700 text-sm bg-transparent">
                    {sub.schedule}
                  </span>
                  <br />
                </div>
                <Button
                  text={"Enroll"}
                  variant={"enroll"}
                  className={"mt-5"}
                  onClick={() => {
                    toast({
                      title: "Submmited Successfull !",
                      description: `Please wait for comfirmation to ${sub.instructor}`,
                    });
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
