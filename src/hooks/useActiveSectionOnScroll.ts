import { useEffect, useRef } from 'react';

type UseActiveSectionOnScrollParams<T extends string = string> = {
  selector?: string;
  offsetY?: number;
  onChange: (nextId: T | null) => void;
};

export const useActiveSectionOnScroll = <T extends string = string>({
  selector = '.scroll-section',
  offsetY = 0,
  onChange,
}: UseActiveSectionOnScrollParams<T>) => {
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const sections = document.querySelectorAll<HTMLElement>(selector);
        const thresholdY = window.innerHeight / 2 + offsetY;

        let found = false;

        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          const inView = rect.top <= thresholdY && rect.bottom >= thresholdY;

          if (inView) {
            const id = section.id;
            onChange(id ? (id as T) : null);
            found = true;
            break;
          }
        }

        if (!found) onChange(null);

        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [selector, offsetY, onChange]);
};
