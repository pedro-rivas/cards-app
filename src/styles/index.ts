//https://dribbble.com/shots/16052807-e-Book-Reader-App

const palette = {
  yellow: '#fcc00e',
  orange: '#f9784b',
  white: '#fdfdfd',
  black: '#161616',
  green: '#65d465',
};

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.yellow,
    secondary: palette.orange,
    success: palette.green,
    startActive: '#f8d218',
    startInactive: '#494b4f',
    blue: '#3ab8eb',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  textVariants: {
    bold: '',
    regular: '',
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
  },
};
