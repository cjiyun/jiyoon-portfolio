import { Router, type Response } from 'express';
import { guestbookService } from './guestbook.service';
import {
  guestbookCreateRequestSchema,
  guestbookDeleteRequestSchema,
  guestbookUpdateRequestSchema,
} from './guestbook.schemas';
import type { GuestbookServiceError } from './guestbook.types';

export const guestbookRouter = Router();

type GuestbookSuccessResult = {
  ok: true;
};

const isGuestbookServiceError = (
  result: GuestbookSuccessResult | GuestbookServiceError
): result is GuestbookServiceError => {
  return !result.ok;
};

const sendResult = <T extends GuestbookSuccessResult>(
  res: Response,
  result: T | GuestbookServiceError
) => {
  if (isGuestbookServiceError(result)) {
    res.status(result.status).json({ reason: result.reason });
    return;
  }

  res.json(result);
};

guestbookRouter.get('/', (req, res) => {
  const result = guestbookService.list({
    page: req.query.page,
    pageSize: req.query.pageSize,
  });

  res.json(result);
});

guestbookRouter.post('/', (req, res) => {
  const parsed = guestbookCreateRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ reason: 'invalid' });
    return;
  }

  const result = guestbookService.create(parsed.data);

  sendResult(res, result);
});

guestbookRouter.put('/:id', (req, res) => {
  const parsed = guestbookUpdateRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ reason: 'invalid' });
    return;
  }

  const result = guestbookService.update(req.params.id, parsed.data);

  sendResult(res, result);
});

guestbookRouter.delete('/:id', (req, res) => {
  const parsed = guestbookDeleteRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ reason: 'invalid' });
    return;
  }

  const result = guestbookService.remove(req.params.id, parsed.data);

  sendResult(res, result);
});
