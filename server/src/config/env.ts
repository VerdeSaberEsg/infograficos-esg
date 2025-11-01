import { z } from 'zod';

type SourceRateConfig = {
  maxRequestsPerMinute: number;
  concurrency: number;
  timeoutMs: number;
  cacheTtlMs: number;
};

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(8080)
});

export type Env = z.infer<typeof EnvSchema>;

const baseRateConfig: SourceRateConfig = {
  maxRequestsPerMinute: 60,
  concurrency: 3,
  timeoutMs: 8000,
  cacheTtlMs: 5 * 60 * 1000
};

export const env: Env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
});

export const allowlistedDomains: readonly string[] = [
  '.gov.br',
  '.jus.br',
  '.leg.br'
];

export const sourceRateDefaults: Record<string, SourceRateConfig> = {
  default: baseRateConfig
};

export const metricsWindowMs = 5 * 60 * 1000;
