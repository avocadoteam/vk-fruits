export const clsx = (...classNames: (string | undefined)[]): string => classNames.filter(Boolean).join(' ');
