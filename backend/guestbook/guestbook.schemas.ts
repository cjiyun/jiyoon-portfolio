import { z } from 'zod';

const NAME_MAX_LENGTH = 20;
const CONTENT_MAX_LENGTH = 200;

const nameSchema = z.string().trim().max(NAME_MAX_LENGTH).optional();
const contentSchema = z.string().trim().min(1).max(CONTENT_MAX_LENGTH);
const editTokenSchema = z.string().min(1);

export const guestbookCreateRequestSchema = z
  .object({
    name: nameSchema,
    content: contentSchema,
  })
  .strict();

export const guestbookUpdateRequestSchema = z
  .object({
    name: nameSchema,
    content: contentSchema,
    editToken: editTokenSchema,
  })
  .strict();

export const guestbookDeleteRequestSchema = z
  .object({
    editToken: editTokenSchema,
  })
  .strict();
