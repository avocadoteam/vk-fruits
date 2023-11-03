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
  Game = 'game',
  Gift = 'gift',
  StoryShare = 'story_share',
}
export type Form = 'location';
export type ToastsState = {
  queue: Partial<Record<ToastId, Toast>>;
  visibleId: ToastId | null;
};
