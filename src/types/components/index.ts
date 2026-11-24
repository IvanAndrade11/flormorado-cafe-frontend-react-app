import { OrderId, SelectedFilters } from "../store";

export interface ILoader {
  show: boolean;
}

export interface INavbarStore {
  orderBy: (id: OrderId) => void;
  filter: (id: string) => void;
  clearFilters: () => void;
  selected: SelectedFilters;
}

export interface NavbarMenuItem {
  id: string;
  title: string;
  url: string;
  dropdown?: boolean;
  subItems?: NavbarMenuItem[];
}

export interface ICheckoutForm {
  title: string;
  formFields: IFormFields[];
  eventKey: string;
  setActiveKey: (key: string) => void;
  setForm: (tmpForm: Record<string, string | boolean>) => void;
  // Sin siguiente paso, el panel queda abierto: el último paso espera la
  // respuesta del backend en vez de cerrarse.
  nextActiveKey?: string;
  labelBtn: string;
  defaultValues?: Record<string, string | boolean>;
  submitting?: boolean;
  submitError?: React.ReactNode;
}

export interface IFormFields {
  rowId: number;
  cols: IFormCols[];
}

export interface IFormCols {
  colId: number;
  md: number;
  name: string;
  label: string;
  type: string;
  required: boolean;
  pattern: string | undefined;
  minLength: number;
  maxLength: number;
  feedback: string;
  options?: { value: string; label: string }[];
  showWhen?: { field: string; equals: string };
  hideWhen?: { field: string; equals: string };
}

// Contenido de las páginas de relato (propósito, orígenes), que lo pintan con
// los componentes de `@/components/section`.
export interface IStoryImage {
  src: string;
  alt: string;
}

export interface IStoryHighlight {
  id: string;
  title: string;
  description: string;
}

export interface IStorySection {
  id: string;
  // Sin encabezado la sección es solo texto, para entrar a lo que sigue.
  question?: string;
  paragraphs: string[];
  // Sin ilustración, la sección se pinta en una sola columna centrada.
  image?: IStoryImage;
  // Segunda ilustración para las secciones que nombran más de un producto.
  secondaryImage?: IStoryImage;
  quote?: string;
  highlights?: IStoryHighlight[];
  // "list": junto al texto. "cards": a todo el ancho, para variar el ritmo.
  highlightsLayout?: "list" | "cards";
}

// Cada uno de los tres orígenes que el mapa de `/origenes` deja explorar. El
// `id` es también el del departamento en el mapa.
export interface IOriginFact {
  id: string;
  title: string;
  description: string;
}

export interface IOrigin {
  id: string;
  department: string;
  town: string;
  nickname: string;
  headline: string;
  chooseIf: string;
  summary: string;
  altitude: string;
  thermalFloor: string;
  cupProfile: string;
  facts: IOriginFact[];
}
