import { Form, Toast } from './types';

export const codeErrorToToast = (form?: Form, text?: string, data?: unknown): Pick<Toast, 'text' | 'title'> => {
  return formError(form, text, data);
};
export const successToToast = (form?: Form, data?: unknown): Toast => {
  switch (form) {
    default:
      return {
        title: 'Изменения сохранены',
        type: 'success',
      };
  }
};

const formError = (form?: Form, text?: unknown, data?: unknown): Pick<Toast, 'text' | 'title'> => {
  switch (form) {
    default:
      return {
        title: 'Что-то пошло не так...',
      };
  }
};
