import { createSlice } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./cartSlice";

const initialState = {
  user: {},
  token: "",
};

const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = {};
      state.token = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
