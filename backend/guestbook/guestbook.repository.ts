import type { GuestbookEntryRecord } from './guestbook.types';

let guestbookEntries: GuestbookEntryRecord[] = [];
const editTokenMap = new Map<string, string>();

export const guestbookRepository = {
  findPage: (page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const sortedEntries = [...guestbookEntries].sort((a, b) => b.createdAt - a.createdAt);

    return sortedEntries.slice(start, start + pageSize);
  },

  count: () => {
    return guestbookEntries.length;
  },

  findById: (id: string) => {
    return guestbookEntries.find(entry => entry.id === id) ?? null;
  },

  create: (entry: GuestbookEntryRecord, editToken: string) => {
    guestbookEntries = [entry, ...guestbookEntries];
    editTokenMap.set(entry.id, editToken);

    return entry;
  },

  update: (id: string, nextEntry: Pick<GuestbookEntryRecord, 'name' | 'content' | 'editedAt'>) => {
    const entry = guestbookEntries.find(item => item.id === id);

    if (!entry) {
      return null;
    }

    entry.name = nextEntry.name;
    entry.content = nextEntry.content;
    entry.editedAt = nextEntry.editedAt;

    return entry;
  },

  remove: (id: string) => {
    const prevLength = guestbookEntries.length;

    guestbookEntries = guestbookEntries.filter(entry => entry.id !== id);
    editTokenMap.delete(id);

    return guestbookEntries.length !== prevLength;
  },

  getEditToken: (id: string) => {
    return editTokenMap.get(id) ?? '';
  },
};
