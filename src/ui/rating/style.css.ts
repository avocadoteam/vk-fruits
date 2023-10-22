import { vars } from '@ui/theme/theme.css';
import { style } from '@vanilla-extract/css';

const tab = style({
  borderColor: vars.palette.white,
  color: vars.palette.white,
});

const content = style({
  backgroundColor: 'rgba(255, 255, 255, 0.10)',
  borderRadius: '20px',
  padding: '1rem 1.25rem',
  margin: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const cell = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const ratingSt = {
  tab,
  content,
  cell,
};
