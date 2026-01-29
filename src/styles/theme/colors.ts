export const lightColors = {
  brand: {
    primary: '#082C78',
    soft: '#082C78',
  },
  text: {
    text1: '#1D1D1D',
    text2: '#333333',
    text3: '#4D4D4D',
    text4: '#666666',
  },
  background: {
    bg1: '#FFFFFF',
    bg2: '#F7F7F7',
  },
  divider: {
    divider1: '#F2F2F2',
    divider2: '#CCCCCC',
  },
  semantic: {
    success: '#0094F7',
    warning: '#E7CD3F',
    error: '#FF2C3D',
  },
  neutral: {
    neutral1100: '#000000',
    neutral1000: '#1D1D1D',
    neutral900: '#333333',
    neutral800: '#4D4D4D',
    neutral700: '#666666',
    neutral600: '#808080',
    neutral500: '#999999',
    neutral400: '#B2B2B2',
    neutral300: '#CCCCCC',
    neutral200: '#E6E6E6',
    neutral100: '#F2F2F2',
    neutral50: '#F7F7F7',
    neutral0: '#FFFFFF',
  },
  blue: {
    blue900: '#04163C',
    blue700: '#082C78',
    blue500: '#1E51D4',
    blue300: '#5E8BFF',
    blue100: '#A3BEFF',
  },
} as const;

export const darkColors = {
  brand: {
    primary: '#1E51D4',
    soft: '#5E8BFF',
  },
  text: {
    text1: '#E6E6E6',
    text2: '#CCCCCC',
    text3: '#B2B2B2',
    text4: '#999999',
  },
  background: {
    bg1: '#1F1F1F',
    bg2: '#2D2D2D',
  },
  divider: {
    divider1: '#4D4D4D',
    divider2: '#666666',
  },
  semantic: {
    success: '#0094F7',
    warning: '#E7CD3F',
    error: '#FF4C00',
  },
  blue: {
    blue900: '#082C78',
    blue700: '#1E51D4',
    blue500: '#5E8BFF',
    blue300: '#A3BEFF',
  },
} as const;

export type ColorsType = typeof lightColors;
