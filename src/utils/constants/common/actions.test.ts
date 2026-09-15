import { formatPrice, getProductPrice, productsByCategory } from "./actions";
import { ICoffeeProduct } from "@/types/configCat";

const buildProduct = (
  overrides: Partial<ICoffeeProduct> = {},
): ICoffeeProduct => ({
  id: "1",
  stock: true,
  brand: "flormorado",
  name: "Producto",
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

describe("formatPrice", () => {
  it("formats a number with Colombian thousand separators", () => {
    expect(formatPrice(45000)).toBe("45.000");
    expect(formatPrice(1234567)).toBe("1.234.567");
  });
});

describe("getProductPrice", () => {
  it("multiplies the unit price by quantity", () => {
    const product = buildProduct({ price: "45.000", quantity: 3 });

    expect(getProductPrice(product)).toBe("135.000");
  });

  it("defaults to a quantity of 1 when not set", () => {
    const product = buildProduct({ price: "45.000", quantity: undefined });

    expect(getProductPrice(product)).toBe("45.000");
  });
});

describe("productsByCategory", () => {
  const cafe = buildProduct({ id: "cafe", category: "CAFÉ" });
  const sagu = buildProduct({ id: "sagu", category: "SAGÚ" });
  const products = [cafe, sagu];

  it("returns every product for the catch-all title", () => {
    expect(productsByCategory(products, "NUESTROS PRODUCTOS")).toEqual(
      products,
    );
  });

  it("filters by category otherwise", () => {
    expect(productsByCategory(products, "CAFÉ")).toEqual([cafe]);
  });
});
