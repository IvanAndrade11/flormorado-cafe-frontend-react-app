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

// Contenido de «Nuestro propósito»; vive en `constants/common/purpose`.
export interface IPurposeImage {
  src: string;
  alt: string;
}

export interface IPurposeHighlight {
  id: string;
  title: string;
  description: string;
}

export interface IPurposeSection {
  id: string;
  // Etiqueta sobre el título, con la forma de las categorías del blog.
  eyebrow: string;
  question: string;
  paragraphs: string[];
  image: IPurposeImage;
  // Segunda foto para las secciones que nombran más de un producto.
  secondaryImage?: IPurposeImage;
  quote?: string;
  highlights?: IPurposeHighlight[];
  // "list": junto al texto. "cards": a todo el ancho, para variar el ritmo.
  highlightsLayout?: "list" | "cards";
}

export interface IPurposeCredit {
  id: string;
  work: string;
  url: string;
  author: string;
  license: string;
}
