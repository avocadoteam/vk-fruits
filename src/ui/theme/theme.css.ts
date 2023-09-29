import {
  GlobalStyleRule,
  createGlobalTheme,
  createTheme,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
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
    warn: '#FCA743',
    error: '#FF726E',
  },
});

const elemnetsContract = createThemeContract({
  primary: null,
  background: null,
});

export const lightTheme = createTheme(elemnetsContract, {
  primary: '#407860',
  background: '#357460',
});

export const darkTheme = createTheme(elemnetsContract, {
  primary: '#407860',
  background: '#357460',
});

export const vars = { ...root, all: elemnetsContract };

globalStyle('#app', {
  boxSizing: 'border-box',
  fontSize: '16px',
  fontStyle: 'normal',
});

globalStyle(`.vkui__root`, {
  '--vkui--color_background_page': `${vars.all.background} !important`,
  '--vkui--color_background_content': `${vars.all.background} !important`,
  '--vkui--color_header_background': `${vars.all.background} !important`,
  '--button_primary_background': vars.all.primary,
  '--button_seondary_background': vars.palette.white,
  '--button_secondary_foreground': vars.palette.white,
  '--vkui--size_border_radius--regular': '1rem',
  '--accent': vars.all.primary,
} as GlobalStyleRule);
globalStyle(`.vkuiSearch`, {
  padding: '0 !important',
  background: 'transparent !important',
  marginTop: '1rem',
} as GlobalStyleRule);
globalStyle(`.vkuiPanel.vkuiPanel--sizeX-regular .vkuiPanel__in, .vkuiPanel.vkuiPanel--sizeX-regular:after`, {
  backgroundColor: `${vars.all.background} !important`,
} as GlobalStyleRule);
globalStyle(`.vkuiSwitch__self:checked+.vkuiSwitch__pseudo:after`, {
  background: `${vars.all.primary} !important`,
} as GlobalStyleRule);

export const contentCenter = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    minHeight: '65vh',
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
    },
  },
});

export const primary = style({
  color: `${vars.all.primary} !important`,
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

export const btnSec = style({
  color: `${vars.all.primary} !important`,
  borderRadius: '1rem !important',
});
