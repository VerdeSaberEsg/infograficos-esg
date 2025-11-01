param()

$ErrorActionPreference = 'Stop'

function Test-Command {
  param([string]$Name)
  return Get-Command $Name -ErrorAction SilentlyContinue
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Resolve-Path (Join-Path $scriptDir '..')
$infra = Join-Path $root 'infra'

$stopped = $false

if (Test-Command 'docker') {
  try {
    Push-Location $infra
    docker compose down
    Pop-Location
    Write-Host 'Serviços Docker interrompidos.' -ForegroundColor Green
    $stopped = $true
  } catch {
    Write-Host "Falha ao interromper Docker: $_" -ForegroundColor Yellow
  }
}

if (Test-Command 'podman') {
  try {
    Push-Location $infra
    podman compose down
    Pop-Location
    Write-Host 'Serviços Podman interrompidos.' -ForegroundColor Green
    $stopped = $true
  } catch {
    Write-Host "Falha ao interromper Podman: $_" -ForegroundColor Yellow
  }
}

$pidsFile = Join-Path $root '.runtime/pids.json'
if (Test-Path $pidsFile) {
  $content = Get-Content $pidsFile | ConvertFrom-Json
  foreach ($pid in @($content.server, $content.web)) {
    if ($pid) {
      try {
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
      } catch {
        # ignore
      }
    }
  }
  Remove-Item $pidsFile -ErrorAction SilentlyContinue
  Write-Host 'Processos locais interrompidos.' -ForegroundColor Green
  $stopped = $true
}

if (-not $stopped) {
  Write-Host 'Nenhum serviço ativo encontrado.' -ForegroundColor Yellow
}
