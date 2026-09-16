import { ICoffeeProduct } from "@/types/configCat";
import { GRINDING_OPTIONS } from "./data";

// El backend replica estas mismas reglas para verificar el total de cada
// pedido (flormorado-cafe-backend-orders, src/utils/constants/pricing.ts).
// Si se cambian aquí hay que cambiarlas allá, o los pedidos se rechazan.
export const FREE_SHIPPING_FROM = 150000;

/** "45.000" -> 45000. El catálogo trae los precios con punto de miles. */
export const parseCopPrice = (price: string | number): number =>
  Number(typeof price === "string" ? price.replace(/\./g, "") : price);

export interface ICartTotals {
  subtotal: number;
  shipping: number;
  total: number;
}

export const computeCartTotals = (cart: ICoffeeProduct[]): ICartTotals => {
  const subtotal = cart.reduce(
    (acc, item) => acc + parseCopPrice(item.price) * (item.quantity || 1),
    0,
  );

  // El envío sale del primer producto del carrito, no del mayor ni de la suma.
  // Hoy todos los productos comparten shippingPrice, así que da lo mismo.
  const shipping =
    cart.length === 0 || subtotal >= FREE_SHIPPING_FROM
      ? 0
      : cart[0].shippingPrice || 0;

  return { subtotal, shipping, total: subtotal + shipping };
};

/**
 * Id del producto en el catálogo. El configurador guarda cada línea del carrito
 * con id `${product.id}-${molienda}` para separar el mismo café en moliendas
 * distintas, así que el id real hay que recuperarlo quitando ese sufijo. Se
 * deriva en vez de guardarse aparte para que funcione con los carritos que ya
 * están en localStorage.
 */
export const getCatalogProductId = (item: ICoffeeProduct): string => {
  const suffix = `-${item.grinding}`;
  return item.id.endsWith(suffix) ? item.id.slice(0, -suffix.length) : item.id;
};

/** "gruesa" -> "Gruesa". El carrito guarda el id de la molienda, no su nombre. */
export const getGrindingLabel = (grinding: string): string =>
  GRINDING_OPTIONS.find((option) => option.id === grinding)?.value ?? grinding;

export interface ICartReconciliation {
  cart: ICoffeeProduct[];
  repriced: string[];
  removed: string[];
}

/**
 * Pone el carrito al día contra el catálogo vigente: actualiza precios que
 * cambiaron y quita lo que se agotó o dejó de existir. El carrito vive 14 días
 * en localStorage, así que es normal que llegue al checkout con precios viejos.
 */
export const reconcileCart = (
  cart: ICoffeeProduct[],
  catalog: ICoffeeProduct[],
): ICartReconciliation => {
  const repriced: string[] = [];
  const removed: string[] = [];
  const next: ICoffeeProduct[] = [];

  for (const item of cart) {
    const product = catalog.find((p) => p.id === getCatalogProductId(item));

    if (!product || !product.stock) {
      removed.push(item.name);
      continue;
    }

    const priceChanged =
      parseCopPrice(product.price) !== parseCopPrice(item.price) ||
      product.shippingPrice !== item.shippingPrice;

    if (priceChanged) {
      repriced.push(item.name);
      next.push({
        ...item,
        price: product.price,
        shippingPrice: product.shippingPrice,
      });
    } else {
      next.push(item);
    }
  }

  return { cart: next, repriced, removed };
};
