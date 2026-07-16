export type GuestbookEntry = {
  id: string;
  name: string;
  content: string;
  createdAt: number; // ms
  editedAt: number | null;
};

export type GuestbookActionFailReason =
  | 'empty'
  | 'expired'
  | 'unauthorized'
  | 'not_found'
  | 'network'
  | 'unknown';

export type GuestbookActionResult = { ok: true } | { ok: false; reason: GuestbookActionFailReason };
