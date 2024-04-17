import * as API from "../api/chairApi";
import * as types from "../constants/chair";

export const GETRequestAction = () => async (dispatch) => {
  try {
    const response = await API.getRequest();
    const { error, data } = response;
    if (error) {
      dispatch({
        type: types.REQ_ERROR,
        payload: error,
      });
    } else {
      dispatch({
        type: types.SET_ACCOUNT,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
