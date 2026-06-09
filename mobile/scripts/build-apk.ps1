# Standalone APK with JS bundle embedded (works without Metro / USB dev server).
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

. .\scripts\find-java.ps1
. .\scripts\setup-android-sdk.ps1

if (-not (Test-Path "android")) {
  Write-Host "android/ folder not found, running expo prebuild..."
  npm run generate:images
  npx expo prebuild --platform android
}

$androidDir = Join-Path $PSScriptRoot "..\android"
foreach ($dir in @("app\.cxx", "app\build", "build", ".gradle")) {
  $path = Join-Path $androidDir $dir
  if (Test-Path $path) {
    Write-Host "Cleaning $dir ..."
    Remove-Item -Recurse -Force $path
  }
}

Write-Host "Building release APK (JS bundle embedded)..."
& $PSScriptRoot\gradle-build.ps1 -GradleTask "assembleRelease"
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "BUILD FAILED (exit code $LASTEXITCODE)." -ForegroundColor Red
  exit $LASTEXITCODE
}

$apkPath = Join-Path (Resolve-Path (Join-Path $PSScriptRoot "..")).Path "android\app\build\outputs\apk\release\app-release.apk"
if (-not (Test-Path $apkPath)) {
  Write-Error "Build reported success but APK not found: $apkPath"
}

Write-Host ""
Write-Host "BUILD SUCCESS" -ForegroundColor Green
Write-Host "APK: $apkPath"
Write-Host "Copy this file to the phone and install. No Metro / PC connection needed."
