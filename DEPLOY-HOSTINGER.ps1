# Hostinger Shared Hosting - Deployment Script
# Domain: sabing2m.com
# SSH: u314333613@46.202.186.219:65002

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  E-Sabong Hostinger Deployment" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$SSH_USER = "u314333613"
$SSH_HOST = "46.202.186.219"
$SSH_PORT = "65002"
$SSH_PASSWORD = "Ahrix@0428"
$REMOTE_PATH = "/home/u314333613/domains/sabing2m.com"
$LOCAL_PATH = "d:\Programming\Systems\PWA-Systems\Laravel\sumbo_e-sabong"

Write-Host "Step 1: Testing SSH Connection..." -ForegroundColor Yellow
Write-Host "Connecting to $SSH_USER@${SSH_HOST}:$SSH_PORT" -ForegroundColor Gray
Write-Host ""
Write-Host "NOTE: You'll need to enter password: Ahrix@0428" -ForegroundColor Green
Write-Host ""

# Test SSH connection
$sshCommand = "ssh -p $SSH_PORT ${SSH_USER}@${SSH_HOST} 'pwd && ls -la'"
Write-Host "Running: $sshCommand" -ForegroundColor Gray
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "MANUAL DEPLOYMENT STEPS FOR HOSTINGER" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Prerequisites:" -ForegroundColor Yellow
Write-Host "1. Install WinSCP or FileZilla for file transfer" -ForegroundColor White
Write-Host "2. Have SSH access enabled (already done)" -ForegroundColor White
Write-Host ""

Write-Host "OPTION A: Using WinSCP (Recommended)" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "1. Download WinSCP: https://winscp.net/download/WinSCP-Latest-Setup.exe" -ForegroundColor White
Write-Host "2. Open WinSCP and create new connection:" -ForegroundColor White
Write-Host "   - Protocol: SFTP" -ForegroundColor Gray
Write-Host "   - Host: $SSH_HOST" -ForegroundColor Gray
Write-Host "   - Port: $SSH_PORT" -ForegroundColor Gray
Write-Host "   - Username: $SSH_USER" -ForegroundColor Gray
Write-Host "   - Password: $SSH_PASSWORD" -ForegroundColor Gray
Write-Host "3. Click 'Login'" -ForegroundColor White
Write-Host "4. Navigate to: /home/u314333613/domains/sabing2m.com/" -ForegroundColor White
Write-Host "5. Delete everything in 'public_html' folder" -ForegroundColor White
Write-Host "6. Upload ALL files from local folder to remote root" -ForegroundColor White
Write-Host "   Local: $LOCAL_PATH" -ForegroundColor Gray
Write-Host "   Remote: $REMOTE_PATH" -ForegroundColor Gray
Write-Host ""

