import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cartItem", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      console.log("remove item called");
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { setCart, removeFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
