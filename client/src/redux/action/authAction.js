import * as API from "../api/authApi";
import * as types from "../constants/authConstants";

export const initializeAuth = () => async (dispatch) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;

  if (accessToken) {
    dispatch(setUserData(JSON.parse(localStorage.getItem("profile")).user));
  }
};

export const setUserData = (userData) => async (dispatch) => {
  dispatch({ type: types.SET_USER_DATA, payload: userData });
};

export const LoginAction = (formData, navigate) => async (dispatch) => {
  try {
    const response = await API.login(formData);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.LOG_IN_FAIL,
        payload: error,
      });
    } else {
      const { accessToken, user } = data;
      const profile = {
        accessToken,
        user,
      };
      localStorage.setItem("profile", JSON.stringify(profile));
      dispatch({
        type: types.LOG_IN_SUCCESS,
        payload: profile,
      });
      navigate(`/${user.role}/${user.id}`);
    }
  } catch (error) {
    await dispatch({
      type: types.SIGN_IN_FAIL,
      payload: types.ERROR_MESSAGE,
    });
    navigate("/");
  }
};
