@ECHO OFF
chcp 65001 > nul
cls

echo WARNING: This will delete packages and caches!
echo Are you sure you want to continue?
choice /c yn /m "Continue? (Y/N)"
if errorlevel 2 (
  echo Canceled.
  exit /b 1
)

call ncu -u
RD /S /Q "node_modules"
RD /S /Q "coverage"
DEL "yarn.lock"
DEL "pnpm-lock.yaml"
call yarn
call yarn chk