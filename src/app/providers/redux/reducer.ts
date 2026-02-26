import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "@/utils/constants";

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.toast = { ...action.payload };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
    setLoader: (state, action) => {
      state.loader = { ...action.payload };
    },
    increaseLoader: (state, action) => {
      state.loader.progress = action.payload;
    },
    setLoaderText: (state, action) => {
      state.loader.text = action.payload;
    },
    setLoaderSubText: (state, action) => {
      state.loader.transparentText = action.payload;
    },
    showLoader: (state) => {
      state.loader.show = true;
    },
    hideLoader: (state) => {
      state.loader.show = false;
      state.loader.progress = 10;
    },
    restartFlow: () => ({ ...initialState }),
  },
});

export default mainSlice.reducer;
