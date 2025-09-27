'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '../components/Card';
import cls from '../components/ui.module.css';
import { formatCNPJ, isValidCNPJ, normalizeCNPJ } from '../../../packages/shared/cnpj.js';

const schema = z.object({
  cnpj: z
    .string()
    .min(1, 'Informe o CNPJ')
    .refine((value) => isValidCNPJ(value), { message: 'CNPJ inválido' })
});

type FormValues = z.infer<typeof schema>;

export default function HomePage() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { cnpj: '' }
  });
  const [pendencias, setPendencias] = useState<string[]>([]);

  useEffect(() => {
    let cancelado = false;
    fetch('/api/v1/status')
      .then((response) => (response.ok ? response.json() : { pendencias: [] }))
      .then((body) => {
        if (!cancelado && Array.isArray(body.pendencias)) {
          setPendencias(body.pendencias);
        }
      })
      .catch(() => {
        if (!cancelado) setPendencias([]);
      });
    return () => {
      cancelado = true;
    };
  }, []);

  const onSubmit = handleSubmit(({ cnpj }) => {
    const normalizado = normalizeCNPJ(cnpj);
    router.push(`/empresa/${normalizado}`);
  });

  const pendenciasDescricao = useMemo(() => {
    if (pendencias.length === 0) return null;
    return `Configure as variáveis: ${pendencias.join(', ')}`;
  }, [pendencias]);

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '48px min(8vw, 120px)'
      }}
    >
      <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Sistema ESG Empresarial Brasileiro</h1>
      <p style={{ maxWidth: 640, fontSize: '1.1rem', margin: 0 }}>
        Consulte dados ESG, sociais e de governança provenientes exclusivamente de fontes oficiais.
      </p>
      <Card>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label htmlFor="cnpj" style={{ fontWeight: 600, fontSize: '1.1rem' }}>
            Informe o CNPJ
          </label>
          <input
            id="cnpj"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="00.000.000/0000-00"
            {...register('cnpj')}
            onChange={(event) => {
              const digits = normalizeCNPJ(event.target.value);
              const masked = formatCNPJ(digits);
              setValue('cnpj', masked, { shouldValidate: true });
            }}
            style={{
              fontSize: '1.4rem',
              padding: '14px 18px',
              borderRadius: '12px',
              border: '1px solid var(--card-border)',
              background: 'var(--card-bg)'
            }}
          />
          {errors.cnpj ? (
            <span style={{ color: '#d70015', fontSize: '0.95rem' }}>{errors.cnpj.message}</span>
          ) : null}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              alignSelf: 'flex-start',
              padding: '12px 28px',
              borderRadius: '999px',
              border: 'none',
              background: '#0071e3',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              opacity: isSubmitting ? 0.5 : 1,
              transition: 'opacity var(--transition)'
            }}
          >
            Consultar
          </button>
        </form>
      </Card>
      {pendenciasDescricao ? (
        <Card>
          <div className={cls.section}>
            <h2 className={cls.sectionTitle}>Configuração necessária</h2>
            <p style={{ margin: 0, fontSize: '1rem' }}>{pendenciasDescricao}</p>
            <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.7 }}>
              O painel exibirá dados apenas após configurar as credenciais oficiais no backend.
            </p>
          </div>
        </Card>
      ) : null}
    </main>
  );
}
