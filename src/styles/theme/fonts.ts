const createFontStyle = (family: string, weight: number, size: number, lineHeight: number) => `
  font-family: "${family}";
  font-weight: ${weight};
  font-size: ${size}px;
  line-height: ${lineHeight}%;
  letter-spacing: 0;
`;

const createFontStyleNew = (family: string, weight: number, size: number, lineHeight: number) => `
  font-family: "${family}";
  font-weight: ${weight};
  font-size: ${size}px;
  line-height: ${lineHeight}px;
  letter-spacing: 0;
`;

export const fonts = {
  title1: createFontStyle('Pretendard', 700, 36, 145),
  title2: createFontStyle('Pretendard', 600, 32, 145),
  title3: createFontStyle('Pretendard', 600, 24, 145),
  title4: createFontStyle('Pretendard', 600, 18, 145),
  labelXXL: createFontStyle('Racing Sans One', 400, 82, 125),
  labelXL: createFontStyle('Racing Sans One', 400, 32, 125),
  labelL: createFontStyleNew('Pretendard', 400, 32, 38),
  labelM: createFontStyleNew('Pretendard', 400, 18, 29),
  labelS: createFontStyleNew('Pretendard', 500, 16, 24),
  labelXSB: createFontStyleNew('Pretendard', 600, 14, 24),
  labelXS: createFontStyleNew('Pretendard', 500, 15, 19),
  body1: createFontStyle('Pretendard', 400, 40, 145),
  body2: createFontStyle('Pretendard', 400, 28, 145),
  body3: createFontStyle('Pretendard', 400, 16, 145),
  body4: createFontStyle('Pretendard', 400, 15, 145),
  body5: createFontStyle('Pretendard', 400, 14, 145),
  caption: createFontStyle('Pretendard', 400, 12, 145),
};

export type FontsType = typeof fonts;
