import { objKeys } from '@core/utils';
import { combine, createStore } from 'effector';
import { addToastToQueue, hideToast, showFirstToast } from './effects.uic';
import { produceToasts } from './factories/toasts.f';
import { UIConfig } from './types';

export const $uic = createStore<UIConfig>({
  toasts: {
    queue: {},
    visibleId: null,
  },
});

export const $toasts = combine($uic, ui => ui.toasts);

$uic.on(hideToast, (state, toastId) => {
  if (state.toasts.queue[toastId]) {
    delete state.toasts.queue[toastId];
  }
  return {
    ...state,
    toasts: {
      visibleId: null,
      queue: state.toasts.queue,
    },
  };
});
$uic.on(showFirstToast, state => {
  return {
    ...state,
    toasts: {
      ...state.toasts,
      visibleId: (state.toasts.visibleId = objKeys(state.toasts.queue)[0]),
    },
  };
});
$uic.on(addToastToQueue, (state, { id, toast }) => {
  const queue = {
    ...state.toasts.queue,
    [id]: toast,
  };
  return {
    ...state,
    toasts: {
      ...state.toasts,
      queue,
    },
  };
});

produceToasts($uic);
