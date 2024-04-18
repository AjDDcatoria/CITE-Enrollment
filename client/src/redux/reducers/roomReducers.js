import * as types from "../constants/roomConstans";

const initialState = {
  roomsData: null,
  errorMessage: null,
  successMessage: null,
};

const roomReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.REQUEST_ERROR:
      return {
        ...state,
        errorMessage: payload ? payload.message : null,
      };

    case types.ADD_ROOMS: {
      return {
        ...state,
        roomsData: payload ? payload : null,
      };
    }
    default:
      return state;
  }
};

export default roomReducer;
