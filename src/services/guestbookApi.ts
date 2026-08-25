import type {
  GuestbookCreateRequestDto,
  GuestbookCreateResponseDto,
  GuestbookDeleteRequestDto,
  GuestbookDeleteResponseDto,
  GuestbookErrorResponseDto,
  GuestbookListRequestDto,
  GuestbookListResponseDto,
  GuestbookUpdateRequestDto,
  GuestbookUpdateResponseDto,
} from '@/types/guestbookApi';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const GUESTBOOK_API_BASE = `${API_BASE_URL}/guestbook`;

type FetchJsonResult<T> = {
  ok: boolean;
  status: number;
  data: T | null;
};

const fetchJson = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<FetchJsonResult<T>> => {
  const headers = new Headers(init?.headers);

  if (init?.body && !headers.has('content-type')) {
    headers.set('content-type', 'application/json');
  }

  const res = await fetch(input, {
    ...init,
    headers,
  });

  const data = (await res.json().catch(() => null)) as T | null;

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
};

export const guestbookApi = {
  list: async ({ page, pageSize }: GuestbookListRequestDto) => {
    const qs = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    return fetchJson<GuestbookListResponseDto>(`${GUESTBOOK_API_BASE}?${qs.toString()}`, {
      method: 'GET',
    });
  },

  create: async (payload: GuestbookCreateRequestDto) => {
    return fetchJson<GuestbookCreateResponseDto | GuestbookErrorResponseDto>(GUESTBOOK_API_BASE, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update: async ({ id, name, content, editToken }: GuestbookUpdateRequestDto) => {
    return fetchJson<GuestbookUpdateResponseDto | GuestbookErrorResponseDto>(
      `${GUESTBOOK_API_BASE}/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          name,
          content,
          editToken,
        }),
      }
    );
  },

  remove: async ({ id, editToken }: GuestbookDeleteRequestDto) => {
    return fetchJson<GuestbookDeleteResponseDto | GuestbookErrorResponseDto>(
      `${GUESTBOOK_API_BASE}/${id}`,
      {
        method: 'DELETE',
        body: JSON.stringify({ editToken }),
      }
    );
  },
};
