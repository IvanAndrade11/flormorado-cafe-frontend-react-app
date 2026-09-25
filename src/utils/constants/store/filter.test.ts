import { createEmptyFilters, filterProducts, parseFilterId } from "./filter";
import { ICoffeeProduct } from "@/types/configCat";
import { SelectedFilters } from "@/types/store";

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

describe("parseFilterId", () => {
  it("splits a compact group:option id", () => {
    expect(parseFilterId("brand:flormorado")).toEqual(["brand", "flormorado"]);
  });

  it("returns null when the id has no group or option", () => {
    expect(parseFilterId("brand")).toBeNull();
    expect(parseFilterId("")).toBeNull();
  });
});

describe("createEmptyFilters", () => {
  it("creates every filter group as an empty Set", () => {
    const filters = createEmptyFilters();

    expect(Object.keys(filters).sort()).toEqual(
      ["brand", "origin", "size", "type", "variety"].sort(),
    );
    Object.values(filters).forEach((group) => {
      expect(group.size).toBe(0);
    });
  });
});

describe("filterProducts", () => {
  const flormorado = buildProduct({ id: "flormorado", brand: "flormorado" });
  const products = [flormorado];

  it("returns all products when no filter is active", () => {
    expect(filterProducts(products, createEmptyFilters())).toEqual(products);
  });

  it("filters by a single active group (OR within the group)", () => {
    const selected: SelectedFilters = createEmptyFilters();
    selected.brand.add("flormorado");

    expect(filterProducts(products, selected)).toEqual([flormorado]);
  });

  it("combines groups with AND", () => {
    const somondoco500 = buildProduct({
      id: "somondoco-500",
      origin: "somondoco",
      size: "500",
    });
    const somondoco250 = buildProduct({
      id: "somondoco-250",
      origin: "somondoco",
      size: "250",
    });

    const selected: SelectedFilters = createEmptyFilters();
    selected.origin.add("somondoco");
    selected.size.add("500");

    const result = filterProducts([somondoco500, somondoco250], selected);

    expect(result).toEqual([somondoco500]);
  });

  it("excludes products that don't match any group", () => {
    const selected: SelectedFilters = createEmptyFilters();
    selected.brand.add("does-not-exist");

    expect(filterProducts(products, selected)).toEqual([]);
  });
});
