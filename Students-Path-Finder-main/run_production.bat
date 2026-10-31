@echo off
title Students Path Finder - Launcher
echo ==================================================================
echo   Students Path Finder - Starting Full-Stack Application
echo ==================================================================
echo.

cd /d "%~dp0Students-Path-Finder-main\scratch\students-path-finder"
call run_production.bat
pause
