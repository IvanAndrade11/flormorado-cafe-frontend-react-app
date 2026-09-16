import { ICoffeeProduct, IFeatureFlags } from "../configCat";

export type CategoryTitle =
  | "CAFÉ"
  | "SAGÚ"
  | "OTROS PRODUCTOS"
  | "NUESTROS PRODUCTOS"; // catch-all: no es una categoría de storeCategories

export interface ISession {
  loader: boolean;
  categoryTitle: CategoryTitle;
  showCart: boolean;
  toast: {
    show: boolean;
    message: string;
  };
  cart: ICoffeeProduct[];
}

export interface IMainState {
  session: ISession;
  flags: Partial<IFeatureFlags>;
}

export type OrderId =
  | "priceMayus" // Mayor precio (desc)
  | "priceMinus" // Menor precio (asc)
  | "nameDescendant" // Nombre Z→A
  | "nameAscendant" // Nombre A→Z
  | "older" // Más antiguos
  | "newer"; // Más recientes

export type FilterGroupId = "type" | "brand" | "size" | "origin" | "variety";

export type SelectedFilters = Record<FilterGroupId, Set<string>>;
