import { ILoader, IMainState, IToast } from '@/types/store';

const toast: IToast = {
  duration: 61000,
  show: false,
  title: '',
  message: '',
  type: 'warning'
};

const loader: ILoader = {
  show: false,
  progress: 0,
  text: '',
  transparentText: ''
};

export const initialState: IMainState = {
  toast,
  loader
};
