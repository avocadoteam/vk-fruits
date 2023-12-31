import { vars } from '@ui/theme/theme.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const container = recipe({
  base: {
    display: 'grid',
    transition: 'all .2s ease',
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
        borderBottom: '2px dashed #E8E8E8',
        paddingBottom: '1rem',
      },
    },
    isActiveFreeze: {
      true: {
        opacity: 0.5,
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
  margin: '1rem auto 160px',
});
const opponentContainer = recipe({
  base: {
    marginTop: '1rem',
    display: 'grid',
    width: '100%',
    columnGap: '6px',
    rowGap: '6px',
    position: 'relative',
    userSelect: 'none',
    gridTemplateColumns: '1fr 1fr 1fr',
    opacity: 0.5,
    transition: 'all .2s ease',
  },
  variants: {
    isActiveFreeze: {
      true: {
        opacity: 1,
        transform: 'scale(1.08)',
      },
    },
  },
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
const grBadge2 = style({
  backgroundColor: vars.palette.white,
  color: vars.palette.primary,
  padding: '4px 6px',
  borderRadius: '23px',
});
const grBadgeConatiner = style({
  ':before': {
    boxShadow: 'none !important',
  },
});

const buyItem = style({
  userSelect: 'none',
  display: 'flex',
  padding: '12px 14px 12px 16px',
  alignItems: 'center',
  gap: '12px',
  borderRadius: '32px',
  backgroundColor: 'rgba(255, 255, 255, 0.10)',
  minWidth: 'max-content',
  cursor: 'pointer',
  transition: 'all .2s ease',
  ':hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.40)',
  },
  ':active': {
    transform: 'translateY(2px)',
  },
});

const horizContainer = style({
  display: 'flex',
  gap: '1rem',
  marginBottom: '1.5rem',
  padding: '0 1rem',
});
const horizContainerSpecial = style({
  display: 'flex',
  gap: '1rem',
  marginBottom: '.5rem',
  padding: '0 1rem',
});

export const gSt = {
  container,
  opponentContainer,
  box,
  score,
  gameBoard,
  grBadge,
  grBadgeConatiner,
  buyItem,
  grBadge2,
  horizContainer,
  horizContainerSpecial,
};
