import { axiosInstance as api } from "./axiosInstance";

export const login = async (formData) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await api.post("/api/auth/login", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    return { error: null, data: response.data };
  } catch (error) {
    return {
      error: error.response.data,
      data: null,
    };
  }
};

export const req_account = async (formData) => {
  try {
    const response = await api.post("/api/request/account", {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
      userID: formData.get("user_id"),
      department: formData.get("department"),
      role: formData.get("request"),
    });
    return { error: null, data: response.data };
  } catch (error) {
    return {
      error: error.response.data,
      data: null,
    };
  }
};
