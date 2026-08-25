export type GuestbookEntry = {
  id: string;
  name: string;
  content: string;
  createdAt: number; // ms
  editedAt: number | null;
};

export type GuestbookEntryInput = {
  name?: string;
  content: string;
};

export type GuestbookActionFailReason =
  | 'empty'
  | 'invalid'
  | 'expired'
  | 'unauthorized'
  | 'not_found'
  | 'network'
  | 'unknown';

export type GuestbookActionResult = { ok: true } | { ok: false; reason: GuestbookActionFailReason };
