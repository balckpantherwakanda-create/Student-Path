@echo off
title Students Path Finder - Production Server
echo ==================================================================
echo   Students Path Finder - Full-Stack Production Environment
echo ==================================================================
echo.

set "PY_CMD=python"
python --version >nul 2>&1
if %errorlevel% neq 0 (
    if exist "%LOCALAPPDATA%\Programs\Python\Python311\python.exe" (
        set "PY_CMD=%LOCALAPPDATA%\Programs\Python\Python311\python.exe"
    ) else (
        echo [ERROR] Python is not installed or not in PATH.
        pause
        exit /b 1
    )
)

echo [1/2] Verifying backend dependencies...
"%PY_CMD%" -m pip install -r backend\requirements.txt --quiet

echo [2/2] Starting Unified Server on http://127.0.0.1:5000 ...
start "" http://127.0.0.1:5000

"%PY_CMD%" backend\app.py
pause
