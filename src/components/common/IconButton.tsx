import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { type HTMLMotionProps, motion } from 'framer-motion';
import { iconVariants } from '@/animations/variants';

type IconButtonBaseProps = {
  children: ReactNode;
};

type IconButtonLinkProps = Omit<HTMLMotionProps<'a'>, 'children' | 'href'> & {
  href: string;
};

type IconButtonActionProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  href?: never;
};

type IconButtonProps = IconButtonBaseProps & (IconButtonLinkProps | IconButtonActionProps);

const isLinkIconButtonProps = (
  props: IconButtonLinkProps | IconButtonActionProps
): props is IconButtonLinkProps => {
  return typeof props.href === 'string';
};

export const IconButton = ({ children, ...props }: IconButtonProps) => {
  if (isLinkIconButtonProps(props)) {
    const { target, rel, ...linkProps } = props;
    const safeRel = target === '_blank' ? (rel ?? 'noopener noreferrer') : rel;

    return (
      <IconButtonLink
        {...linkProps}
        target={target}
        rel={safeRel}
        initial="rest"
        animate="rest"
        variants={iconVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {children}
      </IconButtonLink>
    );
  }

  const { type = 'button', disabled, ...buttonProps } = props;

  return (
    <IconButtonAction
      {...buttonProps}
      type={type}
      disabled={disabled}
      initial="rest"
      animate="rest"
      variants={iconVariants}
      whileHover={disabled ? undefined : 'hover'}
      whileTap={disabled ? undefined : 'tap'}
    >
      {children}
    </IconButtonAction>
  );
};

const iconButtonStyle = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 10px;
  padding: 0;
  text-decoration: none;

  svg {
    display: block;
    width: 24px;
    height: 24px;
  }
`;

const IconButtonLink = styled(motion.a)`
  ${iconButtonStyle};
  color: ${({ theme }) => theme.colors.text.text1};
  background: ${({ theme }) => theme.colors.background.bg3};

  &:hover {
    color: ${({ theme }) => theme.colors.text.textW};
    background: ${({ theme }) => theme.colors.gradient.button};
    box-shadow: ${({ theme }) => theme.shadows.elev2};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
    outline-offset: 3px;
  }
`;

const IconButtonAction = styled(motion.button)`
  ${iconButtonStyle};
  color: ${({ theme }) => theme.colors.text.text1};
  background: ${({ theme }) => theme.colors.background.bg3};

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.text.textW};
    background: ${({ theme }) => theme.colors.gradient.button};
    box-shadow: ${({ theme }) => theme.shadows.elev2};
  }
`;
