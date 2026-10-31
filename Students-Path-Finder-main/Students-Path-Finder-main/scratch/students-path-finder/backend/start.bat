@echo off
echo =========================================================
echo    Students Path Finder - Python Backend Launcher
echo =========================================================
echo Checking Python...
python --version
if errorlevel 1 (
    echo Python is not installed or not in PATH. Please install Python.
    pause
    exit /b
)

echo Installing Flask and Flask-Cors if not already installed...
python -m pip install -r requirements.txt

echo Starting Python API Server on http://127.0.0.1:5000...
python server.py
pause
