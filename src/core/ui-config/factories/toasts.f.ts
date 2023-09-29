import { objKeys } from '@core/utils';
import { Effect, Store } from 'effector';
import { codeErrorToToast, successToToast } from '../shapes';
import { Form, ToastId, UIConfig } from '../types';

const toastFactory: Partial<
  Record<
    ToastId,
    {
      toastForm?: Form;
      toastText?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      apis: Effect<any, any, any>[];
    }
  >
> = {
  [ToastId.unknown]: {
    apis: [],
  },
};

export const produceToasts = (uiS: Store<UIConfig>) => {
  for (const toastId of objKeys(toastFactory)) {
    toastFactory[toastId]?.apis.forEach(api => {
      uiS.on(api.doneData, (state, data) => {
        return {
          ...state,
          toasts: {
            ...state.toasts,
            queue: {
              ...state.toasts.queue,
              [toastId]: successToToast(toastFactory[toastId]?.toastForm, data),
            },
          },
        };
      });
      uiS.on(api.failData, (state, data) => ({
        ...state,
        toasts: {
          ...state.toasts,
          queue: {
            ...state.toasts.queue,
            [toastId]: {
              ...codeErrorToToast(toastFactory[toastId]?.toastForm, toastFactory[toastId]?.toastText, data),
              type: 'error',
            },
          },
        },
      }));
    });
  }
};
