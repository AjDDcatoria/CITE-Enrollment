import React, { useEffect, useState } from "react";
import HERO from "../assets/classroom.png";
import Card from "../components/ui/Cards";
import { useForm } from "react-hook-form";
import Error from "../components/ui/Error";
import Button from "../components/ui/Button";
import Modal, { ModalHeader } from "../components/ui/Modal";
import { useDispatch, useSelector } from "react-redux";
import { LoginAction, Request_Acc_Action } from "@/redux/action/authAction";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as types from "../redux/constants/authConstants";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";

function AuthPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container-login h-screen flex items-center justify-center">
        <img src={HERO} className="hero" />
        <Login setIsModalOpen={openModal} />
        {isModalOpen && <RegisterModal closeModal={closeModal} />}
        <Toaster />
      </div>
    </>
  );
}

function Login({ setIsModalOpen }) {
  const formData = new FormData();
  const [emailError, setEmailError] = useState(null);
  const [passError, setPassError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutate = useMutation({
    mutationFn: async (formData) => dispatch(LoginAction(formData, navigate)),
  });

  const onSubmit = async (data) => {
    formData.append("email", data.email);
    formData.append("password", data.password);
    await mutate.mutateAsync(formData);
  };
  const loginError = useSelector((state) => state.auth?.loginError);

  useEffect(() => {
    if (loginError) {
      if (loginError.statusCode === 404) {
        setEmailError(loginError.message);
      }
      if (loginError.statusCode === 401) {
        setPassError(loginError.message);
      }

      setTimeout(() => {
        setEmailError(null);
        setPassError(null);
      }, 5000);
    }
  }, [loginError]);

  return (
    <>
      <Card
        className={
          "p-5 pt-8 pb-10 rounded-lg bg-white text-center flex flex-col gap-2"
        }
        variant={"box3"}
      >
        <span className="bg-transparent text-4xl font-bold pb-10">Login</span>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 relative bg-transparent"
        >
          <i className="fi fi-sr-envelope absolute bg-transparent top-3 left-4 text-xl text-slate-900"></i>
          <input
            {...register("email", {
              required: "Input Email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="Email"
            className="text_input w-72 bg-transparent pl-12"
          />
          {errors.email ? (
            <Error
              message={errors.email.message}
              className={"absolute error-aught-email bg-transparent"}
              variant={"error_text"}
            />
          ) : (
            emailError && (
              <Error
                message={emailError}
                className={"absolute error-aught-email bg-transparent"}
                variant={"error_text"}
              />
            )
          )}
          <i
            className="fi fi-sr-lock absolute bg-transparent left-4 text-slate-900"
            style={{ top: "72px", fontSize: "23px" }}
          ></i>
          <input
            {...register("password", {
              required: "Password Required",
            })}
            placeholder="Password"
            type="password"
            className="text_input bg-transparent pl-12"
          />
          {errors.password ? (
            <Error
              message={errors.password.message}
              className={"absolute error-augth-pass bg-transparent"}
              variant={"error_text"}
            />
          ) : (
            <Error
              message={passError}
              className={"absolute error-augth-pass bg-transparent"}
              variant={"error_text"}
            />
          )}
          <Button
            type={"submit"}
            text={"Login"}
            variant={"auth"}
            className={"mt-3 text-lg font-bold"}
          />
          <span
            onClick={setIsModalOpen}
            className="cursor-pointer hover:underline bg-transparent"
          >
            Request Account
          </span>
        </form>
      </Card>
    </>
  );
}

function RegisterModal({ closeModal }) {
  const formData = new FormData();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(null);
  const [idError, setIdError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutate = useMutation({
    mutationFn: async (formData) => dispatch(Request_Acc_Action(formData)),
  });

  const requestError = useSelector((state) => state.auth?.requestError);
  const requestSucess = useSelector((state) => state.auth?.requestSuccess);

  useEffect(() => {
    if (requestError) {
      console.log(requestError);
      if (requestError.statusCode === 401) {
        setEmailError(requestError.message);
      }

      if (requestError.statusCode === 402) {
        setIdError(requestError.message);
      }

      setTimeout(() => {
        setEmailError(null);
        setIdError(null);
      }, 5000);
    }
    if (requestSucess) {
      closeModal(true);
      dispatch({ type: types.SET_NULL_SUCCESS, payload: null });
      toast({
        title: "Request Sent!",
        description:
          "Wait for comfirmation to accept your Request We will sent you an Email to your Password",
      });
    }
  }, [requestError, requestSucess]);

  const onSubmit = (data) => {
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("user_id", data.user_id);
    formData.append("department", data.department);
    formData.append("request", data.request);
    mutate.mutateAsync(formData);
  };
  return (
    <>
      <Modal closeModal={closeModal}>
        <ModalHeader className={"text-2xl"}>Request Account</ModalHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 flex flex-col gap-5"
        >
          <div>
            <span>Fullname</span>
            <div className="flex gap-4 relative">
              <input
                {...register("firstname", {
                  required: "Enter Firstname",
                })}
                placeholder="Firstname"
                type="text"
                className="text_input bg-transparent w-72 pl-4"
              />
              {errors.firstname && (
                <Error
                  variant={"error_text"}
                  message={errors.firstname.message}
                  className={"absolute top-11"}
                />
              )}
              <input
                {...register("lastname", {
                  required: "Enter Lastname",
                })}
                placeholder="Lastname"
                type="text"
                className="text_input bg-transparent w-72 pl-4"
              />
              {errors.lastname && (
                <Error
                  variant={"error_text"}
                  message={errors.lastname.message}
                  className={"absolute top-11 right-44"}
                />
              )}
            </div>
          </div>
          <div className="relative">
            <span>Email Address</span>
            <input
              {...register("email", {
                required: "Enter Email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter Email"
              className="text_input w-45 bg-transparent pl-4 block w-full"
            />
            {errors.email ? (
              <Error
                variant={"error_text"}
                message={errors.email.message}
                className={"absolute top-15 "}
              />
            ) : (
              <Error
                variant={"error_text"}
                message={emailError}
                className={"absolute top-15 "}
              />
            )}
          </div>
          <div className="relative">
            <span>ID : Student/Instructor</span>
            <input
              {...register("user_id", {
                required: "Enter ID",
              })}
              placeholder="ID"
              type="text"
              className="text_input bg-transparent w-45 pl-4 block w-full"
            />
            {errors.user_id ? (
              <Error
                variant={"error_text"}
                message={errors.user_id.message}
                className={"absolute top-15 "}
              />
            ) : (
              <Error
                variant={"error_text"}
                message={idError}
                className={"absolute top-15 "}
              />
            )}
          </div>
          <div className="flex gap-4">
            <div>
              <span>Deparment</span>
              <select
                {...register("department", {
                  required: "Enter Department",
                })}
                className="block text_input"
              >
                <option value={"CITE"}>
                  College of Information Technology Education
                </option>
              </select>
            </div>
            <div>
              <span>Request As</span>
              <select
                {...register("request", {
                  required: "Enter Request",
                })}
                className="block text_input pr-16"
              >
                <option value={"student"}>Student</option>
                <option value={"instructor"}>Instructor</option>
              </select>
            </div>
          </div>
          <Button
            type={"submit"}
            text={"Submit"}
            variant={"auth"}
            className={"mt-3 text-lg font-bold"}
          />
        </form>
      </Modal>
    </>
  );
}

export default AuthPage;
