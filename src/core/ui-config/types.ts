export type UIConfig = {
  toasts: ToastsState;
};

export type Toast = {
  type: 'error' | 'success' | 'warn' | 'info';
  text?: string;
  title?: string;
};

export enum ToastId {
  unknown = 'test',
  BuyItem = 'buy_item',
  Gift = 'gift',
}
export type Form = 'location';
export type ToastsState = {
  queue: Partial<Record<ToastId, Toast>>;
  visibleId: ToastId | null;
};
