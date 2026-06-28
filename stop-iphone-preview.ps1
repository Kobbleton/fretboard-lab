$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$pidPath = Join-Path $projectRoot ".tmp\iphone-preview\cloudflared.pid"

if (-not (Test-Path $pidPath)) {
  Write-Host "No iPhone preview tunnel pid file was found."
  exit 0
}

$pidValue = (Get-Content $pidPath -ErrorAction SilentlyContinue | Select-Object -First 1).Trim()
if ($pidValue -match '^\d+$') {
  $process = Get-Process -Id ([int]$pidValue) -ErrorAction SilentlyContinue
  if ($process -and $process.ProcessName -eq "cloudflared") {
    Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
    Write-Host "Stopped iPhone preview tunnel."
  } else {
    Write-Host "Tunnel process was not running."
  }
}

Remove-Item $pidPath -Force -ErrorAction SilentlyContinue
