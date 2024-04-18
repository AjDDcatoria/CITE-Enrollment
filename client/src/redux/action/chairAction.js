import * as API from "../api/chairApi";
import * as types from "../constants/chairConstants";

export const GETRequestAction = () => async (dispatch) => {
  try {
    const response = await API.getRequest();
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.REQUEST_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: types.SET_ACCOUNT,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: types.SERVER_ERROR,
      payload: types.SERVER_ERRROR_MESSAGE,
    });
  }
};

export const DeclineRequest = (formData) => async (dispatch) => {
  try {
    const response = await API.declineRequest(formData);
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
    dispatch({
      type: types.SERVER_ERROR,
      payload: types.SERVER_ERRROR_MESSAGE,
    });
  }
};

export const AcceptRequest = (formData) => async (dispatch) => {
  try {
    const response = await API.acceptRequest(formData);
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
    dispatch({
      type: types.SERVER_ERROR,
      payload: types.SERVER_ERRROR_MESSAGE,
    });
  }
};
