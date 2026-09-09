import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { mainSlice } from "@/app/providers/redux/reducer";
import store from "@/app/providers/redux/store";
import { ICoffeeProduct, IFeatureFlags } from "@/types/configCat";

const createSetter = <T>(action: ActionCreatorWithPayload<T>) => {
  return (value: T) => store.dispatch(action(value));
};

export const setFlags = createSetter<Partial<IFeatureFlags>>(
  mainSlice.actions.setFlags,
);
export const setLoader = createSetter<boolean>(mainSlice.actions.setLoader);
export const setCategoryTitle = createSetter<string>(
  mainSlice.actions.setCategoryTitle,
);
export const setShowCart = createSetter<boolean>(mainSlice.actions.setShowCart);
export const setShowToast = createSetter<boolean>(
  mainSlice.actions.setShowToast,
);
export const setToastMessage = createSetter<string>(
  mainSlice.actions.setToastMessage,
);
export const setCart = createSetter<ICoffeeProduct[]>(
  mainSlice.actions.setCart,
);
