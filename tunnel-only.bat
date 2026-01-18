@echo off
echo ============================================
echo   Quick Share - E-Sabong App
echo ============================================
echo.
echo Make sure Laravel server is running!
echo If not, open another terminal and run: php artisan serve
echo.
echo Creating public URL...
echo.

lt --port 8000 --subdomain sumbo-esabong

echo.
echo Tunnel closed. Your local server is still running.
