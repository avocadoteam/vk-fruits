/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Toast } from './types';

export const codeErrorToToast = (form?: Form, text?: string, data?: unknown): Pick<Toast, 'text' | 'title'> => {
  return formError(form, text, data);
};
export const successToToast = (form?: Form, _?: unknown): Toast => {
  switch (form) {
    default:
      return {
        title: 'Изменения сохранены',
        type: 'success',
      };
  }
};

const formError = (form?: Form, _?: unknown, __?: unknown): Pick<Toast, 'text' | 'title'> => {
  switch (form) {
    default:
      return {
        title: 'Что-то пошло не так...',
      };
  }
};
