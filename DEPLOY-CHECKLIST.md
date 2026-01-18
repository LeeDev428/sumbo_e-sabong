# Quick Deployment Checklist

## ✅ Pre-Deployment (Completed)
- [x] Built production assets (`public/build/`)
- [x] Created production .env file
- [x] Database credentials configured

## 📤 Upload Files (YOU NEED TO DO THIS)

### Download & Install WinSCP
1. Download: https://winscp.net/download/WinSCP-Latest-Setup.exe
2. Install and open WinSCP

### Connect to Server
- Protocol: **SFTP**
- Host: **46.202.186.219**
- Port: **65002**
- Username: **u314333613**
- Password: **Ahrix@0428**

### Upload Steps
1. Click "Login" in WinSCP
2. Navigate to: `/home/u314333613/domains/sabing2m.com/`
3. Create folder named: **laravel**
4. Upload ALL files from your local project to the **laravel** folder
   - Local path: `d:\Programming\Systems\PWA-Systems\Laravel\sumbo_e-sabong`
   - Remote path: `/home/u314333613/domains/sabing2m.com/laravel/`

## 🖥️ Server Setup (After Upload)

### Connect via SSH
Open PowerShell or Command Prompt:
```bash
ssh -p 65002 u314333613@46.202.186.219
```
Password: **Ahrix@0428**

### Run These Commands (Copy & Paste)
```bash
cd /home/u314333613/domains/sabing2m.com/laravel
cp .env.production .env
composer install --no-dev --optimize-autoloader
chmod -R 775 storage bootstrap/cache
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan db:seed --force
cd ..
rm -rf public_html
ln -s /home/u314333613/domains/sabing2m.com/laravel/public public_html
```

## ✅ Test Deployment

Visit: **https://sabing2m.com**

Login with:
- Admin: admin@esabong.com / password
- Declarator: declarator@esabong.com / password
- Teller: teller@esabong.com / password

## 🐛 If Something Goes Wrong

Check logs:
```bash
tail -50 /home/u314333613/domains/sabing2m.com/laravel/storage/logs/laravel.log
```

See full guide: **DEPLOYMENT-GUIDE.md**
