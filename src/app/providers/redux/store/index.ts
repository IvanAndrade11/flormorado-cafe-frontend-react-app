import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducer";
import { initialState } from "@/utils/constants/redux/store";
import { ICoffeeProduct } from "@/types/configCat";

const CART_STORAGE_KEY = "fmc-cart";
const CART_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 días

interface StoredCart {
  cart: ICoffeeProduct[];
  savedAt: number;
}

const loadCart = (): ICoffeeProduct[] => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return initialState.session.cart;

    const stored = JSON.parse(raw) as Partial<StoredCart>;
    if (!Array.isArray(stored.cart) || typeof stored.savedAt !== "number") {
      return initialState.session.cart;
    }

    if (Date.now() - stored.savedAt > CART_TTL_MS) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return initialState.session.cart;
    }

    return stored.cart;
  } catch {
    return initialState.session.cart;
  }
};

const store = configureStore({
  reducer: { main: reducer },
  preloadedState: {
    main: {
      ...initialState,
      session: { ...initialState.session, cart: loadCart() },
    },
  },
});

let previousCart = store.getState().main.session.cart;
store.subscribe(() => {
  const cart = store.getState().main.session.cart;
  if (cart === previousCart) return;
  previousCart = cart;
  try {
    const stored: StoredCart = { cart, savedAt: Date.now() };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // localStorage unavailable (private browsing, quota) — cart just won't persist
  }
});

export default store;
