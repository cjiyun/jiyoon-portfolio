import { useEffect, useLayoutEffect } from 'react';

type UseDrawerNavEffectsParams = {
  isOpen: boolean;
  onClose: () => void;
};

export const useDrawerNavEffects = ({ isOpen, onClose }: UseDrawerNavEffectsParams) => {
  // ESC 닫기
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // 배경 스크롤 락
  useLayoutEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const scrollY = window.scrollY;

    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';

    return () => {
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;

      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);
};
