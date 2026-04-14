import { mainSlice } from "@/app/providers/redux/reducer";
import store from "@/app/providers/redux/store";
import { ICoffeeProduct } from "@/types/configCat";

const createSetter = <T>(action: (payload: T) => any) => {
  return (value: T) => store.dispatch(action(value));
};

export const setFlags = createSetter<any>(mainSlice.actions.setFlags);
export const setLoader = createSetter<boolean>(mainSlice.actions.setLoader);
export const setCategoryTitle = createSetter<string>(
  mainSlice.actions.setCategoryTitle,
);
export const setShowCart = createSetter<boolean>(mainSlice.actions.setShowCart);
export const setCart = createSetter<ICoffeeProduct[]>(
  mainSlice.actions.setCart,
);

export default {
  setFlags,
  setLoader,
  setCategoryTitle,
  setShowCart,
};
