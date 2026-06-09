param(
  [Parameter(Mandatory = $true)]
  [string]$GradleTask
)

$androidDir = Join-Path (Resolve-Path (Join-Path $PSScriptRoot "..")).Path "android"
if (-not (Test-Path $androidDir)) {
  Write-Error "android/ not found at $androidDir"
}

Set-Location $androidDir
.\gradlew.bat $GradleTask
exit $LASTEXITCODE
