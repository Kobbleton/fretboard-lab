$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 4173
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

function Get-PythonCommand {
  foreach ($candidate in @("py", "python")) {
    $command = Get-Command $candidate -ErrorAction SilentlyContinue
    if ($command) {
      return $candidate
    }
  }

  throw "Python was not found on this machine."
}

if (-not (Test-SiteResponsive -Url $siteUrl)) {
  $pythonCommand = Get-PythonCommand
  $arguments = @("-m", "http.server", "$port", "--bind", "127.0.0.1")

  Start-Process -FilePath $pythonCommand -ArgumentList $arguments -WorkingDirectory $projectRoot -WindowStyle Hidden

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
}

Start-Process $siteUrl
