import { axiosInstance as api } from "./axiosInstance";
import { handleApiError } from "./utils";

export const getRoom = async () => {
  api.defaults.withCredentials = true;
  try {
    const response = await api.get("/api/room/get-room");
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      error: error.response.data,
      data: null,
    };
  }
};

export const getAvaibleRooms = async () => {
  api.defaults.withCredentials = true;
  try {
    const response = await api.get("/api/student/get-available-rooms");
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      error: error.response.data,
      data: null,
    };
  }
};

export const sendEnroll = async (formtData) => {
  try {
    const response = await api.post("api/student/send-enroll", {
      roomId: formtData.get("roomId"),
    });
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      error: error.response.data,
      data: null,
    };
  }
};

export const creatRoom = async (formData) => {
  try {
    const response = await api.post(`api/${formData.get("role")}/create-room`, {
      roomName: formData.get("roomName"),
      block: formData.get("block"),
      year: formData.get("year"),
      schedStart: formData.get("schedStart"),
      schedEnd: formData.get("schedEnd"),
    });
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      error: error.response.data,
      data: null,
    };
  }
};

export const getEnrollee = async (role) => {
  try {
    const response = await api.get(`/api/${role}/enrollee`);
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      error: error,
      data: null,
    };
  }
};

export const acceptEnroll = async (formData) => {
  try {
    const response = await api.post(
      `/api/${formData.get("role")}/accept-enroll`,
      {
        roomId: formData.get("roomID"),
        studentID: formData.get("id"),
      }
    );
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      error: error.response.data,
      data: null,
    };
  }
};

export const declineEnroll = async (formData) => {
  try {
    const response = await api.post(
      `/api/${formData.get("role")}/reject-enroll`,
      {
        roomId: formData.get("roomID"),
        studentID: formData.get("id"),
      }
    );
    return {
      data: response.data,
      error: null,
    };
  } catch (error) {
    return {
      error: error.response.data,
      data: null,
    };
  }
};
