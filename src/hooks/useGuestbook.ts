import { useCallback, useEffect, useState } from 'react';
import type { GuestbookActionResult, GuestbookEntry, GuestbookEntryInput } from '@/types/guestbook';
import type { GuestbookEntryDto, GuestbookErrorResponseDto } from '@/types/guestbookApi';
import { guestbookApi } from '@/services/guestbookApi';
import { guestbookTokenStorage } from '@/storage/guestbookTokenStorage';

const PAGE_SIZE = 6;
const EDIT_WINDOW_MS = 10 * 60 * 1000;
type FetchListMode = 'replace' | 'append';

const mapGuestbookEntry = (dto: GuestbookEntryDto): GuestbookEntry => {
  return {
    id: dto.id,
    name: dto.name ?? '',
    content: dto.content,
    createdAt: dto.createdAt,
    editedAt: dto.editedAt ?? null,
  };
};

const normalizeGuestbookInput = (payload: GuestbookEntryInput): GuestbookEntryInput => {
  return {
    name: payload.name?.trim() || undefined,
    content: payload.content.trim(),
  };
};

const mergeGuestbookEntries = (prev: GuestbookEntry[], next: GuestbookEntry[]) => {
  const prevIdSet = new Set(prev.map(entry => entry.id));
  const uniqueNext = next.filter(entry => !prevIdSet.has(entry.id));

  return [...prev, ...uniqueNext];
};

const isSuccessResponse = <T extends { ok: true }>(
  data: T | GuestbookErrorResponseDto | null
): data is T => {
  return !!data && 'ok' in data && data.ok;
};

const getErrorReason = (data: unknown): string | undefined => {
  if (!data || typeof data !== 'object' || !('reason' in data)) {
    return undefined;
  }

  return (data as GuestbookErrorResponseDto).reason;
};

const mapFailReason = (status: number, reason?: string): GuestbookActionResult => {
  if (status === 400 && reason === 'empty') return { ok: false, reason: 'empty' };
  if (status === 400 && reason === 'invalid') return { ok: false, reason: 'invalid' };
  if (status === 401) return { ok: false, reason: 'unauthorized' };
  if (status === 403 && reason === 'expired') return { ok: false, reason: 'expired' };
  if (status === 404) return { ok: false, reason: 'not_found' };

  return { ok: false, reason: 'unknown' };
};

export const useGuestbook = () => {
  const [items, setItems] = useState<GuestbookEntry[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [listError, setListError] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  const hasNextPage = items.length < totalCount;

  useEffect(() => {
    const timerId = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timerId);
  }, []);

  const fetchList = useCallback(async (nextPage: number, mode: FetchListMode) => {
    setListError(false);

    if (mode === 'append') setIsLoadingMore(true);
    else setIsInitialLoading(true);

    try {
      const { ok, data } = await guestbookApi.list({
        page: nextPage,
        pageSize: PAGE_SIZE,
      });
      if (!ok || !data) {
        setListError(true);
        return false;
      }

      const nextItems = data.items.map(mapGuestbookEntry);

      setItems(prev => (mode === 'append' ? mergeGuestbookEntries(prev, nextItems) : nextItems));
      setTotalCount(data.totalCount);
      setPage(data.page);
      setListError(false);

      return true;
    } catch {
      setListError(true);
      return false;
    } finally {
      if (mode === 'append') setIsLoadingMore(false);
      else setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchList(1, 'replace');
  }, [fetchList]);

  const loadNextPage = useCallback(async () => {
    if (isInitialLoading || isLoadingMore || !hasNextPage) return false;

    return fetchList(page + 1, 'append');
  }, [fetchList, hasNextPage, isInitialLoading, isLoadingMore, page]);

  const reloadGuestbookList = useCallback(() => {
    return fetchList(1, 'replace');
  }, [fetchList]);

  const canModify = useCallback(
    (entry: GuestbookEntry) => {
      const token = guestbookTokenStorage.get(entry.id);
      if (!token) return false;

      return now - entry.createdAt <= EDIT_WINDOW_MS;
    },
    [now]
  );

  const createEntry = useCallback(
    async (payload: GuestbookEntryInput): Promise<GuestbookActionResult> => {
      const normalizedPayload = normalizeGuestbookInput(payload);

      if (!normalizedPayload.content) return { ok: false, reason: 'empty' };

      try {
        const { ok, status, data } = await guestbookApi.create(normalizedPayload);

        if (!data) return { ok: false, reason: 'network' };
        if (!ok) return mapFailReason(status, getErrorReason(data));

        if (isSuccessResponse(data)) {
          const item = mapGuestbookEntry(data.item);

          guestbookTokenStorage.set(item.id, data.editToken);
          setItems(prev => [item, ...prev]);
          setTotalCount(prev => prev + 1);

          return { ok: true };
        }

        return mapFailReason(status, getErrorReason(data));
      } catch {
        return { ok: false, reason: 'network' };
      }
    },
    []
  );

  const updateEntry = useCallback(
    async (id: string, payload: GuestbookEntryInput): Promise<GuestbookActionResult> => {
      const token = guestbookTokenStorage.get(id);
      const normalizedPayload = normalizeGuestbookInput(payload);

      if (!token) return { ok: false, reason: 'unauthorized' };
      if (!normalizedPayload.content) return { ok: false, reason: 'empty' };

      try {
        const { ok, status, data } = await guestbookApi.update({
          id,
          name: normalizedPayload.name,
          content: normalizedPayload.content,
          editToken: token,
        });

        if (!data) return { ok: false, reason: 'network' };
        if (!ok) return mapFailReason(status, getErrorReason(data));

        if (isSuccessResponse(data)) {
          const item = mapGuestbookEntry(data.item);

          setItems(prev => prev.map(entry => (entry.id === id ? item : entry)));

          return { ok: true };
        }

        return mapFailReason(status, getErrorReason(data));
      } catch {
        return { ok: false, reason: 'network' };
      }
    },
    []
  );

  const deleteEntry = useCallback(async (id: string): Promise<GuestbookActionResult> => {
    const token = guestbookTokenStorage.get(id);

    if (!token) return { ok: false, reason: 'unauthorized' };

    try {
      const { ok, status, data } = await guestbookApi.remove({
        id,
        editToken: token,
      });

      if (!data) return { ok: false, reason: 'network' };
      if (!ok) return mapFailReason(status, getErrorReason(data));

      if (isSuccessResponse(data)) {
        guestbookTokenStorage.remove(id);
        setItems(prev => prev.filter(entry => entry.id !== id));
        setTotalCount(prev => Math.max(0, prev - 1));

        return { ok: true };
      }

      return mapFailReason(status, getErrorReason(data));
    } catch {
      return { ok: false, reason: 'network' };
    }
  }, []);

  return {
    now,
    items,
    hasNextPage,
    isInitialLoading,
    isLoadingMore,
    listError,
    canModify,
    createEntry,
    updateEntry,
    deleteEntry,
    loadNextPage,
    reloadGuestbookList,
  };
};
