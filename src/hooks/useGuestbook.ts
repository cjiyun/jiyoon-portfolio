import * as React from 'react';
import type { GuestbookActionResult, GuestbookEntry } from '@/types/guestbook';
import { guestbookApi } from '@/services/guestbookApi';
import { guestbookTokenStore } from '@/stores/guestbookTokenStore';

const PAGE_SIZE = 6;
const EDIT_WINDOW_MS = 10 * 60 * 1000;

const mapFailReason = (status: number, reason?: string): GuestbookActionResult => {
  if (status === 400 && reason === 'empty') return { ok: false, reason: 'empty' };
  if (status === 401) return { ok: false, reason: 'unauthorized' };
  if (status === 403 && reason === 'expired') return { ok: false, reason: 'expired' };
  if (status === 404) return { ok: false, reason: 'not_found' };
  return { ok: false, reason: 'unknown' };
};

export const useGuestbook = () => {
  const [items, setItems] = React.useState<GuestbookEntry[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const fetchList = React.useCallback(async (nextPage: number) => {
    setIsLoading(true);
    const { ok, data } = await guestbookApi.list({ page: nextPage, pageSize: PAGE_SIZE });

    if (!ok || !data) {
      setIsLoading(false);
      return false;
    }

    setItems(
      data.items.map(v => ({
        id: v.id,
        name: v.name ?? '',
        content: v.content,
        createdAt: v.createdAt,
        editedAt: v.editedAt ?? null,
      }))
    );
    setTotalCount(data.totalCount);
    setIsLoading(false);
    return true;
  }, []);

  React.useEffect(() => {
    fetchList(page);
  }, [page, fetchList]);

  React.useEffect(() => {
    setPage(prev => Math.min(Math.max(1, prev), totalPages));
  }, [totalPages]);

  const canModify = React.useCallback(
    (entry: GuestbookEntry) => {
      const token = guestbookTokenStore.get(entry.id);
      if (!token) return false;
      return now - entry.createdAt <= EDIT_WINDOW_MS;
    },
    [now]
  );

  const createEntry = React.useCallback(
    async (payload: { name?: string; content: string }): Promise<GuestbookActionResult> => {
      const { ok, status, data } = await guestbookApi.create(payload);

      if (!ok || !data) return { ok: false, reason: 'network' };

      // 서버가 empty를 reason으로 줄 수도 있음
      if ('ok' in data && data.ok === true) {
        guestbookTokenStore.set(data.item.id, data.editToken);

        // 새 글은 1페이지에 노출되게
        setPage(1);
        // 현재 page가 1이면 즉시 반영
        if (page === 1) {
          setItems(prev => [data.item, ...prev].slice(0, PAGE_SIZE));
          setTotalCount(prev => prev + 1);
        } else {
          fetchList(1);
        }

        return { ok: true };
      }

      return mapFailReason(status, (data as any)?.reason);
    },
    [fetchList, page]
  );

  const updateEntry = React.useCallback(
    async (
      id: string,
      payload: { name?: string; content: string }
    ): Promise<GuestbookActionResult> => {
      const token = guestbookTokenStore.get(id);
      if (!token) return { ok: false, reason: 'unauthorized' };

      const { ok, status, data } = await guestbookApi.update({
        id,
        name: payload.name,
        content: payload.content,
        editToken: token,
      });

      if (!ok || !data) return { ok: false, reason: 'network' };

      if ('ok' in data && data.ok === true) {
        setItems(prev => prev.map(v => (v.id === id ? data.item : v)));
        return { ok: true };
      }

      return mapFailReason(status, (data as any)?.reason);
    },
    []
  );

  const deleteEntry = React.useCallback(
    async (id: string): Promise<GuestbookActionResult> => {
      const token = guestbookTokenStore.get(id);
      if (!token) return { ok: false, reason: 'unauthorized' };

      const { ok, status, data } = await guestbookApi.remove({ id, editToken: token });

      if (!ok || !data) return { ok: false, reason: 'network' };

      if ('ok' in data && data.ok === true) {
        guestbookTokenStore.remove(id);

        // 현재 페이지에서 제거 + totalCount 감소, 필요 시 리스트 재조회
        setItems(prev => prev.filter(v => v.id !== id));
        setTotalCount(prev => Math.max(0, prev - 1));

        // 페이지가 비면 이전 페이지로 이동
        setTimeout(() => {
          fetchList(page);
        }, 0);

        return { ok: true };
      }

      return mapFailReason(status, (data as any)?.reason);
    },
    [fetchList, page]
  );

  return {
    now,
    items,
    totalCount,
    page,
    totalPages,
    pageSize: PAGE_SIZE,
    isLoading,
    setPage,

    canModify,
    createEntry,
    updateEntry,
    deleteEntry,
  };
};
