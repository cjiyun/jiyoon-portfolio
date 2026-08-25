import styled from '@emotion/styled';
import type { LabelHTMLAttributes } from 'react';

type FormLabelProps = Omit<LabelHTMLAttributes<HTMLLabelElement>, 'children'> & {
  label: string;
  isRequired?: boolean;
};

export const FormLabel = ({ label, isRequired = false, ...props }: FormLabelProps) => {
  return (
    <FormLabelContainer {...props}>
      {label}
      {isRequired && <RequiredMark aria-hidden="true">*</RequiredMark>}
    </FormLabelContainer>
  );
};

const FormLabelContainer = styled.label`
  display: flex;
  ${({ theme }) => theme.fonts.labelXS};
  color: ${({ theme }) => theme.colors.text.text1};
  gap: 4px;
`;

const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.semantic.error};
`;
