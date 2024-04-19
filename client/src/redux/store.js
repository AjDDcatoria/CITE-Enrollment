import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import chairReducer from "./reducers/chairReducer";
import { initializeAuth } from "./action/authAction";
import { thunk } from "redux-thunk";
import roomReducer from "./reducers/roomReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  chair: chairReducer,
  room: roomReducer,
});

export const storeContainer = async () => {
  try {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    store.dispatch(initializeAuth());
    return store;
  } catch (error) {
    console.error(error);
  }
};
