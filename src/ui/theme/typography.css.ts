import { recipe } from '@vanilla-extract/recipes';
import { vars } from './theme.css';

export const typography = recipe({
  base: {
    fontFamily: vars.fonts.family,
    margin: 0,
  },
  variants: {
    variant: {
      head: {
        fontSize: '23px',
        lineHeight: '22px',
        fontWeight: 700,
        letterSpacing: '0.25px',
      },
      subHead: {
        fontSize: '20px',
        lineHeight: '22px',
        fontWeight: 600,
        letterSpacing: '0.25px',
      },
      body: {
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: '22px',
        letterSpacing: '0.35px',
      },
      caption: {
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: '20px',
        letterSpacing: '-0.25px',
      },
      tertiary: {
        fontWeight: 500,
        fontSize: '15px',
        lineHeight: '22px',
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
  },
});
