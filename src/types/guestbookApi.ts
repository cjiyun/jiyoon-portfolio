// TODO: 실제 방명록 API 구현 후 연동 및 타입 수정

export type GuestbookEntryDto = {
  id: string;
  name?: string | null;
  content: string;
  createdAt: number;
  editedAt?: number | null;
  isHidden?: boolean;
  deletedAt?: number | null;
};

export type GuestbookListRequestDto = {
  page: number;
  pageSize: number;
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
  id: string;
  name?: string;
  content: string;
  editToken: string;
};

export type GuestbookUpdateResponseDto = {
  ok: true;
  item: GuestbookEntryDto;
};

export type GuestbookDeleteRequestDto = {
  id: string;
  editToken: string;
};

export type GuestbookDeleteResponseDto = {
  ok: true;
};

export type GuestbookErrorResponseDto = {
  reason?: string;
};
