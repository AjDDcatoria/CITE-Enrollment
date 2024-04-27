import { SideBarContext } from "@/context/sideBarContext";
import React, { useContext, useEffect, useState } from "react";
import Table, {
  CreateTableHeaders,
  TableBody,
  TableData,
  TableRow,
} from "./ui/Table";
import Button from "./ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  ACCEPT_ENROLL,
  DECLINE_ENROLL,
  GET_ENROLLEE,
} from "@/redux/action/roomActions";
import * as types from "../redux/constants/roomConstans";
import { useMutation } from "@tanstack/react-query";

function Enrollees() {
  const tableHeaders = ["No", "Name", "ID", "Block", "Year", "Room", "Action"];
  const { sideBarInfo } = useContext(SideBarContext);
  const [enrollees, setEnrollees] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth?.userData);
  const students = useSelector((state) => state.room?.enrollee);
  const formData = new FormData();
  const userData = useSelector((state) => state.auth?.userData);
  formData.append("role", userData.role);
  const requestSuccess = useSelector((state) => state.room?.successMessage);
  const requestError = useSelector((state) => state.room?.errorMessage);

  const acceptMustate = useMutation({
    mutationFn: async (formData) => dispatch(ACCEPT_ENROLL(formData)),
    onMutate: () => {
      console.log("Loading");
    },
  });

  const declineMutate = useMutation({
    mutationFn: async (formData) => dispatch(DECLINE_ENROLL(formData)),
    onMutate: () => {
      console.log("Loading");
    },
  });

  useEffect(() => {
    dispatch(GET_ENROLLEE(currentUser.role));
  }, [dispatch]);

  useEffect(() => {
    if (students) {
      setEnrollees(students);
    }
  }, [students]);

  useEffect(() => {
    if (requestSuccess) {
      console.log(requestSuccess);
    }
    if (requestError) {
      console.log(requestError);
    }
    dispatch({
      type: types.RESET_MESSAGE,
      payload: null,
    });
  }, [requestSuccess, requestError]);

  const handleDecline = async (data) => {
    formData.append("id", data.id);
    formData.append("roomID", data.roomID);
    await declineMutate.mutateAsync(formData);
    formData.delete("id");
    formData.delete("roomID");
    dispatch(GET_ENROLLEE(currentUser.role));
  };

  const handleAccept = async (data) => {
    formData.append("id", data.id);
    formData.append("roomID", data.roomID);
    await acceptMustate.mutateAsync(formData);
    formData.delete("id");
    formData.delete("roomID");
    dispatch(GET_ENROLLEE(currentUser.role));
  };

  return (
    <>
      <section className={`content-section items-center ${sideBarInfo}`}>
        <div className="pt-5 pb-4 w-full flex justify-center overflow-y-auto">
          {enrollees === null ? (
            <div className="text-5xl text-slate-400 no-result mt-56">
              No Results
            </div>
          ) : (
            <Table className={"rounded-md mt-10 overflow-hidden bg-white"}>
              <CreateTableHeaders values={tableHeaders} />
              <TableBody>
                {enrollees &&
                  enrollees.map((student, index) => {
                    return (
                      <TableRow key={index}>
                        <TableData>{index + 1}</TableData>
                        <TableData>{student.student}</TableData>
                        <TableData>{student.id}</TableData>
                        <TableData>{student.block}</TableData>
                        <TableData>{student.year}</TableData>
                        <TableData>{student.room}</TableData>
                        <TableData
                          className={"flex justify-center items-center gap-2"}
                        >
                          <Button
                            variant={"submit"}
                            text={"Accept"}
                            onClick={() => {
                              handleAccept(student);
                            }}
                          ></Button>
                          <Button
                            variant={"cancel"}
                            text={"Decline"}
                            onClick={() => {
                              handleDecline(student);
                            }}
                          ></Button>
                        </TableData>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </div>
      </section>
    </>
  );
}

export default Enrollees;
