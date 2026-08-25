import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { getGuestbookErrorMessage } from '@/utils/getGuestbookErrorMessage';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import { TextInputField } from '@/components/guestbook/TextInputField';
import { TextAreaField } from '@/components/guestbook/TextAreaField';
import { IconButton } from '@/components/common/IconButton';
import { Loader } from '@/components/common/Loader';
import { Icon } from '@/components/common/Icon';
import { TextButton } from '@/components/guestbook/TextButton';
import { DeleteModal } from '@/components/guestbook/DeleteModal';
import type { GuestbookActionResult, GuestbookEntry, GuestbookEntryInput } from '@/types/guestbook';
import type { ToastPayload } from '@/types/toast';
import { IcPencil, IcTrash } from '@/assets/icons';
import { GUESTBOOK_CONTENT_MAX_LEN, GUESTBOOK_NAME_MAX_LEN } from '@/constants/guestbook';

type GuestbookItemProps = {
  entry: GuestbookEntry;
  now: number;
  canModify: boolean;
  onUpdate: (id: string, payload: GuestbookEntryInput) => Promise<GuestbookActionResult>;
  onDelete: (id: string) => Promise<GuestbookActionResult>;
  notify: (payload: ToastPayload) => void;
};

export const GuestbookItem = ({
  entry,
  now,
  canModify,
  onUpdate,
  onDelete,
  notify,
}: GuestbookItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(entry.name);
  const [content, setContent] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const displayName = entry.name.trim() ? entry.name.trim() : '익명';
  const timeText = formatRelativeTime(entry.createdAt, now);
  const isEdited = !!entry.editedAt && entry.editedAt > entry.createdAt;
  const hasContent = content.trim().length > 0;
  const isProcessing = isSaving || isDeleting;

  useEffect(() => {
    setName(entry.name);
    setContent(entry.content);
  }, [entry.id, entry.name, entry.content]);

  useEffect(() => {
    if (!canModify && isEditing) {
      setIsEditing(false);
    }
  }, [canModify, isEditing]);

  const handleEdit = () => {
    if (!canModify) {
      notify({ type: 'error', message: '수정 가능 시간이 지났어요.' });
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
      notify({ type: 'error', message: '수정 가능 시간이 지났어요.' });
      setIsEditing(false);
      return;
    }
    if (isProcessing) return;

    setIsSaving(true);

    try {
      const result = await onUpdate(entry.id, { name, content });

      if (!result.ok) {
        notify({ type: 'error', message: getGuestbookErrorMessage('update', result.reason) });
        return;
      }

      notify({ type: 'success', message: '방명록이 수정되었어요.' });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteClick = () => {
    if (!canModify) {
      notify({ type: 'error', message: '삭제 가능 시간이 지났어요.' });
      return;
    }

    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!canModify) {
      notify({ type: 'error', message: '삭제 가능 시간이 지났어요.' });
      return;
    }
    if (isProcessing) return;

    setIsDeleting(true);

    try {
      const result = await onDelete(entry.id);

      if (!result.ok) {
        notify({ type: 'error', message: getGuestbookErrorMessage('delete', result.reason) });
        return;
      }

      notify({ type: 'success', message: '방명록이 삭제되었어요.' });
      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <GuestbookItemContainer>
        <GuestbookItemHeader>
          <GuestbookItemMeta>
            <Meta>{`${displayName} • ${timeText}`}</Meta>
            {isEdited ? <EditedBadge>{'수정됨'}</EditedBadge> : null}
            {canModify ? <EditableBadge>{'수정 / 삭제 가능'}</EditableBadge> : null}
          </GuestbookItemMeta>

          {canModify ? (
            <GuestbookItemActions>
              <IconButton onClick={handleEdit} aria-label="수정">
                <Icon icon={<IcPencil />} size={18} />
              </IconButton>
              <IconButton
                onClick={handleDeleteClick}
                disabled={isProcessing}
                aria-label={isDeleting ? '방명록 삭제 중' : '삭제'}
              >
                {isDeleting ? <Loader size={18} /> : <Icon icon={<IcTrash />} size={18} />}
              </IconButton>
            </GuestbookItemActions>
          ) : null}
        </GuestbookItemHeader>

        {isEditing ? (
          <EditFormArea>
            <TextInputField
              id={`guestbook-edit-name-${entry.id}`}
              label="이름"
              value={name}
              maxLength={GUESTBOOK_NAME_MAX_LEN}
              onChange={e => setName(e.target.value)}
              placeholder="이름이나 별명을 입력해주세요."
            />

            <TextAreaField
              id={`guestbook-edit-content-${entry.id}`}
              label="내용"
              value={content}
              maxLength={GUESTBOOK_CONTENT_MAX_LEN}
              onChange={e => setContent(e.target.value)}
              placeholder="내용을 입력해주세요."
              isRequired
            />

            <EditButtons>
              <TextButton
                type="button"
                variant="secondary"
                onClick={handleCancel}
                disabled={isProcessing}
              >
                취소
              </TextButton>
              <TextButton
                type="button"
                onClick={handleSave}
                disabled={!hasContent || isProcessing}
                aria-label={isSaving ? '방명록 저장 중' : undefined}
              >
                {isSaving ? <Loader size={16} /> : '저장'}
              </TextButton>
            </EditButtons>
          </EditFormArea>
        ) : (
          <GuestbookItemContent>{entry.content}</GuestbookItemContent>
        )}
      </GuestbookItemContainer>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

const GuestbookItemContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.border1};
`;

const GuestbookItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const GuestbookItemMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Meta = styled.span`
  margin-right: 12px;
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text3};
`;

const EditedBadge = styled.span`
  margin-right: 12px;
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text5};
`;

const EditableBadge = styled.span`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text.text5};
`;

const GuestbookItemActions = styled.div`
  display: inline-flex;
  gap: 6px;
  flex: 0 0 auto;
`;

const GuestbookItemContent = styled.p`
  ${({ theme }) => theme.fonts.body4};
  color: ${({ theme }) => theme.colors.text.text1};
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const EditFormArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EditButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
