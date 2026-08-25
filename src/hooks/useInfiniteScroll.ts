import { type RefObject, useEffect } from 'react';

type UseInfiniteScrollParams = {
  rootRef: RefObject<HTMLElement | null>;
  targetRef: RefObject<HTMLElement | null>;
  enabled: boolean;
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number;
};

export const useInfiniteScroll = ({
  rootRef,
  targetRef,
  enabled,
  onIntersect,
  rootMargin = '80px 0px',
  threshold = 0,
}: UseInfiniteScrollParams) => {
  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    const target = targetRef.current;

    if (!root || !target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        onIntersect();
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [enabled, onIntersect, rootMargin, rootRef, targetRef, threshold]);
};
