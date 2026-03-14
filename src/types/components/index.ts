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
