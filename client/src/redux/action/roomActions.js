import * as API from "../api/roomApi";
import * as types from "../constants/roomConstans";

export const SET_ROOM = (roomData) => async (dispatch) => {
  dispatch({
    type: types.ADD_ROOMS,
    payload: roomData,
  });
};

export const GET_ROOM = () => async (dispatch) => {
  try {
    const response = await API.getRoom();
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.REQUEST_ERROR,
        payload: error,
      });
    } else {
      const roomInfo = {
        roomInfo: data,
      };
      localStorage.setItem("roomInfo", JSON.stringify(roomInfo));
      dispatch({
        type: types.ADD_ROOMS,
        payload: data,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const GET_AVAIBLE_ROOMS = async (dispatch) => {
  try {
    const response = await API.getAvaibleRooms();
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.REQUEST_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: types.SET_AVAILABLE_ROOM,
        payload: data,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const SEND_ENROLL = (formData) => async (dispatch) => {
  try {
    const response = await API.sendEnroll(formData);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.REQUEST_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: types.SUCCESS_MESSAGE,
        payload: data,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const CREAT_ROOM = (formData) => async (dispatch) => {
  try {
    const response = await API.creatRoom(formData);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.REQUEST_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: types.SUCCESS_MESSAGE,
        payload: data,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const GET_ENROLLEE = (role) => async (dispatch) => {
  try {
    const response = await API.getEnrollee(role);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.REQUEST_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: types.SET_ENROLLEE,
        payload: data,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const ACCEPT_ENROLL = (formData) => async (dispatch) => {
  try {
    const response = await API.acceptEnroll(formData);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.REQUEST_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: types.SUCCESS_MESSAGE,
        payload: data,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const DECLINE_ENROLL = (formData) => async (dispatch) => {
  try {
    const response = await API.declineEnroll(formData);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.REQUEST_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: types.SUCCESS_MESSAGE,
        payload: data,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const GET_CLASSMEMBERS = (formData) => async (dispatch) => {
  try {
    const response = await API.getClassMembers(formData);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.REQUEST_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: types.SET_MEMBERS,
        payload: data,
      });
    }
  } catch (error) {
    console.error(error);
  }
};
