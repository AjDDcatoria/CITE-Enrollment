import { axiosInstance as api } from "./axiosInstance";

export const getRequest = async () => {
  api.defaults.withCredentials = true;
  try {
    const response = await api.get("/api/chair/get-request-accounts");
    return {
      error: null,
      data: response.data,
    };
  } catch (error) {
    return {
      error: error.response.data,
      data: null,
    };
  }
};
