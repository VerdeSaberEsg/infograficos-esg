param()

$ErrorActionPreference = 'Stop'

function Test-Command {
  param([string]$Name)
  return Get-Command $Name -ErrorAction SilentlyContinue
}

function Test-Port {
  param([int]$Port)
  return Test-NetConnection -ComputerName 'localhost' -Port $Port -InformationLevel Quiet
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Resolve-Path (Join-Path $scriptDir '..')
$envFile = Join-Path $root '.env'

Write-Host '=== Diagnóstico ESG MVP ==='

if (Test-Command 'docker') {
  try {
    docker info | Out-Null
    Write-Host 'Docker: disponível ✅'
  } catch {
    Write-Host 'Docker: instalado mas indisponível ❌' -ForegroundColor Yellow
  }
} else {
  Write-Host 'Docker: não encontrado'
}

if (Test-Command 'podman') {
  try {
    podman info | Out-Null
    Write-Host 'Podman: disponível ✅'
  } catch {
    Write-Host 'Podman: instalado mas indisponível ❌ (execute "podman machine start")' -ForegroundColor Yellow
  }
} else {
  Write-Host 'Podman: não encontrado'
}

if (Test-Path $envFile) {
  Write-Host '.env: presente ✅'
} else {
  Write-Host '.env: ausente ❌ (copie de .env.sample e configure os endpoints oficiais)' -ForegroundColor Yellow
}

$ports = @(8080, 5173)
foreach ($port in $ports) {
  if (Test-Port -Port $port) {
    Write-Host "Porta $port: EM USO ⚠️ (será ajustada automaticamente no start.ps1)" -ForegroundColor Yellow
  } else {
    Write-Host "Porta $port: livre ✅"
  }
}

Write-Host "Relógio do sistema: $(Get-Date -Format o)"

Write-Host 'Caso receba erros de ExecutionPolicy, abra o PowerShell como administrador e execute:' -ForegroundColor Yellow
Write-Host '  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned' -ForegroundColor Yellow

Write-Host 'Para iniciar utilize start.ps1 ou start.bat.'
