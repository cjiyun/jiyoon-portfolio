import '@emotion/react';

declare module '@emotion/react' {
  import type { ColorsType } from '@/styles/theme/colors';
  import type { FontsType } from '@/styles/theme/fonts';
  import type { ShadowsType } from '@/styles/theme/shadows';

  export interface Theme {
    colors: ColorsType;
    fonts: FontsType;
    shadows: ShadowsType;
  }
}
