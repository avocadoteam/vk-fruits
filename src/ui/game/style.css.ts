import { vars } from '@ui/theme/theme.css';
import { style } from '@vanilla-extract/css';

const container = style({
  margin: '1rem auto',
  display: 'grid',
  padding: '10px',
  borderRadius: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  gridTemplateColumns: '1fr 1fr',
  width: '100%',
  maxWidth: '228px',
  columnGap: '6px',
  rowGap: '6px',
  position: 'relative',
  userSelect: 'none',
});

const box = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  width: '100%',
  height: '87px',
  position: 'relative',
  userSelect: 'none',
  boxSizing: 'border-box',
});

const score = style({
  color: vars.palette.primary,
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '-0.3px',
  position: 'absolute',
  zIndex: 1,
  padding: '4px 6px',
  borderRadius: '10px',
  backgroundColor: vars.palette.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: -4,
  userSelect: 'none',
  right: -4,
});

export const gSt = {
  container,
  box,
  score,
};
