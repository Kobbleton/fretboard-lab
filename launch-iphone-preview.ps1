$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$cloudflaredPath = Join-Path $projectRoot ".tools\cloudflared.exe"
$stateDir = Join-Path $projectRoot ".tmp\iphone-preview"
$logPath = Join-Path $stateDir "cloudflared.log"
$errorLogPath = Join-Path $stateDir "cloudflared.error.log"
$pidPath = Join-Path $stateDir "cloudflared.pid"
$siteUrl = "http://127.0.0.1:4173/index.html"
$tunnelUrl = "http://127.0.0.1:4173"

if (-not (Test-Path $cloudflaredPath)) {
  throw "cloudflared.exe was not found at $cloudflaredPath"
}

New-Item -ItemType Directory -Force -Path $stateDir | Out-Null

if (Test-Path $pidPath) {
  $existingPid = (Get-Content $pidPath -ErrorAction SilentlyContinue | Select-Object -First 1).Trim()
  if ($existingPid -match '^\d+$') {
    $process = Get-Process -Id ([int]$existingPid) -ErrorAction SilentlyContinue
    if ($process -and $process.ProcessName -eq "cloudflared") {
      Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
      Start-Sleep -Milliseconds 400
    }
  }
}

if (Test-Path $logPath) {
  Remove-Item $logPath -Force -ErrorAction SilentlyContinue
}

if (Test-Path $errorLogPath) {
  Remove-Item $errorLogPath -Force -ErrorAction SilentlyContinue
}

Start-Process powershell -ArgumentList "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", (Join-Path $projectRoot "launch-open-tunings.ps1") -WorkingDirectory $projectRoot -WindowStyle Hidden

$proc = Start-Process -FilePath $cloudflaredPath -ArgumentList "tunnel", "--url", $tunnelUrl, "--no-autoupdate" -WorkingDirectory $projectRoot -RedirectStandardOutput $logPath -RedirectStandardError $errorLogPath -WindowStyle Hidden -PassThru
Set-Content -Path $pidPath -Value $proc.Id

$publicUrl = $null
foreach ($attempt in 1..60) {
  Start-Sleep -Milliseconds 500
  if ((Test-Path $logPath) -or (Test-Path $errorLogPath)) {
    $stdout = if (Test-Path $logPath) { Get-Content $logPath -Raw -ErrorAction SilentlyContinue } else { "" }
    $stderr = if (Test-Path $errorLogPath) { Get-Content $errorLogPath -Raw -ErrorAction SilentlyContinue } else { "" }
    $log = "$stdout`n$stderr"
    $urlMatch = [regex]::Match($log, 'https://[-a-z0-9]+\.trycloudflare\.com')
    if ($urlMatch.Success) {
      $publicUrl = $urlMatch.Value
      break
    }
  }
}

if (-not $publicUrl) {
  throw "The iPhone preview tunnel did not start in time. Check $logPath and $errorLogPath"
}

Write-Host ""
Write-Host "Local URL:  $siteUrl"
Write-Host "iPhone URL: $publicUrl/index.html"
Write-Host ""
Write-Host "Tunnel log: $logPath"
