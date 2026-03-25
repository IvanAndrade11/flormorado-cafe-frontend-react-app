import { FilterGroupId, SelectedFilters } from "@/types/store";
import { ICoffeeProduct } from "@/types/configCat";

/**
 * Parse de ids compactos del UI: "group:option"
 */
export const parseFilterId = (id: string): [FilterGroupId, string] | null => {
  const [g, opt] = id.split(":");
  if (!g || !opt) return null;
  return [g as FilterGroupId, opt];
};

/**
 * Crea un objeto de filtros vacíos
 */
export const createEmptyFilters = (): SelectedFilters => ({
  type: new Set<string>(),
  brand: new Set<string>(),
  size: new Set<string>(),
  origin: new Set<string>(),
  variety: new Set<string>(),
});

/**
 * Aplica filtros a productos (OR dentro de cada grupo, AND entre grupos)
 */
export const filterProducts = (
  products: ICoffeeProduct[],
  selected: SelectedFilters,
): ICoffeeProduct[] => {
  const activeGroups = (Object.keys(selected) as FilterGroupId[]).filter(
    (g) => selected[g].size > 0,
  );
  if (activeGroups.length === 0) return products;

  return products.filter((p) => {
    for (const g of activeGroups) {
      const value = (p as any)[g];
      if (!selected[g].has(value)) return false;
    }
    return true;
  });
};
