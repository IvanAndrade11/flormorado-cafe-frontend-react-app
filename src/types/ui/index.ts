export interface IImage {
  className?: string;
  src: string;
  alt?: string;
  width?: any;
  height?: any;
  id?: any;
}

export interface IButton {
  type: 'button' | 'submit' | 'reset';
  label: any;
  dataTestid?: string;
  className?: string;
  id?: string;
  onClick?: any;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  icon?: boolean;
}

export interface IBanner {
  img: string;
}

export interface IListItemWithIcon {
  icon: string;
  text: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
