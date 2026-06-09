$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

. .\scripts\find-java.ps1
. .\scripts\setup-android-sdk.ps1

if (-not (Test-Path "android")) {
  Write-Host "android/ folder not found, running expo prebuild..."
  npm run generate:images
  npx expo prebuild --platform android
}

& $PSScriptRoot\gradle-build.ps1 -GradleTask "assembleDebug"
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "BUILD FAILED (exit code $LASTEXITCODE)." -ForegroundColor Red
  exit $LASTEXITCODE
}

$apkPath = Join-Path (Resolve-Path (Join-Path $PSScriptRoot "..")).Path "android\app\build\outputs\apk\debug\app-debug.apk"
if (-not (Test-Path $apkPath)) {
  Write-Error "Build reported success but APK not found: $apkPath"
}

Write-Host ""
Write-Host "BUILD SUCCESS" -ForegroundColor Green
Write-Host "APK: $apkPath"
Write-Host "Debug APK needs Metro (npm start) unless you use build:apk for a standalone install."
