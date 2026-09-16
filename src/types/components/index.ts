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
