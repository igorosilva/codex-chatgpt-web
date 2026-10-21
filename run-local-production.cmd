@echo off
setlocal
title Codex Web GPT - Local Production
cd /d "%~dp0"
set "CODEX_WEB_GPT_LOCAL_PRODUCTION=1"

rem The desktop Codex process can export a workspace-scoped CODEX_CHATGPT_WEB_HOME.
rem Do not inherit that transient source-tree profile: the local production launcher
rem must use the same durable profile as the installed application. Otherwise its
rem browser, tunnel MCP worker and Responses bridge can attach to different pipes.
set "CODEX_CHATGPT_WEB_HOME=%USERPROFILE%\.codex-chatgpt-web"
set "CODEX_HOME=%USERPROFILE%\.codex"

rem Keep an explicitly supplied runtime, otherwise prefer this checkout's bundled
rem runtime before looking for an installed or globally available Bun.
if defined CODEX_WEB_GPT_BUN if exist "%CODEX_WEB_GPT_BUN%" goto bun_ready
set "CODEX_WEB_GPT_BUN="
for %%B in (
  "%~dp0dist\runtime\runtime\bun.exe"
  "%ProgramFiles%\Codex Web GPT\resources\runtime\runtime\bun.exe"
  "%LOCALAPPDATA%\Programs\Codex Web GPT\resources\runtime\runtime\bun.exe"
  "%LOCALAPPDATA%\Codex Web GPT\resources\runtime\runtime\bun.exe"
  "%USERPROFILE%\.bun\bin\bun.exe"
) do if not defined CODEX_WEB_GPT_BUN if exist "%%~fB" set "CODEX_WEB_GPT_BUN=%%~fB"
if not defined CODEX_WEB_GPT_BUN for /f "delims=" %%B in ('where bun.exe 2^>nul') do if not defined CODEX_WEB_GPT_BUN set "CODEX_WEB_GPT_BUN=%%~fB"
if not defined CODEX_WEB_GPT_BUN for /d %%V in ("%USERPROFILE%\.codex-chatgpt-web\versions\*") do if exist "%%~fV\runtime\bun.exe" set "CODEX_WEB_GPT_BUN=%%~fV\runtime\bun.exe"

if not defined CODEX_WEB_GPT_BUN (
  echo [ERRO] Nao foi possivel localizar o runtime Bun do Codex Web GPT.
  echo.
  echo Instale o Codex Web GPT ou defina CODEX_WEB_GPT_BUN com o caminho do bun.exe.
  echo A janela permanecera aberta para que este erro possa ser copiado.
  echo.
  pause
  exit /b 1
)

:bun_ready
echo Runtime: "%CODEX_WEB_GPT_BUN%"
if not exist "package.json" (
  echo [ERRO] package.json nao foi encontrado em "%CD%".
  echo Execute este arquivo dentro da pasta raiz do codigo-fonte.
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo Dependencias locais ausentes. Instalando com Bun...
  "%CODEX_WEB_GPT_BUN%" install
  if errorlevel 1 (
    echo.
    echo [ERRO] A instalacao das dependencias falhou.
    echo Verifique a conexao, proxy ou antivirus e copie a mensagem acima.
    pause
    exit /b 1
  )
)
if not exist "launcher\node_modules\vite\package.json" goto install_launcher_dependencies
if not exist "launcher\node_modules\pngjs\package.json" goto install_launcher_dependencies
goto launcher_dependencies_ready

:install_launcher_dependencies
  echo Dependencias do launcher ausentes. Instalando com Bun...
  "%CODEX_WEB_GPT_BUN%" install --cwd launcher --frozen-lockfile
  if errorlevel 1 (
    echo.
    echo [ERRO] A instalacao das dependencias do launcher falhou.
    echo Verifique a conexao, proxy ou antivirus e copie a mensagem acima.
    pause
    exit /b 1
  )

:launcher_dependencies_ready
echo Starting Codex Web GPT from local source with the production profile...
"%CODEX_WEB_GPT_BUN%" run launcher:dev
set "EXIT_CODE=%ERRORLEVEL%"
echo.
if not "%EXIT_CODE%"=="0" echo Launcher exited with code %EXIT_CODE%.
if /i "%CODEX_WEB_GPT_SILENT%"=="1" exit /b %EXIT_CODE%
echo The local launcher stopped. Press any key to close this terminal.
pause >nul
exit /b %EXIT_CODE%
