import { vars } from '@ui/theme/theme.css';
import { recipe } from '@vanilla-extract/recipes';

const day = recipe({
  base: {
    display: 'flex',
    width: '24px',
    height: '24px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    color: vars.palette.white,
    fontSize: '11px',
    fontFeatureSettings: `'clig' off, 'liga' off`,
    fontWeight: 700,
    borderRadius: '16px',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '#5B8C70',
      },
      false: {
        backgroundColor: '#E4F2EA',
        color: vars.palette.shade,
      },
    },
  },
});

export const modalStyle = { day };
