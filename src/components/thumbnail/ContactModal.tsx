import styled from '@emotion/styled';
import { type ReactNode, type MouseEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonVariants } from '@/animations/variants';
import { useToast } from '@/provider/ToastProvider';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { Icon } from '@/components/common/Icon';
import IcClose from '@/assets/icons/ic-close.svg?react';
import IcExternalLink from '@/assets/icons/ic-external-link.svg?react';
import IcCopy from '@/assets/icons/ic-copy.svg?react';
import IcCheck from '@/assets/icons/ic-check.svg?react';

type ContactItem = {
  id: string;
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
};

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  items: ReadonlyArray<ContactItem>;
};

const ContactModal = ({ isOpen, onClose, items }: ContactModalProps) => {
  const { push } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const onOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const onCopy = async (text: string, label: string, id: string) => {
    try {
      await copyToClipboard(text);
      setCopiedId(id);

      push({
        message: `${label}이(가) 복사되었습니다.`,
        kind: 'success',
      });
      setTimeout(() => {
        setCopiedId(null);
      }, 1500);
    } catch {
      push({
        message: '복사에 실패했습니다.',
        kind: 'error',
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          onClick={onOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={false}
        >
          <Dialog
            role="dialog"
            aria-modal="true"
            aria-label="Contact Me"
            initial={{ opacity: 0, y: 24, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 40,
              mass: 0.9,
            }}
          >
            <Header>
              <Title>Contact Me</Title>
              <CloseButton type="button" onClick={onClose} aria-label="닫기">
                <Icon icon={<IcClose />} />
              </CloseButton>
            </Header>

            <ContactList>
              {items.map(item => (
                <ContactCard variants={buttonVariants} whileHover="hover" key={item.id}>
                  <Left>
                    <LogoContainer aria-hidden>{item.icon}</LogoContainer>
                    <TextContainer>
                      <Label>{item.label}</Label>
                      <Value>{item.value}</Value>
                    </TextContainer>
                  </Left>

                  <ButtonsContainer>
                    {item.href && (
                      <IconButton
                        type="button"
                        onClick={() => window.open(item.href, '_blank', 'noreferrer')}
                        aria-label={`${item.label} 열기`}
                      >
                        <Icon icon={<IcExternalLink />} />
                      </IconButton>
                    )}
                    <IconButton
                      type="button"
                      onClick={() => onCopy(item.value, item.label, item.id)}
                      aria-label={`${item.label} 복사`}
                    >
                      <Icon icon={copiedId === item.id ? <IcCheck /> : <IcCopy />} />
                    </IconButton>
                  </ButtonsContainer>
                </ContactCard>
              ))}
            </ContactList>
          </Dialog>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(10px);
  padding: 20px;
`;

const Dialog = styled(motion.div)`
  width: min(520px, 100%);
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.background.bg1};
  box-shadow: ${({ theme }) => theme.shadows.elev2};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  padding: 18px 18px 14px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
`;

const Title = styled.div`
  ${({ theme }) => theme.fonts.labelS};
  color: ${({ theme }) => theme.colors.text.text1};
`;

const CloseButton = styled.button`
  color: ${({ theme }) => theme.colors.text.text5};

  &:hover {
    color: ${({ theme }) => theme.colors.text.text1};
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactCard = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 12px 10px;
  gap: 12px;

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    border-color: ${({ theme }) => theme.colors.border.border2};
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background.bg2};
  color: ${({ theme }) => theme.colors.text.text1};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 4px;
`;

const Label = styled.div`
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text1};
`;

const Value = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  max-width: 240px;
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text.text3};

  @media (max-width: 375px) {
    display: none;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text.text5};

  &:hover {
    color: ${({ theme }) => theme.colors.text.text1};
  }
`;
