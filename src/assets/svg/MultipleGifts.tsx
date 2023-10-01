import { CSSProperties, memo } from 'react';

type Props = {
  className?: string;
  style?: CSSProperties;
};

export const MultipleGifts = memo<Props>(({ className = '', style = {} }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <g clipPath="url(#clip0_76_945)">
        <rect y="4" width="40" height="40" rx="20" fill="white" fillOpacity="0.1" />
        <g opacity="0.5">
          <path
            d="M4 27V29.7951C4 30.9095 3.88397 31.3137 3.66608 31.7211C3.4482 32.1285 3.12847 32.4482 2.72106 32.6661C2.31365 32.884 1.90954 33 0.795143 33H-2V27H4ZM-4 27V33H-6.79514C-7.90954 33 -8.31365 32.884 -8.72106 32.6661C-9.12846 32.4482 -9.4482 32.1285 -9.66608 31.7211C-9.86944 31.3408 -9.98408 30.9634 -9.99846 30.0088L-10 29.7951V27H-4ZM3.68405 20C4.27805 20 4.65092 20.0928 4.97684 20.2671C5.30277 20.4414 5.55856 20.6972 5.73287 21.0232C5.90718 21.3491 6 21.722 6 22.316V23.7181C6 24.1638 5.95359 24.3255 5.86643 24.4884C5.77928 24.6514 5.65138 24.7793 5.48842 24.8664C5.32546 24.9536 5.16382 25 4.71806 25H-2V20H3.68405ZM-4 20V25H-10.7181C-11.1638 25 -11.3255 24.9536 -11.4884 24.8664C-11.6514 24.7793 -11.7793 24.6514 -11.8664 24.4884C-11.9427 24.3458 -11.9878 24.2043 -11.9978 23.8725L-12 23.7181V22.316C-12 21.722 -11.9072 21.3491 -11.7329 21.0232C-11.5586 20.6972 -11.3028 20.4414 -10.9768 20.2671C-10.6917 20.1146 -10.3705 20.0245 -9.89677 20.0043L-9.68405 20H-4ZM2.3 14.7C3.87143 16.2714 2.54904 19.965 -2.70927 20.0017L-3 20C-8.5 20.1 -9.9 16.3 -8.3 14.7C-6.73806 13.1381 -3.07955 14.4351 -2.9994 19.6144C-2.92045 14.4351 0.738061 13.1381 2.3 14.7Z"
            fill="white"
          />
        </g>
        <path
          d="M27 27V29.7951C27 30.9095 26.884 31.3137 26.6661 31.7211C26.4482 32.1285 26.1285 32.4482 25.7211 32.6661C25.3137 32.884 24.9095 33 23.7951 33H21V27H27ZM19 27V33H16.2049C15.0905 33 14.6864 32.884 14.2789 32.6661C13.8715 32.4482 13.5518 32.1285 13.3339 31.7211C13.1306 31.3408 13.0159 30.9634 13.0015 30.0088L13 29.7951V27H19ZM26.684 20C27.278 20 27.6509 20.0928 27.9768 20.2671C28.3028 20.4414 28.5586 20.6972 28.7329 21.0232C28.9072 21.3491 29 21.722 29 22.316V23.7181C29 24.1638 28.9536 24.3255 28.8664 24.4884C28.7793 24.6514 28.6514 24.7793 28.4884 24.8664C28.3255 24.9536 28.1638 25 27.7181 25H21V20H26.684ZM19 20V25H12.2819C11.8362 25 11.6745 24.9536 11.5116 24.8664C11.3486 24.7793 11.2207 24.6514 11.1336 24.4884C11.0573 24.3458 11.0122 24.2043 11.0022 23.8725L11 23.7181V22.316C11 21.722 11.0928 21.3491 11.2671 21.0232C11.4414 20.6972 11.6972 20.4414 12.0232 20.2671C12.3083 20.1146 12.6295 20.0245 13.1032 20.0043L13.316 20H19ZM25.3 14.7C26.8714 16.2714 25.549 19.965 20.2907 20.0017L20 20C14.5 20.1 13.1 16.3 14.7 14.7C16.2619 13.1381 19.9205 14.4351 20.0006 19.6144C20.0795 14.4351 23.7381 13.1381 25.3 14.7Z"
          fill="white"
        />
        <g opacity="0.5">
          <path
            d="M50 27V29.7951C50 30.9095 49.884 31.3137 49.6661 31.7211C49.4482 32.1285 49.1285 32.4482 48.7211 32.6661C48.3137 32.884 47.9095 33 46.7951 33H44V27H50ZM42 27V33H39.2049C38.0905 33 37.6864 32.884 37.2789 32.6661C36.8715 32.4482 36.5518 32.1285 36.3339 31.7211C36.1306 31.3408 36.0159 30.9634 36.0015 30.0088L36 29.7951V27H42ZM49.684 20C50.278 20 50.6509 20.0928 50.9768 20.2671C51.3028 20.4414 51.5586 20.6972 51.7329 21.0232C51.9072 21.3491 52 21.722 52 22.316V23.7181C52 24.1638 51.9536 24.3255 51.8664 24.4884C51.7793 24.6514 51.6514 24.7793 51.4884 24.8664C51.3255 24.9536 51.1638 25 50.7181 25H44V20H49.684ZM42 20V25H35.2819C34.8362 25 34.6745 24.9536 34.5116 24.8664C34.3486 24.7793 34.2207 24.6514 34.1336 24.4884C34.0573 24.3458 34.0122 24.2043 34.0022 23.8725L34 23.7181V22.316C34 21.722 34.0928 21.3491 34.2671 21.0232C34.4414 20.6972 34.6972 20.4414 35.0232 20.2671C35.3083 20.1146 35.6295 20.0245 36.1032 20.0043L36.316 20H42ZM48.3 14.7C49.8714 16.2714 48.549 19.965 43.2907 20.0017L43 20C37.5 20.1 36.1 16.3 37.7 14.7C39.2619 13.1381 42.9205 14.4351 43.0006 19.6144C43.0795 14.4351 46.7381 13.1381 48.3 14.7Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_76_945">
          <rect y="4" width="40" height="40" rx="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
});
