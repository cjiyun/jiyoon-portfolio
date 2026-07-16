import * as React from 'react';
import styled from '@emotion/styled';
import type { GuestbookEntry, GuestbookActionResult } from '@/types/guestbook';
import { formatRelativeTime } from '@/utils/formatRelativeTime';

const NAME_MAX_LEN = 10;
const CONTENT_MAX_LEN = 30;

type GuestbookItemProps = {
  entry: GuestbookEntry;
  now: number;
  canModify: boolean;
  onUpdate: (
    id: string,
    payload: { name?: string; content: string }
  ) => Promise<GuestbookActionResult>;
  onDelete: (id: string) => Promise<GuestbookActionResult>;
  notify: (payload: { kind: 'success' | 'error' | 'info'; message: string }) => void;
};

export const GuestbookItem = ({
  entry,
  now,
  canModify,
  onUpdate,
  onDelete,
  notify,
}: GuestbookItemProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState(entry.name);
  const [content, setContent] = React.useState(entry.content);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    setName(entry.name);
    setContent(entry.content);
  }, [entry.id, entry.name, entry.content]);

  React.useEffect(() => {
    if (!canModify && isEditing) setIsEditing(false);
  }, [canModify, isEditing]);

  const displayName = entry.name.trim() ? entry.name.trim() : '익명';
  const timeText = formatRelativeTime(entry.createdAt, now);
  const isEdited = !!entry.editedAt && entry.editedAt > entry.createdAt;

  const handleEdit = () => {
    if (!canModify) {
      notify({ kind: 'error', message: '수정 가능 시간이 지났어요.' });
      return;
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(entry.name);
    setContent(entry.content);
  };

  const handleSave = async () => {
    if (!canModify) {
      notify({ kind: 'error', message: '수정 가능 시간이 지났어요.' });
      setIsEditing(false);
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    const result = await onUpdate(entry.id, { name, content });
    setIsSubmitting(false);

    if (!result.ok) {
      if (result.reason === 'empty') notify({ kind: 'error', message: '내용을 입력해주세요.' });
      else if (result.reason === 'expired')
        notify({ kind: 'error', message: '수정 가능 시간이 지났어요.' });
      else if (result.reason === 'unauthorized')
        notify({ kind: 'error', message: '수정 권한이 없어요.' });
      else if (result.reason === 'network')
        notify({ kind: 'error', message: '네트워크 오류가 발생했어요.' });
      else notify({ kind: 'error', message: '수정에 실패했어요.' });
      return;
    }

    notify({ kind: 'success', message: '수정이 반영됐어요.' });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!canModify) {
      notify({ kind: 'error', message: '삭제 가능 시간이 지났어요.' });
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    const result = await onDelete(entry.id);
    setIsSubmitting(false);

    if (!result.ok) {
      if (result.reason === 'expired')
        notify({ kind: 'error', message: '삭제 가능 시간이 지났어요.' });
      else if (result.reason === 'unauthorized')
        notify({ kind: 'error', message: '삭제 권한이 없어요.' });
      else if (result.reason === 'network')
        notify({ kind: 'error', message: '네트워크 오류가 발생했어요.' });
      else notify({ kind: 'error', message: '삭제에 실패했어요.' });
      return;
    }

    notify({ kind: 'success', message: '삭제됐어요.' });
  };

  return (
    <ItemWrap>
      <TopRow>
        <Meta>
          <MetaName>{displayName}</MetaName>
          <MetaDot aria-hidden>{'•'}</MetaDot>
          <MetaTime>{timeText}</MetaTime>
          {isEdited ? <MetaEdited>{'수정됨'}</MetaEdited> : null}
          {canModify ? <MetaBadge>{'수정·삭제 가능'}</MetaBadge> : null}
        </Meta>

        {canModify ? (
          <Actions>
            <IconButton
              type="button"
              onClick={handleEdit}
              aria-label="수정"
              disabled={isSubmitting}
            >
              <IcEdit />
            </IconButton>
            <IconButton
              type="button"
              onClick={handleDelete}
              aria-label="삭제"
              disabled={isSubmitting}
            >
              <IcTrash />
            </IconButton>
          </Actions>
        ) : null}
      </TopRow>

      {isEditing ? (
        <EditArea>
          <EditField>
            <EditLabel>{'이름'}</EditLabel>
            <EditInput
              value={name}
              onChange={e => setName(e.target.value.slice(0, NAME_MAX_LEN))}
              placeholder="이름(선택)"
            />
            <Count>{`${Math.min(name.length, NAME_MAX_LEN)}/${NAME_MAX_LEN}`}</Count>
          </EditField>

          <EditField>
            <EditLabel>{'내용 *'}</EditLabel>
            <EditTextArea
              value={content}
              onChange={e => setContent(e.target.value.slice(0, CONTENT_MAX_LEN))}
              placeholder="내용을 입력해주세요."
            />
            <Count>{`${Math.min(content.length, CONTENT_MAX_LEN)}/${CONTENT_MAX_LEN}`}</Count>
          </EditField>

          <EditButtons>
            <SubButton type="button" onClick={handleCancel} disabled={isSubmitting}>
              {'취소'}
            </SubButton>
            <PrimaryButton
              type="button"
              onClick={handleSave}
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? '저장 중...' : '저장'}
            </PrimaryButton>
          </EditButtons>
        </EditArea>
      ) : (
        <Content>{entry.content}</Content>
      )}
    </ItemWrap>
  );
};

const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 6px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.border1};
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
`;

const MetaName = styled.span`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text.text1};
  font-weight: 700;
`;

const MetaDot = styled.span`
  color: ${({ theme }) => theme.colors.text.text2};
`;

const MetaTime = styled.span`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text.text2};
`;

const MetaEdited = styled.span`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text.text2};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  border-radius: 999px;
  padding: 2px 8px;
`;

const MetaBadge = styled.span`
  margin-left: 6px;
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.brand.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.border2};
  border-radius: 999px;
  padding: 2px 8px;
`;

const Actions = styled.div`
  display: inline-flex;
  gap: 6px;
  flex: 0 0 auto;
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  background: ${({ theme }) => theme.colors.background.bg1};
  color: ${({ theme }) => theme.colors.text.text2};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    border-color: ${({ theme }) => theme.colors.border.border2};
    box-shadow: ${({ theme }) => theme.shadows.elev2};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Content = styled.p`
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text1};
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const EditArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EditField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const EditLabel = styled.span`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text.text2};
`;

const EditInput = styled.input`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  background: ${({ theme }) => theme.colors.background.bg1};
  color: ${({ theme }) => theme.colors.text.text1};
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.border2};
    box-shadow: ${({ theme }) => theme.shadows.elev2};
  }
`;

const EditTextArea = styled.textarea`
  width: 100%;
  min-height: 92px;
  resize: none;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  background: ${({ theme }) => theme.colors.background.bg1};
  color: ${({ theme }) => theme.colors.text.text1};
  padding: 10px 12px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.border.border2};
    box-shadow: ${({ theme }) => theme.shadows.elev2};
  }
`;

const Count = styled.div`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text.text2};
`;

const EditButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const SubButton = styled.button`
  border-radius: 10px;
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  background: ${({ theme }) => theme.colors.background.bg1};
  color: ${({ theme }) => theme.colors.text.text1};
  ${({ theme }) => theme.fonts.caption};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    border-color: ${({ theme }) => theme.colors.border.border2};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled.button`
  border-radius: 10px;
  padding: 8px 10px;
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.brand.primary};
  color: #fff;
  ${({ theme }) => theme.fonts.caption};

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const IcEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const IcTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M6 6l1 16h10l1-16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
