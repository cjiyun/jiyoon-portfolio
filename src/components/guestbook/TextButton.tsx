import styled from '@emotion/styled';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type TextButtonVariant = 'primary' | 'secondary' | 'destructive';

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: TextButtonVariant;
};

export const TextButton = ({
  children,
  variant = 'primary',
  type = 'button',
  ...props
}: TextButtonProps) => {
  return (
    <TextButtonContainer type={type} $variant={variant} {...props}>
      {children}
    </TextButtonContainer>
  );
};

const TextButtonContainer = styled.button<{ $variant: TextButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 46px;
  ${({ theme }) => theme.fonts.labelXS};
  color: ${({ theme, $variant }) =>
    $variant === 'secondary' ? theme.colors.text.text1 : theme.colors.text.textW};
  background-color: ${({ theme, $variant }) =>
    $variant === 'primary'
      ? theme.colors.brand.primary
      : $variant === 'destructive'
        ? theme.colors.semantic.error
        : theme.colors.background.bg2};
  border-radius: 8px;
  padding: 10px 12px;

  &:not(:disabled):hover {
    background-color: ${({ theme, $variant }) =>
      $variant === 'primary'
        ? theme.colors.brand.accent
        : $variant === 'destructive'
          ? theme.colors.semantic.errorAccent
          : theme.colors.background.hover};
  }
`;
