export const lightColors = {
  brand: {
    primary: '#082C78',
    accent: '#06225D',
  },
  text: {
    text1: '#1D1D1D',
    text2: '#333333',
    text3: '#4D4D4D',
    text4: '#666666',
    text5: '#808080',
    textSoftBlue: '#527CD4',
    textW: '#E6E6E6',
  },
  background: {
    bg1: '#FFFFFF',
    bg2: '#F6F8FA',
    bg3: '#ECF0FA',
    hover: '#E4E7F1',
    disabled: '#E6E6E6',
  },
  border: {
    border1: '#CCCCCC',
    border2: '#527CD4',
  },
  divider: {
    divider1: '#F2F2F2',
    divider2: '#CCCCCC',
  },
  semantic: {
    success: '#00A63E',
    successSoft: '#DCFCE7',
    error: '#FF2C3D',
    errorAccent: '#E31222',
    errorSoft: '#FAE3E2',
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
    blue700: '#082C78',
    blue500: '#0E4ED8',
    blue400: '#0D6EFD',
    blue300: '#5789F4',
  },
  gradient: {
    card: 'linear-gradient(90deg, #5789F4 0%, #9DBDFA 38%, #CFE2FF 100%)',
    button: 'linear-gradient(90deg, #0E4ED8 0%, #5E8BFF 100%)',
  },
} as const;

export const darkColors = {
  brand: {
    primary: '#0D6EFD',
    accent: '#0E64E3',
  },
  text: {
    text1: '#E6E6E6',
    text2: '#CCCCCC',
    text3: '#B2B2B2',
    text4: '#999999',
    text5: '#808080',
    textSoftBlue: '#9DB7FF',
    textW: '#E6E6E6',
  },
  background: {
    bg1: '#212529',
    bg2: '#2F343A',
    bg3: '#384157',
    hover: '#384157',
    disabled: '#4D4D4D',
  },
  border: {
    border1: '#4D4D4D',
    border2: '#9DB7FF',
  },
  divider: {
    divider1: '#4D4D4D',
    divider2: '#666666',
  },
  semantic: {
    success: '#00A63E',
    successSoft: '#DCFCE7',
    error: '#FF2C3D',
    errorAccent: '#CF2230',
    errorSoft: '#FAE3E2',
  },
  neutral: {
    neutral100: '#000000',
    neutral200: '#1D1D1D',
    neutral300: '#333333',
    neutral400: '#4D4D4D',
    neutral500: '#666666',
    neutral600: '#808080',
    neutral700: '#999999',
    neutral800: '#B2B2B2',
    neutral900: '#CCCCCC',
    neutral1000: '#E6E6E6',
    neutral1100: '#F2F2F2',
    neutral50: '#F7F7F7',
    neutral0: '#FFFFFF',
  },
  blue: {
    blue700: '#082C78',
    blue500: '#0E4ED8',
    blue400: '#0D6EFD',
    blue300: '#5789F4',
  },
  gradient: {
    card: 'linear-gradient(90deg, #5789F4 0%, #9DBDFA 38%, #CFE2FF 100%)',
    button: 'linear-gradient(90deg, #0E4ED8 0%, #5E8BFF 100%)',
  },
} as const;

export type ColorsType = typeof lightColors;
