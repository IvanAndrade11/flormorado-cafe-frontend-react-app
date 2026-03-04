import { mainSlice } from "@/app/providers/redux/reducer";
import store from "@/app/providers/redux/store";

const createSetter = <T>(action: (payload: T) => any) => {
  return (value: T) => store.dispatch(action(value));
};

export const setFlags = createSetter<any>(mainSlice.actions.setFlags);
export const setLoader = createSetter<boolean>(mainSlice.actions.setLoader);

export default {
  setFlags,
  setLoader,
};
