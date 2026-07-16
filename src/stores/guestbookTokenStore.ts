const STORAGE_KEY = 'portfolio-guestbook-edit-tokens';

type TokenMap = Record<string, string>;

const readMap = () => {
  if (typeof window === 'undefined') return {} as TokenMap;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed as TokenMap;
  } catch {
    return {};
  }
};

const writeMap = (next: TokenMap) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

export const guestbookTokenStore = {
  get: (id: string) => {
    const map = readMap();
    return map[id] ?? '';
  },

  set: (id: string, token: string) => {
    const map = readMap();
    writeMap({ ...map, [id]: token });
  },

  remove: (id: string) => {
    const map = readMap();
    const { [id]: _, ...rest } = map;
    writeMap(rest);
  },
};
