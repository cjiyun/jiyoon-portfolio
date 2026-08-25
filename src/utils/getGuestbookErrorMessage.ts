import type { GuestbookActionFailReason } from '@/types/guestbook';

type GuestbookActionType = 'create' | 'update' | 'delete';

const DEFAULT_ERROR_MESSAGE: Record<GuestbookActionType, string> = {
  create: '등록에 실패했어요.',
  update: '수정에 실패했어요.',
  delete: '삭제에 실패했어요.',
};

export const getGuestbookErrorMessage = (
  action: GuestbookActionType,
  reason: GuestbookActionFailReason
) => {
  if (reason === 'empty') return '내용을 입력해주세요.';
  if (reason === 'invalid') return '입력 내용을 확인해주세요.';
  if (reason === 'network') return '네트워크 오류가 발생했어요.';

  if (reason === 'expired') {
    return action === 'delete' ? '삭제 가능 시간이 지났어요.' : '수정 가능 시간이 지났어요.';
  }

  if (reason === 'unauthorized') {
    return action === 'delete' ? '삭제 권한이 없어요.' : '수정 권한이 없어요.';
  }

  return DEFAULT_ERROR_MESSAGE[action];
};
