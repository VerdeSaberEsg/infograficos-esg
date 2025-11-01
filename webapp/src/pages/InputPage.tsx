import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { lookupCnpj } from '../services/ApiClient';
import { useLookup } from '../services/LookupContext';
import { applyCnpjMask, isValidCnpj, sanitizeCnpj } from '../utils/CNPJValidator';

const InputPage = () => {
  const [cnpj, setCnpj] = useState('');
  const [tosAccepted, setTosAccepted] = useState(false);
  const navigate = useNavigate();
  const { setResponse } = useLookup();

  const mutation = useMutation({
    mutationFn: lookupCnpj,
    onSuccess: (data) => {
      setResponse(data);
      navigate('/alerts');
    }
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sanitized = sanitizeCnpj(cnpj);
    if (!isValidCnpj(sanitized)) {
      return;
    }
    mutation.mutate(sanitized);
  };

  const isButtonDisabled = !tosAccepted || !isValidCnpj(cnpj);

  return (
    <section className="card" aria-labelledby="consulta-title">
      <header>
        <h2 id="consulta-title" style={{ margin: 0, fontFamily: 'var(--font-family-display)' }}>
          Consultar CNPJ
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-sm)' }}>
          Informe um CNPJ válido com 14 dígitos. Todos os dados retornados são coletados apenas de
          portais oficiais autorizados.
        </p>
      </header>
      <form onSubmit={handleSubmit} style={{ marginTop: 'var(--spacing-xl)' }}>
        <label htmlFor="cnpj-input" style={{ display: 'block', fontWeight: 600 }}>
          CNPJ
        </label>
        <input
          id="cnpj-input"
          name="cnpj"
          inputMode="numeric"
          autoComplete="off"
          aria-describedby="cnpj-help"
          value={applyCnpjMask(cnpj)}
          onChange={(event) => setCnpj(event.target.value)}
          placeholder="00.000.000/0000-00"
          style={{
            marginTop: 'var(--spacing-xs)',
            width: '100%',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            fontSize: '1.1rem'
          }}
        />
        <p id="cnpj-help" style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
          O número será validado e higienizado antes do envio.
        </p>
        <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
          <input
            type="checkbox"
            checked={tosAccepted}
            onChange={(event) => setTosAccepted(event.target.checked)}
          />
          <span>
            Confirmo que li e aceito os termos de uso: coleta apenas em fontes oficiais, sem
            armazenamento de dados pessoais após a sessão.
          </span>
        </label>
        <div style={{ marginTop: 'var(--spacing-xl)', display: 'flex', gap: 'var(--spacing-md)' }}>
          <button
            type="submit"
            disabled={isButtonDisabled || mutation.isPending}
            style={{
              padding: 'var(--spacing-sm) var(--spacing-xl)',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'var(--color-primary)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
              boxShadow: 'var(--shadow-soft)',
              transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
            }}
          >
            {mutation.isPending ? 'Consultando…' : 'Consultar'}
          </button>
          {mutation.isError && (
            <span role="alert" style={{ color: '#b91c1c', fontWeight: 600 }}>
              Não foi possível consultar os dados oficiais agora. Tente novamente.
            </span>
          )}
        </div>
      </form>
    </section>
  );
};

export default InputPage;
