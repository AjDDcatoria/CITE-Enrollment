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
    return null;
  } catch (error) {
    dispatch({
      type: types.REQUEST_FAIL,
      payload: types.REQUEST_FAIL_MESSAGE,
    });
  }
};

export const DeclineRequest = (formData) => async (dispatch) => {
  try {
    const response = await API.declineRequest(formData);
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.DECLINE_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: types.DECLINE_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: types.DECLINE_FAIL,
      payload: types.REQUEST_FAIL_MESSAGE,
    });
  }
};
