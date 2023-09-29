import { globalStyle, style } from '@vanilla-extract/css';

const btnWide = style({});
const btnContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '.25rem',
});

const grid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: '.5rem',
  margin: '0 1rem',
});

globalStyle(`${btnWide} > .vkuiButton__in`, {
  justifyContent: 'space-between',
});

export const homeStyles = {
  btnWide,
  btnContent,
  grid,
};
