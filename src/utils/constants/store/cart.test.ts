import { ICoffeeProduct } from "@/types/configCat";
import {
  computeCartTotals,
  FREE_SHIPPING_FROM,
  getCatalogProductId,
  getGrindingLabel,
  parseCopPrice,
  reconcileCart,
} from "./cart";

const catalogProduct = (
  overrides: Partial<ICoffeeProduct> = {},
): ICoffeeProduct => ({
  id: "FLORMORADO500",
  stock: true,
  brand: "flormorado",
  name: "FLORMORADO CAFÉ 500 G",
  imageUrl: "",
  shortDescription: "",
  grinding: "Gruesa",
  roastOptions: "Media",
  variety: "Blend",
  size: "500",
  price: "45.000",
  shippingPrice: 7000,
  process: { benefit: "", drying: "", controlledFermentation: "" },
  productDescription: "",
  tags: [],
  category: "CAFÉ",
  type: "origin",
  origin: "somondoco",
  ...overrides,
});

// Así guarda el configurador una línea del carrito: id compuesto con la molienda.
const cartLine = (
  product: ICoffeeProduct,
  grinding: string,
  quantity: number,
): ICoffeeProduct => ({
  ...product,
  id: `${product.id}-${grinding}`,
  grinding,
  quantity,
});

describe("parseCopPrice", () => {
  it("quita los puntos de miles", () => {
    expect(parseCopPrice("45.000")).toBe(45000);
    expect(parseCopPrice("240.000")).toBe(240000);
  });

  it("acepta un número tal cual", () => {
    expect(parseCopPrice(45000)).toBe(45000);
  });
});

describe("computeCartTotals", () => {
  it("cobra envío por debajo del umbral", () => {
    const cart = [cartLine(catalogProduct(), "gruesa", 2)];

    expect(computeCartTotals(cart)).toEqual({
      subtotal: 90000,
      shipping: 7000,
      total: 97000,
    });
  });

  it("regala el envío justo en el umbral", () => {
    const cart = [cartLine(catalogProduct({ price: "150.000" }), "gruesa", 1)];

    expect(computeCartTotals(cart).subtotal).toBe(FREE_SHIPPING_FROM);
    expect(computeCartTotals(cart).shipping).toBe(0);
  });

  it("asume cantidad 1 cuando la línea no la trae", () => {
    const cart = [{ ...catalogProduct(), quantity: undefined }];

    expect(computeCartTotals(cart).subtotal).toBe(45000);
  });

  it("no cobra nada con el carrito vacío", () => {
    expect(computeCartTotals([])).toEqual({
      subtotal: 0,
      shipping: 0,
      total: 0,
    });
  });
});

describe("getCatalogProductId", () => {
  it("recupera el id del catálogo quitando la molienda", () => {
    const line = cartLine(catalogProduct(), "gruesa", 1);

    expect(line.id).toBe("FLORMORADO500-gruesa");
    expect(getCatalogProductId(line)).toBe("FLORMORADO500");
  });

  it("funciona aunque el id del catálogo tenga guiones", () => {
    const line = cartLine(catalogProduct({ id: "OCA-500" }), "grano", 1);

    expect(getCatalogProductId(line)).toBe("OCA-500");
  });

  it("deja intacto un id que no termina en la molienda", () => {
    expect(getCatalogProductId(catalogProduct())).toBe("FLORMORADO500");
  });
});

describe("getGrindingLabel", () => {
  it("traduce el id de la molienda a su nombre", () => {
    expect(getGrindingLabel("gruesa")).toBe("Gruesa");
    expect(getGrindingLabel("grano")).toBe("En grano");
  });

  it("devuelve el valor tal cual si no lo reconoce", () => {
    expect(getGrindingLabel("Prensa francesa")).toBe("Prensa francesa");
  });
});

describe("reconcileCart", () => {
  it("actualiza el precio de una línea con precio viejo", () => {
    const stale = cartLine(catalogProduct({ price: "40.000" }), "gruesa", 2);

    const result = reconcileCart([stale], [catalogProduct()]);

    expect(result.cart[0].price).toBe("45.000");
    expect(result.cart[0].quantity).toBe(2);
    expect(result.cart[0].grinding).toBe("gruesa");
    expect(result.repriced).toEqual(["FLORMORADO CAFÉ 500 G"]);
    expect(result.removed).toEqual([]);
  });

  it("quita un producto agotado", () => {
    const line = cartLine(catalogProduct(), "gruesa", 1);

    const result = reconcileCart([line], [catalogProduct({ stock: false })]);

    expect(result.cart).toEqual([]);
    expect(result.removed).toEqual(["FLORMORADO CAFÉ 500 G"]);
  });

  it("quita un producto que ya no está en el catálogo", () => {
    const line = cartLine(catalogProduct(), "gruesa", 1);

    const result = reconcileCart([line], []);

    expect(result.cart).toEqual([]);
    expect(result.removed).toHaveLength(1);
  });

  it("no toca una línea que ya está al día", () => {
    const line = cartLine(catalogProduct(), "gruesa", 1);

    const result = reconcileCart([line], [catalogProduct()]);

    expect(result.cart[0]).toBe(line);
    expect(result.repriced).toEqual([]);
  });
});
