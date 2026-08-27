import { OrderId } from "../store";

export interface ICard {
  title: string;
  textBtn: string | boolean;
  action: () => any;
  list: {
    icon: any;
    text: string;
  }[];
}

export interface ILoader {
  show: boolean;
}

export interface INavbarStore {
  orderBy: (id: OrderId) => void;
  filter: (id: string) => void;
  clearFilters: () => void;
  selected: number;
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
  setForm: (tmpForm: any) => void;
  nextActiveKey: string;
  labelBtn: string;
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
}
