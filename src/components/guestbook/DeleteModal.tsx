import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader } from '@/components/common/Loader';
import { TextButton } from '@/components/guestbook/TextButton';

type DeleteModalProps = {
  isOpen: boolean;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DeleteModal = ({ isOpen, isDeleting, onCancel, onConfirm }: DeleteModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    modalRef.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus();

    const prevBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!isDeleting) onCancel();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableElements = Array.from(
        modalRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled)') ?? []
      );

      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isDeleting, onCancel]);

  const handleOverlayClick = () => {
    if (isDeleting) return;

    onCancel();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <ModalOverlay
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <ModalCard
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="guestbook-delete-modal-title"
            aria-describedby="guestbook-delete-modal-desc"
            aria-busy={isDeleting}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
          >
            <ModalContent>
              <ModalTitle id="guestbook-delete-modal-title">{'정말로 삭제하시겠어요?'}</ModalTitle>

              <ModalDescription id="guestbook-delete-modal-desc">
                {'삭제하면 되돌릴 수 없어요.'}
              </ModalDescription>
            </ModalContent>

            <ModalActions>
              <ModalButton variant="secondary" onClick={onCancel} disabled={isDeleting}>
                {'취소'}
              </ModalButton>

              <ModalButton
                variant="destructive"
                onClick={onConfirm}
                disabled={isDeleting}
                aria-label={isDeleting ? '방명록 삭제 중' : undefined}
              >
                {isDeleting ? <Loader size={20} /> : '삭제'}
              </ModalButton>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 50%);
  padding: 24px;
`;

const ModalCard = styled(motion.div)`
  min-width: 300px;
  background: ${({ theme }) => theme.colors.background.bg1};
  box-shadow: ${({ theme }) => theme.shadows.elev2};
  border-radius: 8px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 24px 16px;
  gap: 8px;
`;

const ModalTitle = styled.h2`
  ${({ theme }) => theme.fonts.title3};
  color: ${({ theme }) => theme.colors.text.text1};
`;

const ModalDescription = styled.p`
  ${({ theme }) => theme.fonts.body5};
  color: ${({ theme }) => theme.colors.text.text4};
`;

const ModalActions = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 8px;
  gap: 12px;
`;

const ModalButton = styled(TextButton)`
  width: 100%;
`;
