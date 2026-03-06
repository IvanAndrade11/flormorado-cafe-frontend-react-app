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
  orderBy: (id: string) => void;
  filter: (id: string) => void;
}
