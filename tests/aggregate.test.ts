import { obterPainelEmpresa } from '../apps/api/src/services/empresa.aggregate';
import type { CampoComMetadado } from '../packages/shared/types';

describe('Agregador de empresa', () => {
  it('retorna indisponibilidade quando integrações não estão configuradas', async () => {
    const resultado = await obterPainelEmpresa('12544992000105');
    expect(resultado.painel.campos.length).toBeGreaterThan(0);
    const campoAmbiental = resultado.painel.campos.find(
      (campo: CampoComMetadado) => campo.codigo === 'E001'
    );
    expect(campoAmbiental?.dado.indisponivel?.motivo).toBeDefined();
  });
});
