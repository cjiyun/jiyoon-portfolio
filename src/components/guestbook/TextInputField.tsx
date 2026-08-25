import styled from '@emotion/styled';
import type { ChangeEventHandler } from 'react';
import { FormLabel } from '@/components/guestbook/FormLabel';

type TextInputFieldProps = {
  id: string;
  label: string;
  value: string;
  maxLength: number;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isRequired?: boolean;
};

export const TextInputField = ({
  id,
  label,
  value,
  maxLength,
  placeholder,
  onChange,
  isRequired,
}: TextInputFieldProps) => {
  return (
    <FieldContainer>
      <FormLabel htmlFor={id} label={label} isRequired={isRequired} />

      <InputContainer>
        <TextInput
          id={id}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          placeholder={placeholder}
        />
        <TextLength>{`${value.length}/${maxLength}`}</TextLength>
      </InputContainer>
    </FieldContainer>
  );
};

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 63px;
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.background.bg2};
  padding: 8px 12px;
  gap: 8px;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.border.border2};
    background-color: ${({ theme }) => theme.colors.background.bg1};
  }
`;

const TextInput = styled.input`
  width: 100%;
  border: 0;
  outline: none;
  background: transparent;
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text1};
  padding: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.text5};
    opacity: 1;
  }
`;

const TextLength = styled.div`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text.text5};
`;
