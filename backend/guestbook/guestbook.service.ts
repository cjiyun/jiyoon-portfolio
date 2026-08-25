import { randomBytes, randomUUID } from 'node:crypto';
import { guestbookRepository } from './guestbook.repository';
import type {
  GuestbookCreateRequestDto,
  GuestbookCreateResponseDto,
  GuestbookDeleteRequestDto,
  GuestbookDeleteResponseDto,
  GuestbookEntryDto,
  GuestbookEntryRecord,
  GuestbookListResponseDto,
  GuestbookServiceError,
  GuestbookUpdateRequestDto,
  GuestbookUpdateResponseDto,
} from './guestbook.types';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 6;
const MAX_PAGE_SIZE = 20;
const EDIT_WINDOW_MS = 10 * 60 * 1000;

const toGuestbookEntryDto = (entry: GuestbookEntryRecord): GuestbookEntryDto => {
  return {
    id: entry.id,
    name: entry.name,
    content: entry.content,
    createdAt: entry.createdAt,
    editedAt: entry.editedAt,
  };
};

const createEditToken = () => {
  return randomBytes(32).toString('hex');
};

const normalizePage = (page: unknown) => {
  const parsedPage = Number(page);

  if (!Number.isFinite(parsedPage) || parsedPage < 1) {
    return DEFAULT_PAGE;
  }

  return Math.floor(parsedPage);
};

const normalizePageSize = (pageSize: unknown) => {
  const parsedPageSize = Number(pageSize);

  if (!Number.isFinite(parsedPageSize) || parsedPageSize < 1) {
    return DEFAULT_PAGE_SIZE;
  }

  return Math.min(Math.floor(parsedPageSize), MAX_PAGE_SIZE);
};

const createError = (
  status: number,
  reason: GuestbookServiceError['reason']
): GuestbookServiceError => {
  return {
    ok: false,
    status,
    reason,
  };
};

const validateEditPermission = (id: string, editToken: string) => {
  const entry = guestbookRepository.findById(id);

  if (!entry) {
    return createError(404, 'not_found');
  }

  const savedToken = guestbookRepository.getEditToken(id);

  if (!savedToken || savedToken !== editToken) {
    return createError(401, 'unauthorized');
  }

  if (Date.now() - entry.createdAt > EDIT_WINDOW_MS) {
    return createError(403, 'expired');
  }

  return entry;
};

export const guestbookService = {
  list: ({ page, pageSize }: { page: unknown; pageSize: unknown }): GuestbookListResponseDto => {
    const normalizedPage = normalizePage(page);
    const normalizedPageSize = normalizePageSize(pageSize);
    const items = guestbookRepository.findPage(normalizedPage, normalizedPageSize);

    return {
      ok: true,
      items: items.map(toGuestbookEntryDto),
      totalCount: guestbookRepository.count(),
      page: normalizedPage,
      pageSize: normalizedPageSize,
    };
  },

  create: (
    payload: GuestbookCreateRequestDto
  ): GuestbookCreateResponseDto | GuestbookServiceError => {
    const entry: GuestbookEntryRecord = {
      id: randomUUID(),
      name: payload.name ?? '',
      content: payload.content,
      createdAt: Date.now(),
      editedAt: null,
    };

    const editToken = createEditToken();
    const createdEntry = guestbookRepository.create(entry, editToken);

    return {
      ok: true,
      item: toGuestbookEntryDto(createdEntry),
      editToken,
    };
  },

  update: (
    id: string,
    payload: GuestbookUpdateRequestDto
  ): GuestbookUpdateResponseDto | GuestbookServiceError => {
    const entryOrError = validateEditPermission(id, payload.editToken);

    if ('ok' in entryOrError && !entryOrError.ok) {
      return entryOrError;
    }

    const updatedEntry = guestbookRepository.update(id, {
      name: payload.name ?? '',
      content: payload.content,
      editedAt: Date.now(),
    });

    if (!updatedEntry) {
      return createError(404, 'not_found');
    }

    return {
      ok: true,
      item: toGuestbookEntryDto(updatedEntry),
    };
  },

  remove: (
    id: string,
    payload: GuestbookDeleteRequestDto
  ): GuestbookDeleteResponseDto | GuestbookServiceError => {
    const entryOrError = validateEditPermission(id, payload.editToken);

    if ('ok' in entryOrError && !entryOrError.ok) {
      return entryOrError;
    }

    const isRemoved = guestbookRepository.remove(id);

    if (!isRemoved) {
      return createError(404, 'not_found');
    }

    return {
      ok: true,
    };
  },
};
