import axios from "axios";

export const login = async (formData) => {
  axios.defaults.withCredentials = true;
  try {
    const response = await axios.post("http://localhost:3001/api/auth/login", {
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