Write-Host "OPTION B: Using Command Line with PSCP" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "1. Download PuTTY tools (includes pscp): https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html" -ForegroundColor White
Write-Host "2. Run these commands:" -ForegroundColor White
Write-Host ""
Write-Host "   # Connect via SSH first" -ForegroundColor Gray
Write-Host "   ssh -p $SSH_PORT ${SSH_USER}@${SSH_HOST}" -ForegroundColor Cyan
Write-Host ""
Write-Host "   # On the server, clean up and prepare" -ForegroundColor Gray
Write-Host "   cd /home/u314333613/domains/sabing2m.com" -ForegroundColor Cyan
Write-Host "   rm -rf public_html/*" -ForegroundColor Cyan
Write-Host "   mkdir -p laravel" -ForegroundColor Cyan
Write-Host "   exit" -ForegroundColor Cyan
Write-Host ""
Write-Host "   # Upload files (run from local machine)" -ForegroundColor Gray
Write-Host "   cd `"$LOCAL_PATH`"" -ForegroundColor Cyan
Write-Host "   pscp -P $SSH_PORT -r * ${SSH_USER}@${SSH_HOST}:/home/u314333613/domains/sabing2m.com/laravel/" -ForegroundColor Cyan
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "AFTER UPLOADING FILES - RUN ON SERVER" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Connect to server via SSH:" -ForegroundColor Yellow
Write-Host "ssh -p $SSH_PORT ${SSH_USER}@${SSH_HOST}" -ForegroundColor Cyan
Write-Host ""
Write-Host "Then run these commands:" -ForegroundColor Yellow
Write-Host ""
Write-Host "# Navigate to Laravel directory" -ForegroundColor Gray
Write-Host "cd /home/u314333613/domains/sabing2m.com/laravel" -ForegroundColor Cyan
Write-Host ""
Write-Host "# Copy production environment file" -ForegroundColor Gray
Write-Host "cp .env.production .env" -ForegroundColor Cyan
Write-Host ""
Write-Host "# Install Composer dependencies" -ForegroundColor Gray
Write-Host "composer install --no-dev --optimize-autoloader" -ForegroundColor Cyan
Write-Host ""
Write-Host "# Set permissions" -ForegroundColor Gray
Write-Host "chmod -R 755 storage bootstrap/cache" -ForegroundColor Cyan
Write-Host "chmod -R 775 storage" -ForegroundColor Cyan
Write-Host ""
Write-Host "# Clear and cache config" -ForegroundColor Gray
Write-Host "php artisan config:clear" -ForegroundColor Cyan
Write-Host "php artisan cache:clear" -ForegroundColor Cyan
Write-Host "php artisan config:cache" -ForegroundColor Cyan
Write-Host "php artisan route:cache" -ForegroundColor Cyan
Write-Host "php artisan view:cache" -ForegroundColor Cyan
Write-Host ""
Write-Host "# Run database migrations" -ForegroundColor Gray
Write-Host "php artisan migrate --force" -ForegroundColor Cyan
Write-Host ""
Write-Host "# Seed initial data (admin, declarator, teller accounts)" -ForegroundColor Gray
Write-Host "php artisan db:seed --force" -ForegroundColor Cyan
Write-Host ""
Write-Host "# Create symbolic link from public_html to public" -ForegroundColor Gray
Write-Host "cd /home/u314333613/domains/sabing2m.com" -ForegroundColor Cyan
Write-Host "rm -rf public_html" -ForegroundColor Cyan
Write-Host "ln -s /home/u314333613/domains/sabing2m.com/laravel/public public_html" -ForegroundColor Cyan
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "HOSTINGER CONFIGURATION (cPanel)" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Log into Hostinger cPanel" -ForegroundColor Yellow
Write-Host "2. Go to 'Advanced' > 'PHP Configuration'" -ForegroundColor White
Write-Host "3. Set PHP version to 8.2 or higher" -ForegroundColor White
Write-Host "4. Enable these PHP extensions:" -ForegroundColor White
Write-Host "   - BCMath" -ForegroundColor Gray
Write-Host "   - Ctype" -ForegroundColor Gray
Write-Host "   - JSON" -ForegroundColor Gray
Write-Host "   - Mbstring" -ForegroundColor Gray
Write-Host "   - OpenSSL" -ForegroundColor Gray
Write-Host "   - PDO" -ForegroundColor Gray
Write-Host "   - Tokenizer" -ForegroundColor Gray
Write-Host "   - XML" -ForegroundColor Gray
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "TEST YOUR DEPLOYMENT" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Visit: https://sabing2m.com" -ForegroundColor Green
Write-Host ""
Write-Host "Test Accounts:" -ForegroundColor Yellow
Write-Host "Admin:" -ForegroundColor White
Write-Host "  Email: admin@esabong.com" -ForegroundColor Gray
Write-Host "  Password: password" -ForegroundColor Gray
Write-Host ""
Write-Host "Declarator:" -ForegroundColor White
Write-Host "  Email: declarator@esabong.com" -ForegroundColor Gray
Write-Host "  Password: password" -ForegroundColor Gray
Write-Host ""
Write-Host "Teller:" -ForegroundColor White
Write-Host "  Email: teller@esabong.com" -ForegroundColor Gray
Write-Host "  Password: password" -ForegroundColor Gray
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "TROUBLESHOOTING" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "If you see errors:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 500 Internal Server Error:" -ForegroundColor Red
Write-Host "   - Check storage permissions: chmod -R 775 storage" -ForegroundColor Gray
Write-Host "   - Check .env file exists and has correct database credentials" -ForegroundColor Gray
Write-Host "   - Enable debug: Set APP_DEBUG=true in .env temporarily" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Database Connection Error:" -ForegroundColor Red
Write-Host "   - Verify database credentials in .env" -ForegroundColor Gray
Write-Host "   - Check database exists in cPanel > MySQL Databases" -ForegroundColor Gray
Write-Host "   - Test: php artisan migrate:status" -ForegroundColor Gray
Write-Host ""
Write-Host "3. White Screen / No CSS:" -ForegroundColor Red
Write-Host "   - Check public_html symlink is correct" -ForegroundColor Gray
Write-Host "   - Verify public/build folder has compiled assets" -ForegroundColor Gray
Write-Host "   - Run: php artisan storage:link" -ForegroundColor Gray
Write-Host ""
Write-Host "4. View logs:" -ForegroundColor Red
Write-Host "   tail -f /home/u314333613/domains/sabing2m.com/laravel/storage/logs/laravel.log" -ForegroundColor Cyan
Write-Host ""

Write-Host "=====================================" -ForegroundColor Green
Write-Host "  Ready to Deploy!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
