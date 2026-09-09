import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "@/utils/constants";
import { IFeatureFlags } from "@/types/configCat";

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setFlags: (state, action: PayloadAction<Partial<IFeatureFlags>>) => {
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
    setShowToast: (state, action) => {
      state.session.toast.show = action.payload;
    },
    setToastMessage: (state, action) => {
      state.session.toast.message = action.payload;
    },
    setCart: (state, action) => {
      state.session.cart = action.payload;
    },
    restartFlow: () => ({ ...initialState }),
  },
});

export default mainSlice.reducer;
