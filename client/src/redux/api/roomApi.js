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
    return handleApiError(error);
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
    console.info(error);
    return handleApiError(error);
  }
};
