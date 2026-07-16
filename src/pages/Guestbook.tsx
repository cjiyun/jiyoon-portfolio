import styled from '@emotion/styled';
import { GuestbookForm } from '@/components/guestbook/GuestbookForm';
import { GuestbookItem } from '@/components/guestbook/GuestbookItem';
import { Pagination } from '@/components/guestbook/Pagination';
import { useGuestbook } from '@/hooks/useGuestbook';
import { useToast } from '@/provider/ToastProvider';
import { Icon } from '@/components/common/Icon';
import IcInformation from '@/assets/icons/ic-information.svg?react';
import { useTheme } from '@emotion/react';
import { Loader } from '@/components/common/Loader';

const Guestbook = () => {
  const {
    now,
    items,
    page,
    totalPages,
    isLoading,
    setPage,
    canModify,
    createEntry,
    updateEntry,
    deleteEntry,
  } = useGuestbook();
  const theme = useTheme();
  const { push } = useToast();
  const notify = push;

  return (
    <GuestbookContainer>
      <SectionInner>
        <Header>
          <Title>{'여기까지 봐주셔서 감사합니다!'}</Title>
          <Desc>
            {
              '부담 없이 한마디 남겨주세요. 좋았던 점도, 아쉬운 점도, 가벼운 인사도 좋아요.\n여러분의 관심이 큰 도움이 됩니다💪'
            }
          </Desc>
        </Header>

        <Body>
          <LeftColumn>
            <GuestbookForm onCreate={createEntry} notify={notify} />

            <NoticeCard aria-label="방명록 안내">
              <Icon icon={<IcInformation />} color={theme.colors.brand.primary} />
              <NoticeList>
                <li>{'메시지를 자유롭게 공유해주세요.'}</li>
                <li>{'작성 후 10분 동안 수정/삭제할 수 있어요.'}</li>
                <li>{'친절하고 존중하는 마음으로 작성해주세요.'}</li>
              </NoticeList>
            </NoticeCard>
          </LeftColumn>

          <CommentCardContainer>
            <CommentList aria-label="방명록 목록">
              <ListHeader>{'COMMENT'}</ListHeader>

              <ListBody>
                {items.length === 0 ? (
                  <Empty>{'아직 방명록이 없어요. 첫 메시지를 남겨주세요 :)'}</Empty>
                ) : (
                  items.map(entry => (
                    <GuestbookItem
                      key={entry.id}
                      entry={entry}
                      now={now}
                      canModify={canModify(entry)}
                      onUpdate={updateEntry}
                      onDelete={deleteEntry}
                      notify={notify}
                    />
                  ))
                )}
              </ListBody>

              <Pagination page={page} totalPages={totalPages} onChange={setPage} />

              {isLoading ? (
                <LoadingOverlay aria-label="방명록 로딩">
                  <LoaderWrapper>
                    <Loader size={30} />
                    <LoadingText>{'방명록을 불러오고 있어요.\n조금만 기다려 주세요.'}</LoadingText>
                  </LoaderWrapper>
                </LoadingOverlay>
              ) : null}
            </CommentList>
          </CommentCardContainer>
        </Body>
      </SectionInner>
    </GuestbookContainer>
  );
};

export default Guestbook;

const GuestbookContainer = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.colors.background.bg1};
  display: flex;
  justify-content: center;
`;

const SectionInner = styled.div`
  display: flex;
  flex-direction: column;
  width: min(1100px, calc(100% - 48px));
  padding: 90px 0 110px;
  gap: 40px;

  @media (max-width: 1440px) {
    width: min(1000px, calc(100% - 60px));
    padding: 80px 0 100px;
  }

  @media (max-width: 820px) {
    width: min(420px, calc(100% - 40px));
    padding: 80px 0 90px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.title3};
  color: ${({ theme }) => theme.colors.text.text1};
`;

const Desc = styled.span`
  white-space: pre-wrap;
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.text.text1};
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 40px;

  @media (max-width: 820px) {
    flex-direction: column;
    gap: 18px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 360px;
  flex: 0 0 auto;

  @media (max-width: 820px) {
    width: 100%;
  }
`;

const NoticeCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background.bg1};
  box-shadow: ${({ theme }) => theme.shadows.elev1};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  padding: 20px 20px;
  gap: 10px;
`;

const NoticeList = styled.ul`
  list-style: disc inside;
  display: flex;
  flex-direction: column;
  width: 100%;
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text2};
  gap: 6px;
`;

const CommentCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-self: stretch;
  min-width: 0;
  height: 100%;
`;

const CommentList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background.bg1};
  box-shadow: ${({ theme }) => theme.shadows.elev1};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  border-radius: 16px;
  padding: 16px 18px;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.title4};
  color: ${({ theme }) => theme.colors.text.text1};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.border1};
  padding-bottom: 10px;
  gap: 10px;
`;

const ListBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 6px;
  flex: 1 1 auto;
  min-width: 0;
`;

const Empty = styled.div`
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text5};
  padding: 18px 0 8px;
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

const LoaderWrapper = styled.div`
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
