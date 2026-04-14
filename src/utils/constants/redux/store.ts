import { IMainState } from "@/types/store";

export const initialState: IMainState = {
  session: {
    loader: true,
    categoryTitle: "NUESTROS PRODUCTOS",
    showCart: false,
    cart: [],
  },
  flags: {},
};
