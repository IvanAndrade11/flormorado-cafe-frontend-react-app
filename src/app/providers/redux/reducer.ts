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
    restartFlow: () => ({ ...initialState }),
  },
});

export default mainSlice.reducer;
