import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const bgSkins = style({
  background: '#FFFFFF1A',
  width: '150px',
  height: '150px',
  borderRadius: '150px',
  overflow: 'hidden',
  position: 'relative',
});

const wrapper = style({
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '1rem',
});

const imgItem = recipe({
  base: {
    position: 'absolute',
  },
  variants: {
    index: {
      '0': {
        top: 0,
        left: '5%',
      },
      '1': {
        top: 0,
        left: '38%',
      },
      '2': {
        top: '33%',
        left: '15%',
      },
      '3': {
        top: '33%',
        left: '50%',
      },
      '4': {
        top: '65%',
        left: '32%',
      },
      '5': {
        top: '65%',
        left: '65%',
      },
    },
  },
});

export const giftSt = {
  bgSkins,
  wrapper,
  imgItem,
};
