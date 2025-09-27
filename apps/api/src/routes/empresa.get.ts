import http from 'node:http';
import { obterPainelEmpresa, avaliarPendenciasAmbiente } from '../services/empresa.aggregate.js';

const server = http.createServer(async (req, res) => {
  if (!req.url || req.method !== 'GET') {
    res.statusCode = 404;
    res.end('Not found');
    return;
  }

  if (req.url === '/api/v1/status') {
    const pendencias = await avaliarPendenciasAmbiente();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ pendencias }));
    return;
  }

  const match = req.url.match(/^\/api\/v1\/empresa\/(\d{14})$/);
  if (!match) {
    res.statusCode = 404;
    res.end('Not found');
    return;
  }

  try {
    const resultado = await obterPainelEmpresa(match[1]);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(resultado));
  } catch (error) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: error instanceof Error ? error.message : 'Erro inesperado'
    }));
  }
});

export default server;
