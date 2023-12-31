import { vars } from '@ui/theme/theme.css';
import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const box = style({
  borderRadius: '40px',
  backgroundColor: 'rgba(255, 255, 255, 0.10)',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
  marginTop: '1rem',
});

const btnContainer = style({
  gap: '1rem',
  width: 'calc(100% - 32px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  marginBottom: '1rem',
});

const radio = style({
  width: '100%',
});
const radioContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

globalStyle(`${radio} > .vkuiRadio__container > svg`, {
  color: `${vars.palette.white} !important`,
});

const horCell = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '16px 12px',
    borderRadius: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    marginRight: '.5rem',
    cursor: 'pointer',
  },
  variants: {
    selectedSkin: {
      true: {
        backgroundColor: vars.palette.white,
      },
    },
  },
});

export const sSt = {
  box,
  btnContainer,
  radio,
  radioContent,
  horCell,
};
