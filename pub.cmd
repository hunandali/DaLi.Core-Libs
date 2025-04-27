@ECHO OFF
CLS
call npm run chk
call npm run build


echo WARNING: This will publish packages!
echo Are you sure you want to continue?
choice /c yn /m "Continue? (Y/N)"
if errorlevel 2 (
  echo Canceled.
  exit /b 1
)

npm publish --access public
