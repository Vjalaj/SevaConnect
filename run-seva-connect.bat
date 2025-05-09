@echo off
setlocal enabledelayedexpansion

echo ===================================
echo Starting SevaConnect application...
echo ===================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed or not in your PATH.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: npm is not installed or not in your PATH.
    echo Please install npm which usually comes with Node.js
    pause
    exit /b 1
)

REM Ensure we're in the correct directory
cd /d %~dp0

echo Installing dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to install dependencies.
    pause
    exit /b 1
)

echo.
echo ===================================
echo Starting development server...
echo The application will be available at http://localhost:9002
echo Press Ctrl+C to stop the server
echo ===================================
echo.

REM Try starting the server with the standard npm script first
echo Method 1: Using npm run dev...
start "SevaConnect Dev Server" cmd /c "npm run dev && pause"

REM Wait a moment to see if the server starts
timeout /t 5 /nobreak

echo.
echo If the server window closed immediately, try these alternative methods:
echo.
echo Method 2: Run this command in a new command prompt window:
echo cd /d %~dp0 ^&^& npx next dev -p 9002
echo.
echo Method 3: Run this command in a new command prompt window:
echo cd /d %~dp0 ^&^& npx next dev
echo.

echo ===================================
echo Troubleshooting Tips:
echo ===================================
echo 1. Make sure port 9002 is not already in use
echo 2. Check if there are any errors in the console output
echo 3. Try running without turbopack by editing package.json
echo    Change: "dev": "next dev --turbopack -p 9002"
echo    To:     "dev": "next dev -p 9002"
echo.

pause