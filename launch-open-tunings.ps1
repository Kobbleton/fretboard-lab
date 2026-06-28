$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 4173
$bindAddress = "0.0.0.0"
$siteUrl = "http://127.0.0.1:$port/index.html"

function Test-SiteResponsive {
  param(
    [string]$Url
  )

  try {
    $null = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
    return $true
  } catch {
    return $false
  }
}

function Get-ListeningProcessId {
  param(
    [int]$Port,
    [string]$AddressPattern = ""
  )

  $lines = netstat -ano | Select-String ":$Port"
  foreach ($line in $lines) {
    $text = $line.ToString().Trim()
    if ($text -notmatch "LISTENING") {
      continue
    }

    if ($AddressPattern -and $text -notmatch $AddressPattern) {
      continue
    }

    $parts = $text -split "\s+"
    if ($parts.Length -ge 5) {
      return [int]$parts[-1]
    }
  }

  return $null
}

function Get-PythonCommand {
  foreach ($candidate in @("py", "python")) {
    $command = Get-Command $candidate -ErrorAction SilentlyContinue
    if ($command) {
      return $candidate
    }
  }

  throw "Python was not found on this machine."
}

function Get-LocalIPv4Address {
  try {
    $ipconfigOutput = ipconfig | Out-String
    $matches = [regex]::Matches($ipconfigOutput, '(?im)^\s*IPv4 (?:Address|адрес)[^:]*:\s*(\d+\.\d+\.\d+\.\d+)\s*$')

    foreach ($match in $matches) {
      $address = $match.Groups[1].Value
      if ($address -and $address -notlike "127.*" -and $address -notlike "169.254.*") {
        return $address
      }
    }
  } catch {
    return $null
  }

  return $null
}

function Ensure-NetworkAccessibleServer {
  param(
    [string]$PythonCommand,
    [string]$ProjectRoot,
    [int]$Port,
    [string]$BindAddress
  )

  $loopbackOnlyPid = Get-ListeningProcessId -Port $Port -AddressPattern "^TCP\s+127\.0\.0\.1:$Port\s"
  $networkPid = Get-ListeningProcessId -Port $Port -AddressPattern "^TCP\s+0\.0\.0\.0:$Port\s"

  if ($networkPid) {
    return
  }

  if ($loopbackOnlyPid) {
    Stop-Process -Id $loopbackOnlyPid -Force -ErrorAction SilentlyContinue
    Start-Sleep -Milliseconds 500
  }

  $arguments = @("-m", "http.server", "$Port", "--bind", $BindAddress)
  Start-Process -FilePath $PythonCommand -ArgumentList $arguments -WorkingDirectory $ProjectRoot -WindowStyle Hidden
}

if (-not (Test-SiteResponsive -Url $siteUrl)) {
  $pythonCommand = Get-PythonCommand
  Ensure-NetworkAccessibleServer -PythonCommand $pythonCommand -ProjectRoot $projectRoot -Port $port -BindAddress $bindAddress

  $started = $false
  foreach ($attempt in 1..20) {
    Start-Sleep -Milliseconds 300
    if (Test-SiteResponsive -Url $siteUrl) {
      $started = $true
      break
    }
  }

  if (-not $started) {
    throw "The local server did not start in time."
  }
} else {
  $pythonCommand = Get-PythonCommand
  Ensure-NetworkAccessibleServer -PythonCommand $pythonCommand -ProjectRoot $projectRoot -Port $port -BindAddress $bindAddress
}

$localIp = Get-LocalIPv4Address
$mobileUrl = if ($localIp) { "http://$localIp`:$port/index.html" } else { $null }

Write-Host ""
Write-Host "Local desktop URL: $siteUrl"
if ($mobileUrl) {
  Write-Host "Mobile URL on same Wi-Fi: $mobileUrl"
} else {
  Write-Host "Mobile URL could not be detected automatically. Check your local IPv4 address and use port $port."
}
Write-Host ""

Start-Process $siteUrl
