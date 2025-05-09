@echo off
echo Starting SevaConnect application...
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

echo Installing dependencies...
npm install

echo.
echo Starting development server...
echo The application will be available at http://localhost:9002
echo Press Ctrl+C to stop the server
echo.

npm run dev

pause