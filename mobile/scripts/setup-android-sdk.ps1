# Finds Android SDK and writes android/local.properties (sdk.dir).
# Usage: . .\scripts\setup-android-sdk.ps1
# Or set ANDROID_HOME yourself before running the build.

$sdkCandidates = @(
  $env:ANDROID_HOME,
  $env:ANDROID_SDK_ROOT,
  "$env:LOCALAPPDATA\Android\Sdk",
  "$env:USERPROFILE\AppData\Local\Android\Sdk",
  "C:\Android\Sdk"
) | Where-Object { $_ -and (Test-Path $_) }

$sdkDir = $sdkCandidates | Select-Object -First 1

if (-not $sdkDir) {
  Write-Error @"
Android SDK not found.

Install Android Studio and complete the setup wizard:
  https://developer.android.com/studio

The SDK is usually installed to:
  $env:LOCALAPPDATA\Android\Sdk

If you already installed it elsewhere, set ANDROID_HOME before building:
  set ANDROID_HOME=C:\path\to\Android\Sdk
  npm run build:apk:debug

Or create mobile\android\local.properties manually:
  sdk.dir=C:/Users/YourName/AppData/Local/Android/Sdk
(use forward slashes in the path)
"@
  exit 1
}

$env:ANDROID_HOME = $sdkDir
$env:ANDROID_SDK_ROOT = $sdkDir
$env:Path = "$sdkDir\platform-tools;$sdkDir\emulator;$env:Path"

$androidDir = Join-Path $PSScriptRoot "..\android"
$localProps = Join-Path $androidDir "local.properties"
$sdkDirEscaped = $sdkDir -replace '\\', '/'
Set-Content -Path $localProps -Value "sdk.dir=$sdkDirEscaped" -Encoding ASCII

Write-Host "ANDROID_HOME=$sdkDir"
Write-Host "Wrote $localProps"
