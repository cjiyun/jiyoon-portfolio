import styled from '@emotion/styled';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return <SectionTitle>{title}</SectionTitle>;
};

export default SectionHeader;

const SectionTitle = styled.h2`
  ${({ theme }) => theme.fonts.title1};
  color: ${({ theme }) => theme.colors.brand.primary};
`;
