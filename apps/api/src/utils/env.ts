import { z } from 'zod';

const schema = z.object({
  RFB_BASE_URL: z.string().optional(),
  RFB_TOKEN: z.string().optional(),
  IBAMA_BASE_URL: z.string().optional(),
  IBAMA_TOKEN: z.string().optional()
});

export type EnvConfig = z.infer<typeof schema>;

export function loadEnv(): EnvConfig {
  return schema.parse({
    RFB_BASE_URL: process.env.RFB_BASE_URL?.trim() || undefined,
    RFB_TOKEN: process.env.RFB_TOKEN?.trim() || undefined,
    IBAMA_BASE_URL: process.env.IBAMA_BASE_URL?.trim() || undefined,
    IBAMA_TOKEN: process.env.IBAMA_TOKEN?.trim() || undefined
  });
}
