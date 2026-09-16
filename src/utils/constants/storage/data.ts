export const CART_STORAGE_KEY = "fmc-cart";
export const CART_TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 días
export const CHECKOUT_STORAGE_KEY = "fmc-checkout-info";

// Por pestaña: si el cliente recarga la confirmación, sigue viendo su pedido en
// vez de un checkout vacío que lo haga dudar de si la compra entró.
export const LAST_ORDER_STORAGE_KEY = "fmc-last-order";
