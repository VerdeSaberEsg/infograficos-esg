# Plano para Entregar o MVP Real do Sistema ESG Empresarial Brasileiro

Este documento descreve as etapas necessárias para transformar o repositório atual em um MVP funcional que colete dados reais das fontes oficiais, respeitando LGPD, requisitos de segurança e a metodologia do catálogo de campos.

## 1. Preparação de Infraestrutura

1. **Provisionar banco de dados PostgreSQL gerenciado** com suporte a TLS (ex.: RDS, Cloud SQL) e configurar variáveis `DATABASE_URL`, `SHADOW_DATABASE_URL` para ambientes de desenvolvimento, homologação e produção.
2. **Automatizar pipelines CI/CD** com execução de Jest, Playwright e lint, além de migrações Prisma (`prisma migrate deploy`) antes do start do backend.
3. **Configurar armazenamento seguro de segredos** (Vault, AWS Secrets Manager) e injetar variáveis de ambiente para cada adaptador. Nenhuma chave deve ficar versionada.

## 2. Backend – Orquestração e Persistência

1. **Reescrever `apps/api` com Fastify ou Express** adicionando middlewares de logging sem PII, rate limiting (`@fastify/rate-limit`) e compressão.
2. **Criar camada de repositórios Prisma**: tabelas `Empresa`, `CampoValor`, `Coleta` e `FonteCache`. Implementar cache com TTL por fonte (configurável via `.env`) e auditoria contendo `origemConsulta`, `cnpj` (hash) e payload bruto.
3. **Implementar adaptadores reais**:
   - Cada arquivo em `src/adapters` utiliza `undici`/`axios` com `AbortController` para timeout configurável e retries exponenciais (`p-retry`).
   - Mapear respostas para `CampoValorColetado`, preenchendo metadados de fonte e `coletadoEm` retornado pela API quando disponível.
   - Tratar autenticação (OAuth2, JWT, certificados) conforme documentação de cada órgão; registrar pendências amigáveis quando credencial estiver ausente.
4. **Serviço agregador** (`empresa.aggregate.ts`):
   - Consultar cache antes das chamadas; para campos expirados, disparar coleta paralela com `Promise.allSettled`.
   - Mesclar resultados respeitando prioridade por fonte e aplicando derivados somente quando todos os insumos estiverem disponíveis.
   - Persistir resultados e atualizar auditoria.
5. **Segurança**:
   - Masking/Hash para dados de pessoa física com `crypto.scrypt` + salt único por instalação.
   - Sanitização de logs (remover cabeçalhos sensíveis) e ativar CSP para SSR.

## 3. Integrações Prioritárias

1. **Receita Federal (RFB)**: consumir API de dados cadastrais/QSA, Simples Nacional e emissão de certidões utilizando certificados ICP-Brasil (via `node-forge`).
2. **IBAMA/CTF**: implementar consulta REST autenticada (`client_id`/`client_secret`) e mapear campos E001–E015.
3. **MTE (Novo CAGED/RAIS)**: configurar integrações GOV.BR com OAuth2 client credentials; tratar volumes paginados.
4. **eSocial (S-2210/S-2240)**: consumir serviços SOAP/REST com certificado A1; converter XML para JSON (`fast-xml-parser`).
5. **CGU (CEIS/CNEP/CEPIM)**: utilizar endpoints de dados abertos e planilhas CSV; aplicar `stream` para leitura eficiente.
6. **Demais fontes**: priorizar PGFN/CADIN, FGTS/CRF (Caixa), PNCP/SICAF, CVM, CNJ, TSE, com fallback para dados abertos em CSV quando API não existir, mantendo cadeia de custódia.

## 4. Front-end (Next.js App Router)

1. **Configurar Next.js com SSR/ISR** e suporte a tema claro/escuro (`next-themes`).
2. **Tela de CNPJ**:
   - `react-hook-form` + `zodResolver` com validação sincrona do CNPJ.
   - Detectar `pendencias` retornadas de `/api/v1/status` e exibir cards de configuração.
3. **Tela do Painel**:
   - Renderizar seções Ambientais/Sociais/Governança/Compliance usando componentes `Card`, `Section`, `FieldRow`.
   - Utilizar animações CSS com `prefers-reduced-motion` e tipografia HIG.
   - Exibir links apenas quando `fonte.url` existir.
4. **Acessibilidade**: labels associados, foco visível, contraste mínimo 4.5:1, testes com `@axe-core/playwright`.

## 5. Observabilidade e Operação

1. **Adicionar métricas Prometheus** (tempo de coleta, falhas por fonte) e traços OpenTelemetry.
2. **Logs estruturados** (JSON) integrados com ELK/Grafana.
3. **Alertas** para expirados de credenciais e taxas de erro.

## 6. Roadmap de Entregas

1. Semana 1-2: infraestrutura, setup CI/CD, schema Prisma, rotas básicas.
2. Semana 3-5: adaptadores RFB, IBAMA, PGFN, CAIXA e cache.
3. Semana 6-8: integrações trabalhistas (CAGED/RAIS/eSocial) + derivados sociais.
4. Semana 9-10: governança (CGU, CNJ, CVM, PNCP) + compliance estadual.
5. Semana 11-12: polimento UI, testes e endurecimento de segurança (pentest, revisão LGPD).

## 7. Entregáveis Finais

- Aplicação web SSR acessível e responsiva.
- API com autenticação mTLS/OAuth2, cache e auditoria.
- Testes unitários, integração e E2E passando no CI.
- Documentação operacional e manual LGPD.

> **Observação**: nenhuma credencial real é fornecida neste repositório. Para ativar cada adaptador, preencher variáveis `*_BASE_URL` e `*_TOKEN` conforme contrato oficial do órgão responsável.
