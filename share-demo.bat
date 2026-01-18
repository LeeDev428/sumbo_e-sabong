@echo off
echo ============================================
echo   Starting E-Sabong App for Client Demo
echo ============================================
echo.

echo Step 1: Building frontend assets...
call npm run build
echo.

echo Step 2: Starting Laravel server...
start cmd /k "php artisan serve"
timeout /t 3

echo.
echo Step 3: Creating public tunnel...
echo.
echo Your app will be available at: https://sumbo-esabong.loca.lt
echo Share this URL with your client!
echo.
echo Press Ctrl+C to stop the tunnel (server will keep running)
echo ============================================
echo.

lt --port 8000 --subdomain sumbo-esabong
