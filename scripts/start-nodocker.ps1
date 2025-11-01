param()

$ErrorActionPreference = 'Stop'

function Ensure-Nvs {
  if (-not (Get-Command 'nvs' -ErrorAction SilentlyContinue)) {
    Write-Host 'Instalando NVS (Node Version Switcher)...' -ForegroundColor Yellow
    $nvsPath = Join-Path $env:LOCALAPPDATA 'nvs'
    if (-not (Test-Path $nvsPath)) {
      New-Item -ItemType Directory -Path $nvsPath | Out-Null
    }
    Invoke-WebRequest 'https://raw.githubusercontent.com/jasongin/nvs/v1.7.0/nvs.ps1' -OutFile (Join-Path $nvsPath 'nvs.ps1')
    & powershell -ExecutionPolicy Bypass -File (Join-Path $nvsPath 'nvs.ps1') install
  }
}

function Ensure-Pnpm {
  corepack enable | Out-Null
  corepack prepare pnpm@9.1.0 --activate | Out-Null
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Resolve-Path (Join-Path $scriptDir '..')

Ensure-Nvs
& nvs install lts
& nvs use lts
Ensure-Pnpm

Push-Location $root
pnpm install

$runtimeDir = Join-Path $root '.runtime'
if (-not (Test-Path $runtimeDir)) {
  New-Item -ItemType Directory -Path $runtimeDir | Out-Null
}
$pidsFile = Join-Path $runtimeDir 'pids.json'

$serverProcess = Start-Process pnpm -ArgumentList '--filter','esg-mvp-server','dev' -PassThru -WindowStyle Hidden
Start-Sleep -Seconds 3
$webProcess = Start-Process pnpm -ArgumentList '--filter','esg-mvp-webapp','dev' -PassThru -WindowStyle Hidden

@{
  server = $serverProcess.Id
  web = $webProcess.Id
} | ConvertTo-Json | Set-Content -Path $pidsFile

Write-Host 'Serviços iniciados sem contêiner. Acesse http://localhost:5173' -ForegroundColor Green
Write-Host "Para encerrar, execute stop.ps1" -ForegroundColor Yellow
Pop-Location
