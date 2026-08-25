import styled from '@emotion/styled';
import type { ReactNode } from 'react';

type IconProps = {
  icon: ReactNode;
  color?: string;
  size?: number;
};

export const Icon = ({ icon, color = 'inherit', size = 24 }: IconProps) => {
  return (
    <IconContainer $color={color} $size={size} aria-hidden>
      {icon}
    </IconContainer>
  );
};

const IconContainer = styled.span<{ $color: string; $size: number }>`
  display: inline-flex;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  color: ${({ $color }) => $color};

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
`;
