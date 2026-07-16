import type { ReactNode } from 'react';
import styled from '@emotion/styled';

type AboutBlockProps = {
  title: string;
  children: ReactNode;
};

const AboutBlock = ({ title, children }: AboutBlockProps) => {
  return (
    <Block>
      <Title>{title}</Title>
      {children}
    </Block>
  );
};

export default AboutBlock;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  gap: 20px;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.labelXL};
  color: ${({ theme }) => theme.colors.brand.primary};

  @media (max-width: 1440px) {
    font-size: 28px;
  }

  @media (max-width: 375px) {
    font-size: 24px;
  }
`;
