import { fieldDefinitions, SCHEMA_VERSION } from '../schema/fields.js';
import { FieldResult, LookupResponse } from '../types/fields.js';
import { applyEvidenceGate } from './evidenceGate.js';
import { allowlistedDomains } from '../config/env.js';
import { fetchReceitaCnpj } from '../connectors/receitaCnpjConnector.js';
import { fetchReceitaSimples } from '../connectors/receitaSimplesConnector.js';
import { fetchPncp } from '../connectors/pncpConnector.js';
import { fetchPgfn } from '../connectors/pgfnConnector.js';
import { fetchTstCndt } from '../connectors/tstCndtConnector.js';
import { fetchReceitaCnd } from '../connectors/receitaCndConnector.js';
import { fetchCaixaCrf } from '../connectors/caixaCrfConnector.js';
import { fetchCaged } from '../connectors/cagedConnector.js';
import { fetchRais } from '../connectors/raisConnector.js';
import { fetchMte } from '../connectors/mteConnector.js';
import { fetchIbama } from '../connectors/ibamaConnector.js';
import { fetchCtf } from '../connectors/ctfConnector.js';
import { fetchSinaflor } from '../connectors/sinaflorConnector.js';
import { fetchProdes } from '../connectors/prodesConnector.js';
import { fetchIcmbio } from '../connectors/icmbioConnector.js';
import { ConnectorOutput } from '../connectors/baseConnector.js';
import { validateLookupResponse } from '../schema/jsonSchema.js';

const connectorExecutors: Array<(cnpj: string) => Promise<ConnectorOutput>> = [
  fetchReceitaCnpj,
  fetchReceitaSimples,
  fetchPncp,
  fetchPgfn,
  fetchTstCndt,
  fetchReceitaCnd,
  fetchCaixaCrf,
  fetchCaged,
  fetchRais,
  fetchMte,
  fetchIbama,
  fetchCtf,
  fetchSinaflor,
  fetchProdes,
  fetchIcmbio
];

export const performLookup = async (cnpj: string): Promise<LookupResponse> => {
  const startedAt = new Date();
  const connectorResults = await Promise.allSettled(connectorExecutors.map((fn) => fn(cnpj)));
  const fieldResults: FieldResult[] = fieldDefinitions.map((definition) => ({
    ...definition,
    data: null,
    failure: {
      reason: 'indisponível',
      http_status: 503,
      error: 'Dados não retornados'
    }
  }));

  connectorResults.forEach((result) => {
    if (result.status !== 'fulfilled') {
      return;
    }
    const connectorOutput = result.value;
    Object.entries(connectorOutput.successes).forEach(([key, value]) => {
      const field = fieldResults.find((item) => item.key === key);
      if (!field) {
        return;
      }
      field.data = value;
      field.failure = undefined;
    });
    Object.entries(connectorOutput.failures).forEach(([key, failure]) => {
      const field = fieldResults.find((item) => item.key === key);
      if (!field) {
        return;
      }
      if (!field.data) {
        field.failure = failure;
      }
    });
  });

  const gatedFields = applyEvidenceGate(fieldResults, { allowDomains: allowlistedDomains });

  const totalSuccesses = gatedFields.filter((field) => field.data).length;
  const totalFailures = gatedFields.length - totalSuccesses;

  const payload: LookupResponse = {
    cnpj,
    schema_version: SCHEMA_VERSION,
    fetched_at: startedAt.toISOString(),
    fields: gatedFields,
    metrics: {
      total_success_fields: totalSuccesses,
      total_failed_fields: totalFailures,
      started_at: startedAt.toISOString(),
      completed_at: new Date().toISOString()
    }
  };
  validateLookupResponse(payload);
  return payload;
};
