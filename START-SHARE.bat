@echo off
cls
color 0A
echo.
echo ============================================================
echo           E-SABONG CLIENT DEMO - EASY SHARE
echo ============================================================
echo.
echo [1/2] Starting Laravel server...

REM Kill any existing PHP processes to avoid conflicts
taskkill /F /IM php.exe >nul 2>&1

REM Start Laravel in background
start /B cmd /c "php artisan serve > nul 2>&1"
timeout /t 4 /nobreak > nul

echo       DONE! Server running on http://localhost:8000
echo.
echo [2/2] Creating public URL...
echo.
echo ============================================================
echo.
echo   COPY THIS URL AND SEND TO YOUR CLIENT:
echo.

REM Start Cloudflare tunnel (handles HTTPS properly, no mixed content)
"C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel --url http://localhost:8000

echo.
echo ============================================================
echo Tunnel closed. Press any key to exit...
pause > nul
