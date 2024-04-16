import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth";
import { initializeAuth } from "./action/authAction";

export const storeContainer = async () => {
  try {
    const store = configureStore({
      reducer: { auth },
    });

    await store.dispatch(initializeAuth());
    return store;
  } catch (error) {
    console.error(error);
  }
};
