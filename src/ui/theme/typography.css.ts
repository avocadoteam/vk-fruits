import { recipe } from '@vanilla-extract/recipes';
import { vars } from './theme.css';

export const typography = recipe({
  base: {
    fontFamily: vars.fonts.family,
    margin: 0,
    color: vars.palette.white,
    fontWeight: 400,
  },
  variants: {
    variant: {
      head1: {
        fontSize: '24px',
        lineHeight: '26px',
        fontWeight: 700,
        letterSpacing: '-0.24px',
      },
      head: {
        fontSize: '22px',
        lineHeight: '26px',
        fontWeight: 700,
      },
      elo: {
        fontSize: '1rem',
        lineHeight: '20px',
        fontWeight: 700,
        letterSpacing: '-0.24px',
        color: vars.palette.warn,
      },
      small: {
        fontSize: '1rem',
        lineHeight: '19px',
      },
    },
    weight: {
      hard: {
        fontWeight: 600,
      },
      medium: {
        fontWeight: 500,
      },
      normal: {
        fontWeight: 400,
      },
      light: {
        fontWeight: 300,
      },
    },
    align: {
      center: {
        textAlign: 'center',
      },
    },
    self: {
      left: {
        alignSelf: 'flex-start',
      },
    },
    m: {
      b: {
        marginBottom: '1rem',
      },
      't.5': {
        marginTop: '.5rem',
      },
      t: {
        marginTop: '1rem',
      },
      't1.5': {
        marginTop: '1.5rem',
      },
      t3: {
        marginTop: '3rem',
      },
      t5: {
        marginTop: '5rem',
      },
      l: {
        marginLeft: '1rem',
      },
      r: {
        marginRight: '1rem',
      },
      'l.5': {
        marginLeft: '.5rem',
      },
      ta: {
        marginTop: 'auto',
      },
    },
    truncate: {
      true: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
    transform: {
      up: {
        textTransform: 'uppercase',
        fontVariant: 'all-small-caps',
      },
    },
    shadow: {
      true: {
        opacity: 0.5,
      },
    },
    color: {
      primary: {
        color: vars.palette.primary,
      },
    },
  },
});
