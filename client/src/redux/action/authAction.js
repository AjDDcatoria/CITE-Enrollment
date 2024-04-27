import * as API from "../api/authApi";
import * as types from "../constants/authConstants";
import { SET_ROOM } from "./roomActions";

export const initializeAuth = () => async (dispatch) => {
  const accessToken = JSON.parse(localStorage.getItem("profile"))?.accessToken;
  const roomInfo = JSON.parse(localStorage.getItem("roomInfo"))?.roomInfo;
  if (accessToken) {
    dispatch(setUserData(JSON.parse(localStorage.getItem("profile")).user));
    if (roomInfo) {
      dispatch(SET_ROOM(JSON.parse(localStorage.getItem("roomInfo")).roomInfo));
    }
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
      type: types.LOG_IN_FAIL,
      payload: error,
    });
    navigate("/");
  }
};

export const LogoutAction = (navigate) => async (dispatch) => {
  try {
    const response = await API.logout();
    const { data } = response;

    dispatch({
      type: types.LOGOUT,
      payload: data,
    });
    navigate("/");
    window.location.reload();

    localStorage.removeItem("profile");
    localStorage.removeItem("roomInfo");
  } catch (error) {
    dispatch({
      type: types.ERROR_MESSAGE,
      payload: types.ERROR_MESSAGE,
    });
  }
};

export const Request_Acc_Action = (formData) => async (dispatch) => {
  try {
    const response = await API.req_account(formData);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.REQ_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: types.REQ_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {}
};
