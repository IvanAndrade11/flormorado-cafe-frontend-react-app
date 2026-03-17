export interface ISession {
  loader: boolean;
  categoryTitle: "CAFÉ" | "SAGÚ" | "OTROS PRODUCTOS" | "NUESTROS PRODUCTOS";
}

export interface IMainState {
  session: ISession;
  flags: any;
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
