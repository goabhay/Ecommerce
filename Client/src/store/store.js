import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice.js";
import { cartReducer } from "./cartSlice.js";

const store = configureStore({
  reducer: {
    authUser: authReducer,
    cartReducer,
  },
});

export { store };
