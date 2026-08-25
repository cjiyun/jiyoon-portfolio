import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks/useToast';
import type { ToastItem, ToastType } from '@/types/toast';
import { IcCheck, IcError } from '@/assets/icons';

const getToastIcon = (type: ToastType) => {
  return type === 'success' ? <IcCheck /> : <IcError />;
};

export const ToastStack = () => {
  const { toasts, dismiss } = useToast();

  return (
    <Stack aria-label="토스트 메시지" aria-live="polite" aria-atomic="true">
      <AnimatePresence initial={false} mode="popLayout">
        {toasts.map(t => (
          <ToastCard
            key={t.id}
            type="button"
            layout="position"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            toastType={t.type}
            role={t.type === 'error' ? 'alert' : 'status'}
            onClick={() => dismiss(t.id)}
          >
            <ToastStatusIcon toastType={t.type}>{getToastIcon(t.type)}</ToastStatusIcon>
            <ToastMessage>{t.message}</ToastMessage>
          </ToastCard>
        ))}
      </AnimatePresence>
    </Stack>
  );
};

const Stack = styled.div`
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
`;

const ToastCard = styled(motion.button)<{ toastType: ToastItem['type'] }>`
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  color: ${({ toastType, theme }) =>
    toastType === 'success' ? theme.colors.semantic.success : theme.colors.semantic.error};
  background: ${({ toastType, theme }) =>
    toastType === 'success' ? theme.colors.semantic.successSoft : theme.colors.semantic.errorSoft};
  box-shadow: ${({ theme }) => theme.shadows.elev2};
  border: 1px solid
    ${({ toastType, theme }) =>
      toastType === 'success' ? theme.colors.semantic.success : theme.colors.semantic.error};
  border-radius: 10px;
  padding: 10px 12px;
  gap: 8px;
  pointer-events: auto;
  cursor: pointer;
`;

const ToastStatusIcon = styled.span<{ toastType: ToastItem['type'] }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ toastType, theme }) =>
    toastType === 'success' ? theme.colors.semantic.success : theme.colors.semantic.error};

  & > svg {
    width: 18px;
    height: 18px;
  }
`;

const ToastMessage = styled.span`
  flex: 1;
  text-align: left;
  ${({ theme }) => theme.fonts.body3};
  word-break: break-word;
`;
