import { mapVkError } from './vk-errors';

export const anonAva = 'https://vk.app-dich.com/static/stickers/anon.png';
export const avocadoLogo = 'https://vk.app-dich.com/static/stickers/avocado_logo.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errMap = (error: any) => {
  if (error && error.error_type && error.error_data) {
    return mapVkError(error);
  } else {
    return JSON.stringify(error, ['message', 'statusCode']);
  }
};

export const sortByCreated = <T extends { created: string }>(f: T, n: T) =>
  new Date(n.created).getTime() - new Date(f.created).getTime();

export const numberWithSpace = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const objKeys = <T extends Record<string, unknown>>(obj: T) => Object.keys(obj) as (keyof T)[];

export const capitalizeFirstLetter = (v: string) => {
  return v.charAt(0).toUpperCase() + v.slice(1);
};

export const declOfNum = (value: number, titles: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[value % 100 > 4 && value % 100 < 20 ? 2 : cases[value % 10 < 5 ? value % 10 : 5]];
};

const onlyRuLetters = /[^(а-яА-я|ёЁ|\-) ]/g;
export const shapeTextSearch = (v: string) => {
  return v.replace(onlyRuLetters, '').trimStart();
};

export const isODR = () => window.location.href.includes('file://');

export const wrapAsset = (src: string) => `https://avocadoteam.github.io/vk-hot-or-not${src}`;
