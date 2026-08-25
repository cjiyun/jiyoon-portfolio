import cors from 'cors';
import express, { type Request, type Response } from 'express';
import { guestbookRouter } from './guestbook/guestbook.routes';

const PORT = Number(process.env.PORT ?? 8080);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? 'http://localhost:5173';

const app = express();

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.use('/guestbook', guestbookRouter);

app.listen(PORT, () => {
  console.log(`Guestbook API server running on http://localhost:${PORT}`);
});
