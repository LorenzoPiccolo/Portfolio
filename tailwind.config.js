// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        light: '#f4f4f4',
        dark: '#181818',
        primary: '#EF4E16',
        gray100: '#F0F0F0',
        gray150: '#E5E7EB',
        gray200: '#CFCFCF',
        gray300: '#ADADAD',
        gray400: '#7F7F7F',
        gray500: '#5A5A5A',
        gray600: '#484848',
        gray700: '#292929',
        gray800: '#1E1E1E',
        gray850: '#191919',
      },
      elements: {
        blurBg: '#191919/70',
        blurStroke: 'gray600',
      },
      fontFamily: {
        urbanist: ['Urbanist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        spaceg: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marqueeLeft: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marqueeLeft: 'marqueeLeft 10s linear infinite',
      },
    },
  },
  plugins: [],
};
