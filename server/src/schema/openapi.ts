import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { lookupResponseSchema } from './jsonSchema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const openApi = {
  openapi: '3.1.0',
  info: {
    title: 'MVP ESG API',
    version: '1.0.0'
  },
  servers: [
    { url: 'http://localhost:8080', description: 'Local' }
  ],
  paths: {
    '/api/lookup/{cnpj}': {
      get: {
        summary: 'Consulta consolidada por CNPJ',
        parameters: [
          {
            name: 'cnpj',
            in: 'path',
            required: true,
            schema: { type: 'string', pattern: '^\\d{14}$' }
          }
        ],
        responses: {
          '200': {
            description: 'Resposta bem sucedida',
            content: {
              'application/json': {
                schema: lookupResponseSchema
              }
            }
          },
          '400': { description: 'CNPJ inválido' },
          '500': { description: 'Erro de coleta' }
        }
      }
    },
    '/api/export/json/{cnpj}': {
      get: {
        summary: 'Exporta JSON consolidado',
        parameters: [
          {
            name: 'cnpj',
            in: 'path',
            required: true,
            schema: { type: 'string', pattern: '^\\d{14}$' }
          }
        ],
        responses: {
          '200': { description: 'JSON para download' },
          '400': { description: 'CNPJ inválido' }
        }
      }
    },
    '/api/export/pdf/{cnpj}': {
      get: {
        summary: 'Exporta PDF consolidado',
        parameters: [
          {
            name: 'cnpj',
            in: 'path',
            required: true,
            schema: { type: 'string', pattern: '^\\d{14}$' }
          }
        ],
        responses: {
          '200': { description: 'PDF para download' },
          '400': { description: 'CNPJ inválido' }
        }
      }
    }
  }
};

const outputPath = resolve(__dirname, '../../../docs/openapi.json');
writeFileSync(outputPath, JSON.stringify(openApi, null, 2));
console.log('OpenAPI specification generated at docs/openapi.json');
