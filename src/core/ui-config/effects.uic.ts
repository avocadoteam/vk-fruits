import { uiD } from './domain.uic';
import { Toast, ToastId } from './types';

export const hideToast = uiD.createEvent<ToastId>();
export const showFirstToast = uiD.createEvent();
export const addToastToQueue = uiD.createEvent<{
  id: ToastId;
  toast: Toast;
}>();
