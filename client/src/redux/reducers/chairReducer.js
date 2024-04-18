import * as types from "../constants/chairConstants";

const initialState = {
  req_accounts: null,
  successMessage: null,
  errorMessage: null,
  serverMessage: null,
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
        errorMessage: payload ? payload.message : null,
      };
    }

    case types.RESET_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: null,
      };
    }

    case types.SERVER_ERROR: {
      return {
        ...state,
        serverMessage: payload ? payload.message : null,
      };
    }

    case types.RESET_SERVER_MESSAGE: {
      return {
        ...state,
        serverMessage: null,
      };
    }

    case types.SUCCESS_MESSAGE: {
      return {
        ...state,
        successMessage: payload ? payload.message : null,
      };
    }

    case types.RESET_SUCCESS_MESSAGE: {
      return {
        ...state,
        successMessage: null,
      };
    }

    default:
      return state;
  }
};

export default chairReducer;
