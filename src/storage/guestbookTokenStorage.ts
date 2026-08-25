const STORAGE_KEY = 'portfolio-guestbook-edit-tokens';

type TokenMap = Record<string, string>;

const isTokenMap = (value: unknown): value is TokenMap => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every(token => typeof token === 'string');
};

const readMap = (): TokenMap => {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as unknown;
    if (!isTokenMap(parsed)) return {};

    return parsed;
  } catch {
    return {};
  }
};

const writeMap = (next: TokenMap) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const guestbookTokenStorage = {
  get: (id: string) => {
    const tokenMap = readMap();
    return tokenMap[id] ?? '';
  },

  set: (id: string, token: string) => {
    const tokenMap = readMap();
    writeMap({ ...tokenMap, [id]: token });
  },

  remove: (id: string) => {
    const tokenMap = readMap();
    const nextTokenMap = { ...tokenMap };

    delete nextTokenMap[id];
    writeMap(nextTokenMap);
  },
};
