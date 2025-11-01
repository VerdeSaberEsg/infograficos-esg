import { Router } from 'express';
import { isValidCnpj, sanitizeCnpj } from '../../utils/cnpj.js';
import { performLookup } from '../../services/lookupService.js';

export const lookupRouter = Router();

lookupRouter.get('/:cnpj', async (req, res) => {
  const rawCnpj = String(req.params.cnpj ?? '');
  if (!isValidCnpj(rawCnpj)) {
    return res.status(400).json({ message: 'CNPJ inválido' });
  }
  const sanitized = sanitizeCnpj(rawCnpj);
  try {
    const result = await performLookup(sanitized);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao consultar dados oficiais' });
  }
});
