import styled from '@emotion/styled';
import { useRef } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { GuestbookItem } from '@/components/guestbook/GuestbookItem';
import { Loader } from '@/components/common/Loader';
import { TextButton } from '@/components/guestbook/TextButton';
import type { GuestbookActionResult, GuestbookEntry, GuestbookEntryInput } from '@/types/guestbook';
import type { ToastPayload } from '@/types/toast';

type GuestbookListPanelProps = {
  items: GuestbookEntry[];
  now: number;
  hasNextPage: boolean;
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  listError: boolean;
  canModify: (entry: GuestbookEntry) => boolean;
  onUpdate: (id: string, payload: GuestbookEntryInput) => Promise<GuestbookActionResult>;
  onDelete: (id: string) => Promise<GuestbookActionResult>;
  notify: (payload: ToastPayload) => void;
  loadNextPage: () => Promise<boolean>;
  reloadGuestbookList: () => Promise<boolean>;
};

export const GuestbookListPanel = ({
  items,
  now,
  hasNextPage,
  isInitialLoading,
  isLoadingMore,
  listError,
  canModify,
  onUpdate,
  onDelete,
  notify,
  loadNextPage,
  reloadGuestbookList,
}: GuestbookListPanelProps) => {
  const guestbookScrollAreaRef = useRef<HTMLDivElement | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  const hasEntries = items.length > 0;
  const shouldShowEmptyMessage = !hasEntries && !isInitialLoading && !listError;

  useInfiniteScroll({
    rootRef: guestbookScrollAreaRef,
    targetRef: loadMoreTriggerRef,
    enabled: hasNextPage && !isInitialLoading && !isLoadingMore && !listError,
    onIntersect: () => {
      void loadNextPage();
    },
  });

  return (
    <GuestbookListCard aria-label="방명록 목록">
      <GuestbookScrollArea ref={guestbookScrollAreaRef}>
        {listError ? (
          <ErrorState role="alert">
            <ErrorTitle>{'방명록을 불러오지 못했어요.'}</ErrorTitle>
            <ErrorDescription>{'잠시 후 다시 시도해주세요.'}</ErrorDescription>
            <TextButton
              type="button"
              onClick={() => void reloadGuestbookList()}
              disabled={isInitialLoading}
            >
              {'다시 불러오기'}
            </TextButton>
          </ErrorState>
        ) : shouldShowEmptyMessage ? (
          <EmptyMessage>{'아직 방명록이 없어요. 첫 메시지를 남겨주세요 :)'}</EmptyMessage>
        ) : (
          <>
            {items.map(entry => (
              <GuestbookItem
                key={entry.id}
                entry={entry}
                now={now}
                canModify={canModify(entry)}
                onUpdate={onUpdate}
                onDelete={onDelete}
                notify={notify}
              />
            ))}

            <LoadMoreTrigger ref={loadMoreTriggerRef} aria-hidden />

            {isLoadingMore ? (
              <LoadMoreStatus>
                <Loader size={22} />
                <LoadMoreText>{'방명록을 더 불러오고 있어요.'}</LoadMoreText>
              </LoadMoreStatus>
            ) : null}
          </>
        )}
      </GuestbookScrollArea>

      {isInitialLoading ? (
        <LoadingOverlay aria-label="방명록 로딩">
          <LoadingContent>
            <Loader size={30} />
            <LoadingText>{'방명록을 불러오고 있어요.\n잠시만 기다려 주세요.'}</LoadingText>
          </LoadingContent>
        </LoadingOverlay>
      ) : null}
    </GuestbookListCard>
  );
};

const GuestbookListCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  min-width: 0;
  height: 100%;
  background: ${({ theme }) => theme.colors.background.bg2};
  box-shadow: ${({ theme }) => theme.shadows.elev1};
  border-radius: 16px;

  @media (max-width: 786px) {
    height: auto;
    max-height: 600px;
  }
`;

const GuestbookScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  margin: 12px 8px 12px 0;
  padding: 8px 12px 8px 20px;
`;

const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  text-align: center;
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text5};
  padding: 0 16px;
`;

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  text-align: center;
  gap: 8px;
  padding: 24px 16px;
`;

const ErrorTitle = styled.p`
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.text.text1};
`;

const ErrorDescription = styled.p`
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text5};
  margin-bottom: 8px;
`;

const LoadMoreTrigger = styled.div`
  width: 100%;
  height: 1px;
`;

const LoadMoreStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.brand.primary};
  padding: 14px 0 8px;
  gap: 8px;
`;

const LoadMoreText = styled.span`
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text.text5};
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);
  pointer-events: all;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.brand.primary};
  gap: 10px;
`;

const LoadingText = styled.p`
  white-space: pre-wrap;
  text-align: center;
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text1};
`;
