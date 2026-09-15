import { orderProducts } from "./order";
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

describe("orderProducts", () => {
  it("orders by highest price first (priceMayus)", () => {
    const products = [
      buildProduct({ id: "a", price: "35.000" }),
      buildProduct({ id: "b", price: "240.000" }),
      buildProduct({ id: "c", price: "45.000" }),
    ];

    const result = orderProducts("priceMayus", products);

    expect(result.map((p) => p.id)).toEqual(["b", "c", "a"]);
  });

  it("orders by lowest price first (priceMinus)", () => {
    const products = [
      buildProduct({ id: "a", price: "35.000" }),
      buildProduct({ id: "b", price: "240.000" }),
      buildProduct({ id: "c", price: "45.000" }),
    ];

    const result = orderProducts("priceMinus", products);

    expect(result.map((p) => p.id)).toEqual(["a", "c", "b"]);
  });

  it("parses prices with thousand separators and decimal commas", () => {
    const products = [
      buildProduct({ id: "a", price: "1.234,50" }),
      buildProduct({ id: "b", price: "1.234" }),
    ];

    const result = orderProducts("priceMayus", products);

    expect(result.map((p) => p.id)).toEqual(["a", "b"]);
  });

  it("orders names A→Z ignoring accents and case (nameAscendant)", () => {
    const products = [
      buildProduct({ id: "a", name: "Óscar" }),
      buildProduct({ id: "b", name: "andrea" }),
      buildProduct({ id: "c", name: "Bruno" }),
    ];

    const result = orderProducts("nameAscendant", products);

    expect(result.map((p) => p.id)).toEqual(["b", "c", "a"]);
  });

  it("orders names Z→A (nameDescendant)", () => {
    const products = [
      buildProduct({ id: "a", name: "Ana" }),
      buildProduct({ id: "b", name: "Bruno" }),
    ];

    const result = orderProducts("nameDescendant", products);

    expect(result.map((p) => p.id)).toEqual(["b", "a"]);
  });

  it("orders newest first using createdAt (newer)", () => {
    const products = [
      buildProduct({ id: "old", createdAt: "2024-01-01" }),
      buildProduct({ id: "new", createdAt: "2026-01-01" }),
    ];

    const result = orderProducts("newer", products);

    expect(result.map((p) => p.id)).toEqual(["new", "old"]);
  });

  it("orders oldest first using createdAt (older)", () => {
    const products = [
      buildProduct({ id: "new", createdAt: "2026-01-01" }),
      buildProduct({ id: "old", createdAt: "2024-01-01" }),
    ];

    const result = orderProducts("older", products);

    expect(result.map((p) => p.id)).toEqual(["old", "new"]);
  });

  it("falls back to original order when createdAt is missing", () => {
    const products = [
      buildProduct({ id: "first" }),
      buildProduct({ id: "second" }),
    ];

    const result = orderProducts("older", products);

    expect(result.map((p) => p.id)).toEqual(["first", "second"]);
  });

  it("does not mutate the original array", () => {
    const products = [
      buildProduct({ id: "a", price: "35.000" }),
      buildProduct({ id: "b", price: "240.000" }),
    ];
    const original = [...products];

    orderProducts("priceMayus", products);

    expect(products).toEqual(original);
  });
});
