import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/provider/ToastProvider';

export const ToastStack = () => {
  const { toasts, dismiss } = useToast();
  return (
    <Stack aria-label="토스트 메시지" aria-live="polite">
      <AnimatePresence initial={false} mode="popLayout">
        {toasts.map(t => (
          <ToastCard
            key={t.id}
            layout="position"
            initial={{ opacity: 0, scale: 1.1, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: -12 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            data-kind={t.kind}
            role={t.kind === 'error' ? 'alert' : 'status'}
            onClick={() => dismiss(t.id)}
          >
            {t.message}
          </ToastCard>
        ))}
      </AnimatePresence>
    </Stack>
  );
};

const Stack = styled.div`
  position: fixed;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(320px, calc(100% - 24px));
`;

const ToastCard = styled(motion.div)`
  border-radius: 999px;
  text-align: center;
  ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.text.text1};
  background: ${({ theme }) => theme.colors.background.bg1};
  border: 1px solid ${({ theme }) => theme.colors.border.border1};
  box-shadow: ${({ theme }) => theme.shadows.elev2};
  cursor: pointer;
  padding: 12px 14px;

  &[data-kind='success'] {
    border-color: ${({ theme }) => theme.colors.semantic.success};
  }

  &[data-kind='warning'] {
    border-color: ${({ theme }) => theme.colors.semantic.warning};
  }

  &[data-kind='error'] {
    border-color: ${({ theme }) => theme.colors.semantic.error};
  }
`;
