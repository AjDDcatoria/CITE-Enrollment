import * as types from "../constants/chairConstants";

const initialState = {
  req_accounts: null,
  req_error: null,
  req_error_message: null,
  declineSucessFul: null,
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

    case types.REQUEST_ERROR: {
      return {
        ...state,
        req_error: payload ? payload : null,
      };
    }

    case types.REQUEST_FAIL: {
      return {
        ...state,
        req_error_message: payload ? payload : null,
      };
    }

    case types.DECLINE_SUCCESS: {
      return {
        ...state,
        declineSucessFul: payload ? payload : null,
      };
    }

    default:
      return state;
  }
};

export default chairReducer;
