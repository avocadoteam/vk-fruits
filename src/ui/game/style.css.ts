import { vars } from '@ui/theme/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const container = recipe({
  base: {
    display: 'grid',

    width: '100%',
    columnGap: '6px',
    rowGap: '6px',
    position: 'relative',
    userSelect: 'none',
  },
  variants: {
    isDemo: {
      true: {
        gridTemplateColumns: '1fr 1fr',
        maxWidth: '228px',
        borderRadius: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        padding: '10px',
        margin: '1rem auto',
      },
      false: {
        gridTemplateColumns: '1fr 1fr 1fr',
      },
    },
  },
});

const gameBoard = style({
  borderRadius: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  padding: '10px',
  maxWidth: '335px',
  width: '100%',
  margin: '1rem auto',
});
const opponentContainer = style({
  marginTop: '1rem',
  paddingTop: '1rem',
  display: 'grid',
  width: '100%',
  columnGap: '6px',
  rowGap: '6px',
  position: 'relative',
  userSelect: 'none',
  gridTemplateColumns: '1fr 1fr 1fr',
  opacity: 0.5,
  borderTop: '2px dashed #E8E8E8',
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

const grBadge = style({
  backgroundColor: vars.palette.white,
  color: vars.palette.grey,
  padding: '4px 6px',
  borderRadius: '8px',
});
const grBadgeConatiner = style({
  ':before': {
    boxShadow: 'none',
  },
});

export const gSt = {
  container,
  opponentContainer,
  box,
  score,
  gameBoard,
  grBadge,
  grBadgeConatiner,
};
