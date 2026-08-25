import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useToast } from '@/hooks/useToast';
import { useGuestbook } from '@/hooks/useGuestbook';
import SectionHeader from '@/components/main/SectionHeader';
import { GuestbookForm } from '@/components/guestbook/GuestbookForm';
import { GuestbookListPanel } from '@/components/guestbook/GuestbookListPanel';
import { Icon } from '@/components/common/Icon';
import { IcInformation } from '@/assets/icons';

const Guestbook = () => {
  const {
    now,
    items,
    hasNextPage,
    isInitialLoading,
    isLoadingMore,
    listError,
    canModify,
    createEntry,
    updateEntry,
    deleteEntry,
    loadNextPage,
    reloadGuestbookList,
  } = useGuestbook();

  const theme = useTheme();
  const { push: notify } = useToast();

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
          <SectionHeader title="GUESTBOOK" />
          <GuestbookContent>
            <LeftColumn>
              <GuestbookForm onCreate={createEntry} notify={notify} />

              <NoticeCard aria-label="방명록 안내">
                <NoticeHeader>
                  <Icon icon={<IcInformation />} color={theme.colors.brand.primary} />
                  <NoticeTitle>{'당신의 한마디'}</NoticeTitle>
                </NoticeHeader>
                <NoticeList>
                  <li>{'메시지를 자유롭게 남겨주세요.'}</li>
                  <li>{'작성 후 10분 동안 수정/삭제할 수 있어요.'}</li>
                  <li>{'따뜻하고 존중하는 마음으로 작성해주세요.'}</li>
                </NoticeList>
              </NoticeCard>
            </LeftColumn>

            <GuestbookListPanel
              items={items}
              now={now}
              hasNextPage={hasNextPage}
              isInitialLoading={isInitialLoading}
              isLoadingMore={isLoadingMore}
              listError={listError}
              canModify={canModify}
              onUpdate={updateEntry}
              onDelete={deleteEntry}
              notify={notify}
              loadNextPage={loadNextPage}
              reloadGuestbookList={reloadGuestbookList}
            />
          </GuestbookContent>
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
  width: clamp(360px, 90vw, 1140px);
  margin: 0 auto;
  padding: 90px 0 110px;
  gap: 60px;
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
  flex-direction: column;
  gap: 36px;
`;

const GuestbookContent = styled.div`
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  grid-template-rows: 600px;
  gap: 40px;

  @media (max-width: 786px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 18px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;

  @media (max-width: 786px) {
    gap: 24px;
  }
`;

const NoticeCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background.bg2};
  box-shadow: ${({ theme }) => theme.shadows.elev1};
  padding: 20px;
  gap: 20px;
`;

const NoticeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NoticeTitle = styled.p`
  ${({ theme }) => theme.fonts.labelXS};
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.text1};
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
