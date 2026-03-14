export interface ISession {
  loader: boolean;
  categoryTitle: "CAFÉ" | "SAGÚ" | "OTROS PRODUCTOS" | "NUESTROS PRODUCTOS";
}

export interface IMainState {
  session: ISession;
  flags: any;
}

export interface ICoffeeProduct {
  id: string;
  stock: boolean;
  brand: string;
  name: string;
  imageUrl: string;
  shortDescription: string;
  grinding: string;
  roastOptions: string;
  variety: string;
  availableWeights: string;
  price: string;
  shippingPrice: number;
  process: {
    benefit: string;
    drying: string;
    controlledFermentation: string;
  };
  productDescription: string;
  tags: string[];
  category: string;
  type: string;
  origin: string;

  createdAt?: string | number | Date;
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
