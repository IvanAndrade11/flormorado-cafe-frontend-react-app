import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "@/utils/constants";

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setFlags: (state, action) => {
      state.flags = { ...action.payload };
    },
    setLoader: (state, action) => {
      state.session.loader = action.payload;
    },
    setCategoryTitle: (state, action) => {
      state.session.categoryTitle = action.payload;
    },
    setShowCart: (state, action) => {
      state.session.showCart = action.payload;
    },
    setCart: (state, action) => {
      state.session.cart = action.payload;
    },
    restartFlow: () => ({ ...initialState }),
  },
});

export default mainSlice.reducer;
