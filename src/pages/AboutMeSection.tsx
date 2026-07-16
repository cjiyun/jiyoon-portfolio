import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { imgVariants } from '@/animations/variants';
import ImgAboutMeProfile from '@/assets/images/img-aboutme-profile.png';
import IcMail from '@/assets/icons/ic-mail.svg?react';
import AboutBlock from '@/components/aboutme/AboutBlock';
import AboutRecord from '@/components/aboutme/AboutRecord';

const KEYWORDS = ['끈기', '몰입', '소통', '도전', '성장', '애니메이션'] as const;

const POINTS = [
  '몰입하는 것을 좋아해, 반복되는 오류에도 끝까지 포기하지 않고 결국 해결하는 끈기가 있습니다.',
  '클린 코드를 위해 끊임없이 고민합니다.',
  '새로운 경험과 함께하는 성장을 지향합니다.',
  'UX와 모션에 관심이 많습니다.',
] as const;

const EMAIL = 'chlwldbs78@gmail.com';

const AboutMe = () => {
  return (
    <AboutMeContainer aria-label="About Me">
      <AboutLayout>
        <PhotoCard>
          <Photo
            src={ImgAboutMeProfile}
            variants={imgVariants}
            initial="rest"
            whileHover="hover"
            alt="프로필 사진"
            loading="lazy"
          />
        </PhotoCard>

        <AboutContent>
          <AboutBlock title="Who am I?">
            <KeywordList>
              {KEYWORDS.map(k => (
                <Keyword key={k}>#{k}</Keyword>
              ))}
            </KeywordList>

            <DescList>
              {POINTS.map(text => (
                <DescItem key={text}>
                  <Dot>•</Dot>
                  <DescText>{text}</DescText>
                </DescItem>
              ))}
            </DescList>

            <ContactRow>
              <ContactText>
                저와 함께하고 싶으시거나 궁금한 점이 있다면 언제든 편하게 연락주세요 :)
              </ContactText>

              <MailBtn href={`mailto:${EMAIL}`} aria-label="이메일 보내기" title={EMAIL}>
                <IcMail />
              </MailBtn>
            </ContactRow>
          </AboutBlock>

          {/* Education */}
          <AboutBlock title="Education">
            <AboutRecord
              title="가천대학교 컴퓨터공학부(컴퓨터공학전공)"
              period="2022.03 - 재학중"
            />
          </AboutBlock>

          {/* Credentials */}
          <AboutBlock title="Credentials">
            <AboutRecord title="정보처리기사" period="2025.06" issuer="한국산업인력공단" />
            <AboutRecord
              title="TOEIC Speaking"
              score="Intermediate Mid 2"
              period="2025.12"
              issuer="YBM"
            />
          </AboutBlock>
        </AboutContent>
      </AboutLayout>
    </AboutMeContainer>
  );
};

export default AboutMe;

const AboutMeContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.background.bg1};
`;

const AboutLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: min(1100px, calc(100% - 48px));
  padding: 90px 0 110px;
  gap: 60px;

  @media (max-width: 1440px) {
    width: min(1000px, calc(100% - 60px));
    padding: 80px 0 100px;
    gap: 40px;
  }

  @media (max-width: 820px) {
    flex-direction: column;
    width: min(420px, calc(100% - 40px));
    padding: 80px 0 90px;
  }
`;

const PhotoCard = styled.div`
  width: 300px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.elev1};
  flex: 0 0 auto;

  @media (max-width: 1440px) {
    width: 280px;
  }

  @media (max-width: 820px) {
    width: 150px;
  }
`;

const Photo = styled(motion.img)`
  width: 100%;
  object-fit: cover;
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Keyword = styled.span`
  background: ${({ theme }) => theme.colors.background.bg3};
  color: ${({ theme }) => theme.colors.text.textSoftBlue};
  ${({ theme }) => theme.fonts.labelXSB};
  font-size: 12px;
  border-radius: 10px;
  padding: 4px 8px;
`;

const DescList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text1};

  @media (max-width: 1440px) {
    ${({ theme }) => theme.fonts.body5};
  }
`;

const DescItem = styled.li`
  display: flex;
  gap: 10px;
`;

const Dot = styled.span`
  color: ${({ theme }) => theme.colors.text.text1};
`;

const DescText = styled.span`
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text.text1};
`;

const ContactText = styled.p`
  ${({ theme }) => theme.fonts.caption};
`;

const MailBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.text1};
  background: ${({ theme }) => theme.colors.background.bg3};
  border-radius: 10px;
  padding: 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.text.textW};
    background: ${({ theme }) => theme.colors.gradient.hover};
    box-shadow: ${({ theme }) => theme.shadows.elev2};
  }

  svg {
    display: block;
    width: 24px;
    height: 24px;
  }

  &:hover {
    //box-shadow: ${({ theme }) => theme.shadows.elev1};
    transform: translateY(-1px);
  }
`;
