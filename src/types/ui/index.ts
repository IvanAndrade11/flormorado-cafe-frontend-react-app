export interface IBanner {
  img: string;
}

export interface IListItemWithIcon {
  icon: string;
  text: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
