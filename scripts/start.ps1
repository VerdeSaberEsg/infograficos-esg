param()

$ErrorActionPreference = 'Stop'

function Test-Command {
  param([string]$Name)
  return Get-Command $Name -ErrorAction SilentlyContinue
}

function Ensure-EnvFile {
  param([string]$Root)
  $envPath = Join-Path $Root '.env'
  if (-not (Test-Path $envPath)) {
    $sample = Join-Path $Root '.env.sample'
    if (Test-Path $sample) {
      Copy-Item $sample $envPath
      Write-Host "Arquivo .env criado a partir de .env.sample. Ajuste os endpoints oficiais antes de consultar." -ForegroundColor Yellow
    } else {
      Write-Host 'Arquivo .env não encontrado. Crie um com base em .env.sample.' -ForegroundColor Red
    }
  }
}

function Get-FreePort {
  param([int]$Default)
  $port = $Default
  while (Test-NetConnection -ComputerName 'localhost' -Port $port -InformationLevel Quiet) {
    $port += 1
  }
  return $port
}

function Start-Compose {
  param([string]$Command, [string]$Root)
  Push-Location $Root
  try {
    & $Command 'compose' 'up' '--build' '-d'
  } finally {
    Pop-Location
  }
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Resolve-Path (Join-Path $scriptDir '..')

Ensure-EnvFile -Root $root

$apiPort = Get-FreePort -Default 8080
$webPort = Get-FreePort -Default 5173
$env:API_PORT = $apiPort
$env:WEB_PORT = $webPort
if ($apiPort -ne 8080 -or $webPort -ne 5173) {
  Write-Host "Portas ajustadas automaticamente. API: $apiPort, Web: $webPort" -ForegroundColor Yellow
}

if (Test-Command 'docker') {
  try {
    docker info | Out-Null
    Start-Compose -Command 'docker' -Root (Join-Path $root 'infra')
    Write-Host "Serviços iniciados com Docker. Abra http://localhost:$webPort" -ForegroundColor Green
    exit 0
  } catch {
    Write-Host "Docker detectado, mas não foi possível iniciar: $_" -ForegroundColor Yellow
  }
}

if (Test-Command 'podman') {
  try {
    podman info | Out-Null
    Start-Compose -Command 'podman' -Root (Join-Path $root 'infra')
    Write-Host "Serviços iniciados com Podman. Abra http://localhost:$webPort" -ForegroundColor Green
    exit 0
  } catch {
    Write-Host "Podman detectado, mas não foi possível iniciar: $_" -ForegroundColor Yellow
    Write-Host 'Verifique se o podman machine está ativo (podman machine start).' -ForegroundColor Yellow
  }
}

Write-Host 'Nenhum engine de contêiner disponível. Iniciando fallback sem contêiner.' -ForegroundColor Yellow
powershell -ExecutionPolicy Bypass -File (Join-Path $scriptDir 'start-nodocker.ps1')
