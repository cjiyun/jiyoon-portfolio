import type { GuestbookEntry } from '@/types/guestbook';

type ListResponse = {
  ok: true;
  items: Array<GuestbookEntry & { isHidden?: boolean; deletedAt?: number | null }>;
  totalCount: number;
  page: number;
  pageSize: number;
};

type CreateResponse = {
  ok: true;
  item: GuestbookEntry;
  editToken: string;
};

const fetchJson = async <T>(input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  const data = (await res.json().catch(() => null)) as T | null;
  return { ok: res.ok, status: res.status, data };
};

export const guestbookApi = {
  list: async (payload: { page: number; pageSize: number }) => {
    const qs = new URLSearchParams({
      page: String(payload.page),
      pageSize: String(payload.pageSize),
    });
    const { ok, data } = await fetchJson<ListResponse>(`/guestbook?${qs.toString()}`, {
      method: 'GET',
    });
    return { ok, data };
  },

  create: async (payload: { name?: string; content: string }) => {
    const { ok, status, data } = await fetchJson<CreateResponse | { reason?: string }>(
      `/guestbook`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
    return { ok, status, data };
  },

  update: async (payload: { id: string; name?: string; content: string; editToken: string }) => {
    const { ok, status, data } = await fetchJson<
      { ok: true; item: GuestbookEntry } | { reason?: string }
    >(`/guestbook/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: payload.name,
        content: payload.content,
        editToken: payload.editToken,
      }),
    });
    return { ok, status, data };
  },

  remove: async (payload: { id: string; editToken: string }) => {
    const { ok, status, data } = await fetchJson<{ ok: true } | { reason?: string }>(
      `/guestbook/${payload.id}`,
      {
        method: 'DELETE',
        body: JSON.stringify({ editToken: payload.editToken }),
      }
    );
    return { ok, status, data };
  },
};
