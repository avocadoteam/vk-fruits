import { vars } from '@ui/theme/theme.css';
import { ComplexStyleRule, globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const btnBackStyle = style({
  color: `${vars.palette.white} !important`,
  textTransform: 'uppercase',
  fontSize: '1rem',
  fontFamily: vars.fonts.family,
  fontWeight: 700,
  letterSpacing: '-0.24px',
  fontVariant: 'all-small-caps',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  borderRadius: '0 !important',
});

globalStyle(`${btnBackStyle} > svg`, {
  padding: '0 0 0 10px',
  marginTop: '2px',
});

export const headerStyle = recipe({
  base: {
    transition: 'background .25s ease-in-out',
    position: 'sticky !important',
    top: 'var(--vkui_internal--safe_area_inset_top)',
    background: 'transparent !important',
    zIndex: '10 !important',
  } as unknown as ComplexStyleRule,
  variants: {
    onTop: {
      false: {
        background: 'rgba(255, 255, 255, 0.1) !important',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
    },
    isIOS: {
      true: {
        top: 0,
      },
    },
  },
});
