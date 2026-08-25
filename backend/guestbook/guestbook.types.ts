export type GuestbookEntryRecord = {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  editedAt: number | null;
};

export type GuestbookEntryDto = {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  editedAt: number | null;
};

export type GuestbookListResponseDto = {
  ok: true;
  items: GuestbookEntryDto[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export type GuestbookCreateRequestDto = {
  name?: string;
  content: string;
};

export type GuestbookCreateResponseDto = {
  ok: true;
  item: GuestbookEntryDto;
  editToken: string;
};

export type GuestbookUpdateRequestDto = {
  name?: string;
  content: string;
  editToken: string;
};

export type GuestbookUpdateResponseDto = {
  ok: true;
  item: GuestbookEntryDto;
};

export type GuestbookDeleteRequestDto = {
  editToken: string;
};

export type GuestbookDeleteResponseDto = {
  ok: true;
};

export type GuestbookErrorReason = 'empty' | 'invalid' | 'expired' | 'unauthorized' | 'not_found';

export type GuestbookServiceError = {
  ok: false;
  status: number;
  reason: GuestbookErrorReason;
};
