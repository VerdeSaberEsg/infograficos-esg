# infograficos-esg

## Estado atual

Este repositório contém a estrutura inicial do "Sistema ESG Empresarial Brasileiro", porém **não possui integrações reais com as fontes oficiais** nem scripts completos para subir front-end e API. Os adaptadores em `apps/api/src/adapters` devolvem respostas vazias ou indisponíveis porque dependem de credenciais governamentais (RFB, IBAMA, MTE, etc.) que não são distribuídas neste repositório. Portanto, nenhuma consulta retorna dados ESG reais por padrão.

Consulte o roteiro detalhado em [`docs/real_mvp_plan.md`](docs/real_mvp_plan.md) para entender os passos necessários até um MVP operacional em produção.

## Desenvolvimento

O projeto foi iniciado com suporte a `npm`. Para instalar dependências e executar os testes existentes:

```bash
npm install
npm test
```

> **Importante:** os comandos de desenvolvimento do front-end e do backend ainda precisam ser configurados (`next dev`, `tsx apps/api/...`, etc.) durante a implementação real descrita no plano do MVP.
