import { useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import SectionBlock from '../components/SectionBlock';
import FieldRow from '../components/FieldRow';
import Toolbar from '../components/Toolbar';
import { useLookup } from '../services/LookupContext';
import { exportJson, exportPdf, lookupCnpj } from '../services/ApiClient';
import { saveBlob } from '../utils/download';
import { triggerPrint } from '../utils/print';

const SECTION_TITLES: Record<string, { title: string; description: string }> = {
  CORE: {
    title: 'Core / Operacional',
    description: 'Identificação, endereço, regime tributário e relações com o PNCP.'
  },
  GOVERNANCA: {
    title: 'Governança',
    description: 'Quadro societário e certidões de regularidade fiscal.'
  },
  SOCIAL: {
    title: 'Social',
    description: 'Empregos, RAIS e fiscalização trabalhista.'
  },
  AMBIENTAL: {
    title: 'Ambiental',
    description: 'Licenças, autos de infração e monitoramento ambiental.'
  }
};

const AllDataPage = () => {
  const { response, setResponse } = useLookup();

  const refreshMutation = useMutation({
    mutationFn: lookupCnpj,
    onSuccess: (data) => setResponse(data)
  });

  const exportJsonMutation = useMutation({
    mutationFn: exportJson,
    onSuccess: (blob) => {
      if (response) {
        const fileName = `mvp_esg_${response.cnpj}_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
        saveBlob(blob, fileName);
      }
    }
  });

  const exportPdfMutation = useMutation({
    mutationFn: exportPdf,
    onSuccess: (blob) => {
      if (response) {
        const fileName = `mvp_esg_${response.cnpj}_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`;
        saveBlob(blob, fileName);
      }
    }
  });

  const groupedFields = useMemo(() => {
    if (!response) {
      return {} as Record<string, typeof response.fields>;
    }
    return response.fields.reduce<Record<string, typeof response.fields>>((acc, field) => {
      acc[field.section] = acc[field.section] ?? [];
      acc[field.section].push(field);
      return acc;
    }, {});
  }, [response]);

  if (!response) {
    return <SectionBlock title="Nenhum resultado" description="Realize uma consulta para visualizar os dados consolidados." />;
  }

  return (
    <div>
      <Toolbar
        actions={[
          {
            label: exportJsonMutation.isPending ? 'Exportando JSON…' : 'Exportar JSON',
            onClick: () => exportJsonMutation.mutate(response.cnpj),
            disabled: exportJsonMutation.isPending
          },
          {
            label: exportPdfMutation.isPending ? 'Exportando PDF…' : 'Exportar PDF',
            onClick: () => exportPdfMutation.mutate(response.cnpj),
            disabled: exportPdfMutation.isPending
          },
          {
            label: refreshMutation.isPending ? 'Atualizando…' : 'Atualizar dados',
            onClick: () => refreshMutation.mutate(response.cnpj),
            disabled: refreshMutation.isPending
          },
          {
            label: 'Salvar PDF (impressão)',
            onClick: () => triggerPrint()
          }
        ]}
      />
      {Object.entries(groupedFields).map(([section, fields]) => {
        const meta = SECTION_TITLES[section] ?? { title: section, description: '' };
        return (
          <SectionBlock key={section} title={meta.title} description={meta.description}>
            {fields.map((field) => (
              <FieldRow key={field.key} field={field} />
            ))}
          </SectionBlock>
        );
      })}
    </div>
  );
};

export default AllDataPage;
