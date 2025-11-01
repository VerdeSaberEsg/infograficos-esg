import { Router } from 'express';
import PDFDocument from 'pdfkit';
import { isValidCnpj, sanitizeCnpj } from '../../utils/cnpj.js';
import { performLookup } from '../../services/lookupService.js';

export const exportRouter = Router();

const buildFileName = (cnpj: string, extension: 'json' | 'pdf'): string => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  return `mvp_esg_${cnpj}_${timestamp}.${extension}`;
};

exportRouter.get('/json/:cnpj', async (req, res) => {
  const rawCnpj = String(req.params.cnpj ?? '');
  if (!isValidCnpj(rawCnpj)) {
    return res.status(400).json({ message: 'CNPJ inválido' });
  }
  const sanitized = sanitizeCnpj(rawCnpj);
  const lookup = await performLookup(sanitized);
  const fileName = buildFileName(sanitized, 'json');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Type', 'application/json');
  return res.send(JSON.stringify(lookup, null, 2));
});

exportRouter.get('/pdf/:cnpj', async (req, res) => {
  const rawCnpj = String(req.params.cnpj ?? '');
  if (!isValidCnpj(rawCnpj)) {
    return res.status(400).json({ message: 'CNPJ inválido' });
  }
  const sanitized = sanitizeCnpj(rawCnpj);
  const lookup = await performLookup(sanitized);
  const fileName = buildFileName(sanitized, 'pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Type', 'application/pdf');
  const doc = new PDFDocument({ size: 'A4', margin: 48 });
  doc.pipe(res);

  doc.fontSize(18).text('Relatório ESG Consolidado', { align: 'left' });
  doc.moveDown();
  doc.fontSize(12).text(`CNPJ: ${lookup.cnpj}`);
  doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'UTC' })} UTC`);
  doc.text(`Schema: ${lookup.schema_version}`);
  doc.moveDown();

  lookup.fields.forEach((field) => {
    doc.fontSize(11).fillColor('#000000').text(`${field.id}. ${field.label}`, { continued: false });
    if (field.data) {
      doc.fontSize(10).fillColor('#333333').text(`Valor: ${field.data.value}`);
      doc.text(`Fonte: ${field.data.source_name}`);
      doc.text(`URL: ${field.data.source_url}`);
      doc.text(`Coletado em: ${field.data.fetched_at}`);
      doc.text(`HTTP: ${field.data.http_status}`);
    } else if (field.failure) {
      doc.fontSize(10).fillColor('#666666').text(`Falha: ${field.failure.reason}`);
      if (field.failure.error) {
        doc.text(`Erro: ${field.failure.error}`);
      }
      if (field.failure.http_status) {
        doc.text(`HTTP: ${field.failure.http_status}`);
      }
    }
    doc.moveDown(0.5);
  });

  doc.end();
});
