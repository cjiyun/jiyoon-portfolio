import styled from '@emotion/styled';
import type { ReactNode } from 'react';

type IconProps = {
  icon: ReactNode;
  color?: string;
  size?: string;
};

export const Icon = ({ icon, color = 'inherit', size = '24px' }: IconProps) => {
  return (
    <IconContainer $color={color} $size={size} aria-hidden>
      {icon}
    </IconContainer>
  );
};

const IconContainer = styled.span<{ $color: string; $size: string }>`
  display: inline-flex;
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  color: ${({ $color }) => $color};

  svg {
    width: 100%;
    height: 100%;
  }
`;
