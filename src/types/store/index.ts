export interface IToast {
  show: boolean;
  title?: string;
  message?: string;
  duration: number;
  type: 'success' | 'error' | 'info' | 'warning';
}

export interface ILoader {
  show?: boolean;
  progress?: number;
  text: string;
  transparentText: string;
}

export interface IMainState {
  toast: IToast;
  loader: ILoader;
}
