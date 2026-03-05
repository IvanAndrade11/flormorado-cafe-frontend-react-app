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
