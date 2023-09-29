import { vars } from '@ui/theme/theme.css';
import { styleVariants } from '@vanilla-extract/css';

const snackAva = styleVariants({
  success: {
    background: `${vars.all.primary} !important`,
  },
  error: {
    background: `${vars.palette.error} !important`,
  },
  warn: {
    background: `${vars.palette.warn} !important`,
  },
  info: {
    background: `${vars.all.primary} !important`,
  },
});

export const snackStyles = {
  snackAva,
};
