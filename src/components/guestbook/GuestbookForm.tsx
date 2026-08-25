import styled from '@emotion/styled';
import { type FormEvent, useState } from 'react';
import { getGuestbookErrorMessage } from '@/utils/getGuestbookErrorMessage';
import { TextInputField } from '@/components/guestbook/TextInputField';
import { TextAreaField } from '@/components/guestbook/TextAreaField';
import { Icon } from '@/components/common/Icon';
import { Loader } from '@/components/common/Loader';
import type { GuestbookActionResult, GuestbookEntryInput } from '@/types/guestbook';
import type { ToastPayload } from '@/types/toast';
import { IcSend } from '@/assets/icons';
import { GUESTBOOK_CONTENT_MAX_LEN, GUESTBOOK_NAME_MAX_LEN } from '@/constants/guestbook';

type GuestbookFormProps = {
  onCreate: (payload: GuestbookEntryInput) => Promise<GuestbookActionResult>;
  notify: (payload: ToastPayload) => void;
};

export const GuestbookForm = ({ onCreate, notify }: GuestbookFormProps) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasContent = content.trim().length > 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const result = await onCreate({ name, content });

      if (!result.ok) {
        notify({ type: 'error', message: getGuestbookErrorMessage('create', result.reason) });
        return;
      }

      notify({ type: 'success', message: '방명록이 등록되었어요 :)' });
      setName('');
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GuestbookFormCard aria-label="방명록 등록">
      <GuestbookFormTitle>{'방명록 남기기'}</GuestbookFormTitle>

      <GuestbookFormBody onSubmit={handleSubmit}>
        <TextInputField
          id="guestbook-name"
          label="이름"
          value={name}
          maxLength={GUESTBOOK_NAME_MAX_LEN}
          onChange={e => setName(e.target.value)}
          placeholder="이름이나 별명을 입력해주세요."
        />

        <TextAreaField
          id="guestbook-content"
          label="내용"
          value={content}
          maxLength={GUESTBOOK_CONTENT_MAX_LEN}
          onChange={e => setContent(e.target.value)}
          placeholder="생각을 공유하거나 인사를 남겨주세요."
          isRequired
        />

        <SubmitButton
          type="submit"
          disabled={!hasContent || isSubmitting}
          aria-label={isSubmitting ? '방명록 등록 중' : undefined}
        >
          {isSubmitting ? (
            <LoaderWrapper>
              <Loader size={18} />
            </LoaderWrapper>
          ) : (
            <>
              <Icon icon={<IcSend />} />
              {'등록'}
            </>
          )}
        </SubmitButton>
      </GuestbookFormBody>
    </GuestbookFormCard>
  );
};

const GuestbookFormCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.background.bg2};
  box-shadow: ${({ theme }) => theme.shadows.elev1};
  padding: 20px;
  gap: 40px;
`;

const GuestbookFormTitle = styled.h2`
  ${({ theme }) => theme.fonts.title3};
  color: ${({ theme }) => theme.colors.text.text1};
`;

const GuestbookFormBody = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${({ theme }) => theme.fonts.labelXS};
  color: ${({ theme }) => theme.colors.text.textW};
  background-color: ${({ theme }) => theme.colors.brand.primary};
  border-radius: 10px;
  padding: 12px 0;
  gap: 10px;

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.brand.accent};
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
`;
