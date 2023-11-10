import { vars } from '@ui/theme/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const tab = style({
  borderColor: vars.palette.white,
  color: vars.palette.white,
});

const content = style({
  backgroundColor: 'rgba(255, 255, 255, 0.10)',
  borderRadius: '20px',
  margin: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
  overflow: 'hidden',
});

const cell = recipe({
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1.25rem',
  },
  variants: {
    tappable: {
      true: {
        cursor: 'pointer',
        ':hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.30)',
        },
        ':active': {
          backgroundColor: 'rgba(255, 255, 255, 0.20)',
        },
      },
    },
  },
});

const text = style({
  padding: '0 1.25rem',
});

const btnUp = style({
  margin: '0 0 1rem 1rem',
});

export const ratingSt = {
  tab,
  content,
  cell,
  text,
  btnUp,
};
