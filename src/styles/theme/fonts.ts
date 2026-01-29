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
  title1: createFontStyle('Racing Sans One', 400, 36, 145),
  title2: createFontStyle('Pretendard', 600, 32, 145),
  title3: createFontStyle('Pretendard', 600, 24, 145),
  labelXXL: createFontStyleNew('Racing Sans One', 400, 96, 121),
  labelXL: createFontStyleNew('Racing Sans One', 400, 48, 60),
  labelLB: createFontStyleNew('Pretendard', 800, 32, 38),
  labelL: createFontStyleNew('Pretendard', 400, 32, 38),
  labelM: createFontStyleNew('Pretendard', 400, 24, 29),
  labelS: createFontStyleNew('Pretendard', 500, 20, 24),
  labelXSB: createFontStyleNew('Pretendard', 500, 16, 24),
  labelXS: createFontStyleNew('Pretendard', 400, 16, 19),
  body1: createFontStyle('Pretendard', 800, 40, 145),
  body2: createFontStyle('Pretendard', 400, 36, 145),
  body3: createFontStyle('Pretendard', 600, 20, 145),
  body4: createFontStyle('Pretendard', 400, 20, 145),
  body5: createFontStyle('Pretendard', 600, 16, 145),
  body6: createFontStyle('Pretendard', 400, 16, 145),
  caption: createFontStyle('Pretendard', 400, 14, 145),
};

export type FontsType = typeof fonts;
