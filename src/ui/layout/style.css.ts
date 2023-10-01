import { vars } from '@ui/theme/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';

export const btnBackStyle = style({
  color: vars.palette.white,
  textTransform: 'uppercase',
  fontSize: '1rem',
  fontFamily: vars.fonts.family,
  fontWeight: 700,
  letterSpacing: '-0.24px',
  fontVariant: 'all-small-caps',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

globalStyle(`${btnBackStyle} > svg`, {
  padding: '0 0 0 10px',
  marginTop: '2px',
});
