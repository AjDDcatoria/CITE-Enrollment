import * as types from "../constants/chair";

const initialState = {
  req_accounts: null,
  req_error: null,
};

const chairReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.SET_ACCOUNT: {
      return {
        ...state,
        req_accounts: payload ? payload : null,
      };
    }

    case types.REQ_ERROR: {
      return {
        ...state,
        req_error: payload ? payload : null,
      };
    }

    default:
      return state;
  }
};

export default chairReducer;
