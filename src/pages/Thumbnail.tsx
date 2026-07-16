import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useTyping } from '@/hooks/useTyping';
import { buttonVariants, imgVariants } from '@/animations/variants';
import { CONTACT_ITEMS } from '@/constants/contactItems';
import { useNavigation } from '@/hooks/useNavigation';
import { Icon } from '@/components/common/Icon';
import { useState } from 'react';
import ContactModal from '@/components/thumbnail/ContactModal';
import ImgProfile from '@/assets/images/img-profile.png';
import IcFileDownload from '@/assets/icons/ic-file-download.svg?react';
import IcContact from '@/assets/icons/ic-contact.svg?react';
import IcDown from '@/assets/icons/ic-down.svg?react';

const KEYWORDS = [
  '끈기 있는',
  '소통하는',
  '몰입하는',
  '책임감 있는',
  '성장하는',
  '도전하는',
  '디테일을 챙기는',
];

const Thumbnail = () => {
  const { text } = useTyping({ words: KEYWORDS });
  const { onNavigate } = useNavigation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleContactMe = () => {
    setIsContactOpen(true);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ThumbnailContainer>
      <SectionInner>
        <HeroWordTop>FRONTEND</HeroWordTop>
        <HeroWordBottom>DEVELOPER</HeroWordBottom>

        <HeroLayout>
          <HeroCopy>
            <Intro>
              <p>안녕하세요,</p>
              <p>
                신입 <strong>프론트엔드 개발자 최지윤</strong>입니다.
              </p>
            </Intro>

            <TypingRow aria-label="Typewriter line">
              <AccentBar />
              <TypingText>
                <Keyword>{text}</Keyword>
                <Caret aria-hidden />
              </TypingText>
              {'개발자'}
            </TypingRow>

            <ActionGroup>
              <ActionButton
                type="button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleDownloadCV}
              >
                <Icon icon={<IcFileDownload />} />
                {'Download CV'}
              </ActionButton>

              <ActionButton
                type="button"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleContactMe}
              >
                <Icon icon={<IcContact />} />
                {'Contact Me'}
              </ActionButton>
            </ActionGroup>
          </HeroCopy>

          <ProfileFrame>
            <ProfileImage
              src={ImgProfile}
              variants={imgVariants}
              initial="rest"
              whileHover="hover"
              alt="프로필 사진"
              loading="lazy"
            />
          </ProfileFrame>
        </HeroLayout>
      </SectionInner>

      <ScrollIndicatorContainer
        type="button"
        onClick={() => onNavigate('about')}
        aria-label="Scroll down"
      >
        <ScrollIndicatorIcon
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <IcDown />
        </ScrollIndicatorIcon>
      </ScrollIndicatorContainer>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        items={CONTACT_ITEMS}
      />
    </ThumbnailContainer>
  );
};

export default Thumbnail;

const HEADER_NAV_H = 76;
const DRAWER_TOP_BAR_H = 70;

const ThumbnailContainer = styled.div`
  position: relative;
  width: min(1100px, calc(100% - 48px));
  min-height: calc(100vh - ${HEADER_NAV_H}px);
  margin: 0 auto;

  @media (max-width: 820px) {
    min-height: calc(100vh - ${DRAWER_TOP_BAR_H}px);
  }
`;

const SectionInner = styled.div`
  position: relative;
  width: min(1100px, calc(100% - 48px));
  margin: ${HEADER_NAV_H}px auto;

  @media (max-width: 1440px) {
    width: min(800px, calc(100% - 60px));
  }

  @media (max-width: 820px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: min(420px, calc(100% - 20px));
    margin: ${DRAWER_TOP_BAR_H}px auto;
  }
`;

const HeroLayout = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  padding-top: 112px;
  gap: 60px;

  @media (max-width: 1440px) {
    padding-top: 80px;
    gap: 20px;
  }

  @media (max-width: 820px) {
    flex-direction: column-reverse;
    align-items: center;
    width: 100%;
    padding-top: 40px;
  }
`;

const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 820px) {
    width: 100%;
    align-items: center;
    text-align: center;
  }
`;

const Intro = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.text.text1};

  strong {
    font-weight: 800;
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  @media (max-width: 1440px) {
    ${({ theme }) => theme.fonts.body2};
  }

  @media (max-width: 820px) {
    ${({ theme }) => theme.fonts.body3};
  }
`;

const TypingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ theme }) => theme.fonts.body3};
  color: ${({ theme }) => theme.colors.text.text1};

  @media (max-width: 820px) {
    ${({ theme }) => theme.fonts.body5};
    justify-content: center;
    width: 100%;
  }
`;

const AccentBar = styled.div`
  width: 4px;
  height: 20px;
  background: ${({ theme }) => theme.colors.brand.primary};
`;

const TypingText = styled.div`
  display: flex;
  align-items: center;
`;

const Keyword = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.brand.primary};
`;

const Caret = styled.span`
  display: inline-block;
  width: 1px;
  height: 18px;
  background: ${({ theme }) => theme.colors.neutral.neutral700};
  animation: blink 1s steps(1) infinite;

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 820px) {
    justify-content: center;
    width: 100%;
  }
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.labelXS};
  color: ${({ theme }) => theme.colors.text.text1};
  background: ${({ theme }) => theme.colors.background.bg3};
  border-radius: 10px;
  padding: 4px 8px;
  gap: 8px;

  &:hover {
    color: ${({ theme }) => theme.colors.text.textW};
    background: ${({ theme }) => theme.colors.gradient.hover};
    box-shadow: ${({ theme }) => theme.shadows.elev2};
  }

  @media (max-width: 1440px) {
    ${({ theme }) => theme.fonts.caption};
  }
`;

const ProfileFrame = styled.div`
  width: 240px;
  aspect-ratio: 3 / 4;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.elev1};

  @media (max-width: 1440px) {
    width: 240px;
  }

  @media (max-width: 820px) {
    width: 150px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
  }
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
`;

const HeroWordTop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  ${({ theme }) => theme.fonts.labelXXL};
  color: ${({ theme }) => theme.colors.brand.primary};
  z-index: 0;
  pointer-events: none;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 1440px) {
    font-size: 56px;
  }

  @media (max-width: 820px) {
    position: static;
    font-size: 32px;
  }
`;

const HeroWordBottom = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  ${({ theme }) => theme.fonts.labelXXL};
  color: ${({ theme }) => theme.colors.brand.primary};
  z-index: 0;
  pointer-events: none;
  white-space: nowrap;

  @media (max-width: 1440px) {
    font-size: 56px;
  }

  @media (max-width: 820px) {
    position: static;
    ${({ theme }) => theme.fonts.labelXL};
  }
`;

const ScrollIndicatorContainer = styled.button`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 60px;
`;

const ScrollIndicatorIcon = styled(motion.span)`
  display: inline-flex;
  width: 44px;
  height: 44px;
  color: ${({ theme }) => theme.colors.neutral.neutral400};

  svg {
    width: 100%;
    height: 100%;
  }
`;
