# MVP ESG Oficial

Aplicação de consulta ESG baseada exclusivamente em dados oficiais brasileiros. Veja instruções completas em [`docs/README.md`](docs/README.md).

## Guia rápido para iniciantes (Windows)

1. **Baixe o projeto**
   - Clique em “Code > Download ZIP”, extraia o conteúdo para uma pasta simples (ex.: `C:\ESG`).
   - Dê um duplo clique em `docs/README.md` para manter as instruções completas à mão.
2. **Verifique o ambiente automaticamente**
   - Clique duas vezes em `scripts/doctor.ps1`.
   - O script informa se você tem Docker Desktop, Rancher Desktop (modo Docker/Moby) ou Podman Desktop prontos. Caso não tenha nenhum, ele já sugere usar o modo sem contêiner.
   - Se o Windows pedir permissão, confirme a execução do PowerShell.
3. **Inicie com um clique**
   - Dê duplo clique em `scripts/start.bat` (ou `start.ps1`).
   - Se aparecer um alerta de execução de scripts, abra o PowerShell (menu Iniciar) e rode apenas uma vez: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
   - O script detecta o melhor engine, baixa as imagens ou instala Node LTS automaticamente e abre `http://localhost:5173` para você.
4. **Configure as fontes oficiais**
   - Ao abrir o navegador, siga o assistente inicial. Ele mostra exatamente quais campos precisam de configuração no arquivo `.env` (sem valores fictícios).
   - Use os botões de “Testar conector” para garantir que cada fonte oficial responde com HTTP 2xx.
5. **Faça a consulta e exporte**
   - Digite um CNPJ válido (14 dígitos) na página inicial e aceite os termos.
   - Verifique as páginas de alertas e de dados completos: cada linha tem o botão “Ver fonte” que abre o site oficial.
   - Clique em “Exportar JSON” e “Salvar PDF” para gerar `mvp_esg_{cnpj}_{timestamp}` e arquivar como evidência.
6. **Encerrar quando terminar**
   - Rode `scripts/stop.bat` ou `stop.ps1` para desligar contêineres ou processos locais.

## Checklist do usuário final

1. **Preparar ambiente**
   - Instale Docker Desktop (modo Docker/Moby), Rancher Desktop ou Podman Desktop.
   - Caso não utilize contêineres, garanta internet para instalação automática do Node via `start-nodocker.ps1`.
   - Execute `scripts/doctor.ps1` e verifique se `.env` existe e se as portas 8080/5173 estão livres (o script ajusta automaticamente se necessário).
2. **Iniciar**
   - Dê duplo clique em `scripts/start.bat` (ou execute `start.ps1`).
   - Caso solicitado, libere a execução de scripts com `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
   - Aguarde o health-check e abra `http://localhost:5173`.
3. **Configurar conectores**
   - No assistente inicial, informe os endpoints oficiais (domínios *.gov.br / *.jus.br / *.leg.br) no arquivo `.env` e teste cada fonte.
   - Garanta que apenas dados com HTTP 2xx, hash e timestamp ISO 8601 apareçam com o botão “Ver fonte”.
4. **Consultar**
   - Insira um CNPJ válido (14 dígitos) e aceite os termos de uso.
   - Navegue pelas páginas de alertas e dados completos garantindo que cada linha tenha fonte oficial.
5. **Exportar e arquivar**
   - Gere JSON e PDF (`mvp_esg_{cnpj}_{timestamp}`) e salve no repositório de evidências.
   - Utilize “Salvar PDF (impressão)” para versionar relatórios curtos, se necessário.
6. **Encerrar**
   - Execute `scripts/stop.ps1` (ou `stop.bat`) para desligar os serviços / processos locais.

## Scripts rápidos

```powershell
# Diagnóstico
scripts/doctor.ps1

# Início (detecção automática Docker/Podman ou fallback Node)
scripts/start.ps1

# Encerrar tudo
scripts/stop.ps1
```

## Desenvolvimento

```bash
corepack enable
corepack prepare pnpm@9.1.0 --activate
pnpm install
pnpm --filter esg-mvp-server dev
pnpm --filter esg-mvp-webapp dev
```

Consulte o README completo em [`docs/README.md`](docs/README.md) para detalhes de arquitetura, testes e critérios de aceite.
