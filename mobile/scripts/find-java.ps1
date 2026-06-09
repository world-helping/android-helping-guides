# Finds JDK on Windows and sets JAVA_HOME for the current session.
# Usage: . .\scripts\find-java.ps1

$candidates = @(
  $env:JAVA_HOME,
  "$env:ProgramFiles\Android\Android Studio\jbr",
  "$env:LOCALAPPDATA\Programs\Android\Android Studio\jbr",
  (Get-ChildItem "$env:ProgramFiles\Microsoft\jdk-*" -ErrorAction SilentlyContinue |
    Sort-Object Name -Descending |
    Select-Object -First 1 -ExpandProperty FullName),
  (Get-ChildItem "$env:ProgramFiles\Eclipse Adoptium\jdk-*" -ErrorAction SilentlyContinue |
    Sort-Object Name -Descending |
    Select-Object -First 1 -ExpandProperty FullName),
  (Get-ChildItem "$env:ProgramFiles\Java\jdk-*" -ErrorAction SilentlyContinue |
    Sort-Object Name -Descending |
    Select-Object -First 1 -ExpandProperty FullName)
) | Where-Object { $_ -and (Test-Path (Join-Path $_ "bin\java.exe")) }

$javaHome = $candidates | Select-Object -First 1

if (-not $javaHome) {
  Write-Error @"
JDK not found. Install one of:

  1. Android Studio (includes JDK):
     https://developer.android.com/studio

  2. Microsoft OpenJDK 17:
     winget install Microsoft.OpenJDK.17

Restart the terminal after installation, then run the build again.
"@
  exit 1
}

$env:JAVA_HOME = $javaHome
$env:Path = "$(Join-Path $javaHome 'bin');$env:Path"

Write-Host "JAVA_HOME=$env:JAVA_HOME"
java -version
