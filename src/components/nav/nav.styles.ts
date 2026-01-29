import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const MenuLabel = styled(motion.span)<{ $active: boolean }>`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${({ theme }) => theme.fonts.labelM};
  font-weight: 400;
  color: ${({ theme, $active }) => ($active ? theme.colors.blue.blue500 : theme.colors.text.text1)};

  &:hover {
    color: ${({ theme }) => theme.colors.blue.blue300};
  }

  @media (max-width: 1440px) {
    ${({ theme }) => theme.fonts.labelS};
  }

  @media (max-width: 820px) {
    ${({ theme }) => theme.fonts.labelXS};
  }
`;

export const ActiveHighlight = styled(motion.span)`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(0);
  height: 50%;
  border-radius: 10px;
  background-color: color-mix(
    in srgb,
    ${({ theme }) => theme.colors.blue.blue500} 25%,
    transparent
  );
  z-index: -1;
`;

export const ThemeChip = styled(motion.button)<{ $bg: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ $bg }) => $bg};
  transition: background-color 350ms;

  @media (max-width: 1440px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 820px) {
    width: 30px;
    height: 30px;
    margin-top: 10px;
  }
`;
