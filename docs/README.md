# MVP ESG Oficial

[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## Visão geral

Aplicação full-stack que consulta dados ESG diretamente de fontes oficiais brasileiras com coleta controlada, consolida 80 campos normalizados e entrega visual premium inspirado na Apple.

- **Front-end**: React + TypeScript + Vite, design tokens e animações sutis.
- **Back-end**: Node.js + TypeScript, coleta resiliente com rate limit, cache e circuito de proteção.
- **Exports**: JSON e PDF nomeados `mvp_esg_{cnpj}_{timestamp}`.
- **Segurança**: CSP estrita, allowlist de domínios oficiais, gate de evidências, logs sem PII.

## Instalação muito rápida (Windows)

1. Baixe o repositório e extraia em uma pasta sem espaços.
2. Abra o Explorer, dê duplo clique em `scripts/start.bat` (ou clique direito > *Executar com PowerShell* em `start.ps1`).
3. Caso o Windows alerte sobre *ExecutionPolicy*, abra PowerShell como administrador e execute `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` uma única vez.
4. Aguarde o health-check automático. O navegador será aberto em `http://localhost:5173` (porta ajustada automaticamente se ocupada).
5. No assistente inicial configure as variáveis `.env` com os endpoints oficiais desejados e teste cada conector.

### Fallback sem contêiner

Se Docker Desktop, Rancher Desktop (modo Docker/Moby) ou Podman Desktop não estiverem instalados, o script aciona automaticamente `start-nodocker.ps1`, instala Node LTS via **nvs**, pnpm e sobe server + web em processos locais.

## Outros ambientes

- **Docker/Podman manual**
  ```powershell
  cd infra
  docker compose up --build
  ```
- **GitHub Codespaces**: clique no badge “Open in Codespaces” ou use `codespaces/new`. O container já instala pnpm e expõe portas 8080/5173.
- **Render (Deploy 1-clique)**: clique no badge “Deploy to Render”, configure variáveis de ambiente oficiais e publique os dois serviços (`web` e `server`).

## Estrutura de diretórios

```
infograficos-esg/
├── .devcontainer/
├── docs/
│   └── README.md
├── infra/
│   ├── docker-compose.yml
│   ├── Dockerfile.server
│   ├── Dockerfile.web
│   └── render.yaml
├── scripts/
│   ├── start.ps1 / start.bat
│   ├── stop.ps1 / stop.bat
│   ├── start-nodocker.ps1
│   └── doctor.ps1
├── server/
│   └── src/...
└── webapp/
    └── src/...
```

## Comandos principais

```bash
# Instala dependências (root)
pnpm install

# Backend (dev, testes)
pnpm --filter esg-mvp-server dev
pnpm --filter esg-mvp-server test

# Frontend (dev, testes)
pnpm --filter esg-mvp-webapp dev
pnpm --filter esg-mvp-webapp test
```

## Fluxo recomendado

1. Rode `scripts/doctor.ps1` para checagem de engine, portas e `.env`.
2. Ajuste `.env` com os endpoints oficiais (domínios *.gov.br / *.jus.br / *.leg.br).
3. Inicie com `start.ps1` (ou `start-nodocker.ps1` em ambiente sem contêiner).
4. Consulte um CNPJ válido, valide os 80 campos com botões “Ver fonte”.
5. Exporte JSON e PDF e arquive as evidências.

## Testes e qualidade

- **Unitários**: validadores de CNPJ, gate anti-simulação, fluxo sem configuração.
- **Integração a seco**: `performLookup` sem endpoints retorna “indisponível” conforme exigido.
- **Linters**: ESLint + Prettier em ambos os pacotes.
- **CI recomendado**: rodar `pnpm lint && pnpm test -- --run` e verificar ausência de termos proibidos na UI.

## Prints recomendados

- **Página de entrada** após carregar o assistente e antes da consulta (CNPJ em branco).
- **Página de alertas** com um CNPJ válido mostrando chips de status e botões “Ver fonte”.
- **Página de dados completos** destacando exportações JSON/PDF. Utilize “Salvar PDF (impressão)” para registrar a versão responsiva sem dados sigilosos.

## Critérios de aceite atendidos

- 80 campos normalizados, schema validado via JSON Schema `lookup-response.json`.
- Gatilho de evidência impede exibição sem URL oficial, HTTP 2xx, hash e ISO timestamp.
- Exportações `mvp_esg_{cnpj}_{timestamp}` em JSON/PDF.
- Scripts Windows com detecção de Docker/Rancher/Podman e fallback Node LTS.
- Checklist de uso final incluído no README principal (ver seção “Checklist do usuário final”).
- Acessibilidade: foco visível, contraste AA, navegação por teclado, rótulos ARIA.
