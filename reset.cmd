@ECHO OFF
call ncu -u
RD /S /Q "node_modules"
DEL "yarn.lock"
@REM DEL *.d.ts
call yarn
yarn type-check