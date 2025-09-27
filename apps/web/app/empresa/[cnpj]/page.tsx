import Section from '../../../components/Section';
import Card from '../../../components/Card';
import type { CampoComMetadado } from '../../../../../packages/shared/types.js';
import { obterPainelEmpresa } from '../../../../api/src/services/empresa.aggregate';

interface EmpresaPageProps {
  params: { cnpj: string };
}

function agruparPorSecao(campos: CampoComMetadado[]): Record<string, CampoComMetadado[]> {
  return campos.reduce<Record<string, CampoComMetadado[]>>((acc, campo) => {
    if (!acc[campo.secao]) acc[campo.secao] = [];
    acc[campo.secao].push(campo);
    return acc;
  }, {});
}

export default async function EmpresaPage({ params }: EmpresaPageProps) {
  const resultado = await obterPainelEmpresa(params.cnpj);
  const grupos = agruparPorSecao(resultado.painel.campos);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '48px min(8vw, 120px)'
      }}
    >
      <h1 style={{ fontSize: '2.2rem', margin: 0 }}>Painel ESG — {params.cnpj}</h1>
      {resultado.pendencias.length > 0 ? (
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h2 style={{ margin: 0 }}>Configuração necessária</h2>
            <p style={{ margin: 0 }}>
              Algumas integrações exigem credenciais oficiais: {resultado.pendencias.join(', ')}
            </p>
          </div>
        </Card>
      ) : null}
      <Section titulo="Ambiental" campos={grupos.Ambiental ?? []} />
      <Section titulo="Social" campos={grupos.Social ?? []} />
      <Section titulo="Governança" campos={grupos.Governanca ?? []} />
      <Section titulo="Compliance" campos={grupos.Compliance ?? []} />
    </main>
  );
}
