import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(query);

    const onChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // 최초 동기화
    setMatches(mql.matches);

    // 표준 방식(폴백 없음)
    mql.addEventListener('change', onChange);

    return () => {
      mql.removeEventListener('change', onChange);
    };
  }, [query]);

  return matches;
};
