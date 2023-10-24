import { GlobalStyleRule, createGlobalTheme, globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const root = createGlobalTheme('#app', {
  space: {
    small: '.25rem',
    medium: '.5rem',
    large: '1rem',
  },
  fonts: {
    family: `SF Pro Rounded`,
  },
  boxShadow: '0px 52px 64px rgba(0, 0, 0, 0.03)',
  borderRadius: '36px',
  palette: {
    white: '#ffffff',
    black: '#000000',
    warn: '#FEAF48',
    error: '#FF726E',
    shade: '#BCBCBC',
    primary: '#407860',
    grey: '#515151',
  },
});
export const vars = { ...root };

globalStyle('#app', {
  boxSizing: 'border-box',
  fontSize: '16px',
  fontStyle: 'normal',
});
globalStyle(`.vkuiSearch`, {
  padding: '0 !important',
  background: 'transparent !important',
  marginTop: '1rem',
} as GlobalStyleRule);
globalStyle(`.vkuiButton--mode-primary`, {
  backgroundColor: `${vars.palette.white} !important`,
  color: `${vars.palette.primary} !important`,
  borderRadius: `9999px !important`,
} as GlobalStyleRule);
globalStyle(`.vkuiSwitch__self:checked+.vkuiSwitch__pseudo:after`, {
  background: `${vars.palette.primary} !important`,
} as GlobalStyleRule);

export const contentCenter = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '.5rem 1rem',
  },
  variants: {
    alignItems: {
      start: {
        alignItems: 'flex-start',
      },
    },
    justifyContent: {
      start: {
        justifyContent: 'flex-start',
      },
      sb: {
        justifyContent: 'space-between',
      },
    },
    direction: {
      column: {
        flexDirection: 'column',
      },
      row: {
        flexDirection: 'row',
      },
    },
    p: {
      '1': {
        padding: '1rem',
      },
      '0': {
        padding: '0',
      },
    },
    gap: {
      '1': {
        gap: '1rem',
      },
    },
  },
});

export const primary = style({
  color: `${vars.palette.primary} !important`,
});

export const mt2 = style({
  marginTop: '2rem !important',
});
export const mthalf = style({
  marginTop: '.5rem !important',
});
export const mt = style({
  marginTop: '1rem !important',
});

export const btnSec = styleVariants({
  secHome: {
    minHeight: '52px !important',
    color: `${vars.palette.white} !important`,
    borderRadius: '1rem !important',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  secBase: {
    color: `${vars.palette.white} !important`,
    borderRadius: '44px !important',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});

export const bg = style({
  background:
    'radial-gradient(78.87% 47.71% at 3.61% 9.35%, rgba(222, 251, 80, 0.15) 0%, rgba(215, 167, 142, 0.00) 100%), radial-gradient(69.42% 50.26% at -16.53% 93.46%, rgba(222, 251, 80, 0.15) 0%, rgba(215, 167, 142, 0.00) 100%), radial-gradient(50.07% 88.27% at 100% 64.84%, rgba(222, 251, 80, 0.20) 0%, rgba(215, 167, 142, 0.00) 100%), radial-gradient(83.57% 72.39% at 67.22% 100%, rgba(86, 75, 46, 0.25) 0%, rgba(215, 167, 142, 0.00) 100%), #357460;',
});
export const bgGift = style({
  background:
    'radial-gradient(78.87% 47.71% at 3.61% 9.35%, rgba(222, 251, 80, 0.15) 0%, rgba(215, 167, 142, 0.00) 100%), radial-gradient(69.42% 50.26% at -16.53% 93.46%, rgba(222, 251, 80, 0.15) 0%, rgba(215, 167, 142, 0.00) 100%), radial-gradient(50.07% 88.27% at 100% 64.84%, rgba(222, 251, 80, 0.20) 0%, rgba(215, 167, 142, 0.00) 100%), radial-gradient(83.57% 72.39% at 67.22% 100%, rgba(86, 75, 46, 0.25) 0%, rgba(215, 167, 142, 0.00) 100%), #9E3D3D;',
});
