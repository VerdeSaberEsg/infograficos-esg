import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import { lookupRouter } from './api/routes/lookup.js';
import { exportRouter } from './api/routes/export.js';
import { fieldDefinitions, SCHEMA_VERSION } from './schema/fields.js';

const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN;

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", ...(process.env.CSP_CONNECT_SRC?.split(',') ?? [])],
      imgSrc: ["'self'", 'data:'],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      frameAncestors: ["'none'"],
      objectSrc: ["'none'"]
    }
  },
  referrerPolicy: { policy: 'no-referrer' },
  crossOriginEmbedderPolicy: true,
  crossOriginResourcePolicy: { policy: 'same-origin' }
}));

app.use((req, res, next) => {
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
  next();
});

app.use(
  cors({
    origin: allowedOrigin ? [allowedOrigin] : undefined,
    credentials: false
  })
);

app.use(express.json());
app.use(morgan('combined'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/ready', (req, res) => {
  res.json({ status: 'ready', schema_version: SCHEMA_VERSION, fields: fieldDefinitions.length });
});

app.use('/api/lookup', lookupRouter);
app.use('/api/export', exportRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.listen(env.PORT, () => {
  console.log(`Server listening on ${env.PORT}`);
});
