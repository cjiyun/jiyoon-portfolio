import styled from '@emotion/styled';
import { type FormEvent, useState } from 'react';
import type { GuestbookActionResult } from '@/types/guestbook';
import { Icon } from '@/components/common/Icon';
import IcSend from '@/assets/icons/ic-send.svg?react';
import { Loader } from '@/components/common/Loader';

const NAME_MAX_LEN = 10;
const CONTENT_MAX_LEN = 30;

type GuestbookFormProps = {
  onCreate: (payload: { name?: string; content: string }) => Promise<GuestbookActionResult>;
  notify: (payload: { kind: 'success' | 'error' | 'info'; message: string }) => void;
};

export const GuestbookForm = ({ onCreate, notify }: GuestbookFormProps) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = content.trim().length > 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const result = await onCreate({ name, content });
    setIsSubmitting(false);

    if (!result.ok) {
      if (result.reason === 'empty') notify({ kind: 'error', message: '❌ 내용을 입력해주세요.' });
      else if (result.reason === 'network')
        notify({ kind: 'error', message: '❌ 네트워크 오류가 발생했어요.' });
      else notify({ kind: 'error', message: '❌ 등록에 실패했어요.' });
      return;
    }

    notify({ kind: 'success', message: '✅ 방명록이 등록됐어요 :)' });
    setName('');
    setContent('');
  };

  return (
    <FormCard aria-label="방명록 등록">
      <FormTitle>{'방명록 남기기'}</FormTitle>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>{'이름'}</Label>
          <TextInput
            value={name}
            onChange={e => setName(e.target.value.slice(0, NAME_MAX_LEN))}
            placeholder="이름이나 별명을 입력해주세요."
          />
          <TextLength>{`${Math.min(name.length, NAME_MAX_LEN)}/${NAME_MAX_LEN}`}</TextLength>
        </Field>

        <Field>
          <Label>
            {'내용'}
            <RequiredMark>{'*'}</RequiredMark>
          </Label>
          <TextArea
            value={content}
            onChange={e => setContent(e.target.value.slice(0, CONTENT_MAX_LEN))}
            placeholder="생각을 공유하거나 인사를 남겨주세요."
          />
          <TextLength>{`${Math.min(content.length, CONTENT_MAX_LEN)}/${CONTENT_MAX_LEN}`}</TextLength>
        </Field>

        <SubmitButton type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          ) : (
            <>
              <Icon icon={<IcSend />} />
              {'등록'}
            </>
          )}
        </SubmitButton>
      </Form>
    </FormCard>
  );
};

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background.bg1};
  box-shadow: ${({ theme }) => theme.shadows.elev1};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  padding: 20px;
  gap: 40px;
`;

const FormTitle = styled.h2`
  ${({ theme }) => theme.fonts.title3};
  color: ${({ theme }) => theme.colors.text.text1};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  display: flex;
  ${({ theme }) => theme.fonts.labelXS};
  color: ${({ theme }) => theme.colors.text.text1};
  gap: 4px;
`;

const RequiredMark = styled.span`
  color: ${({ theme }) => theme.colors.semantic.error};
`;

const TextInput = styled.input`
  width: 100%;
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text1};
  background-color: ${({ theme }) => theme.colors.background.bg2};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.border2};
    background-color: ${({ theme }) => theme.colors.background.bg1};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  resize: none;
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text1};
  background-color: ${({ theme }) => theme.colors.background.bg2};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.border2};
    background-color: ${({ theme }) => theme.colors.background.bg1};
  }
`;

const TextLength = styled.div`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text.text5};
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${({ theme }) => theme.fonts.labelXS};
  color: ${({ theme }) => theme.colors.text.textW};
  background-color: ${({ theme }) => theme.colors.brand.primary};
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 10px 0;
  gap: 10px;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
`;
