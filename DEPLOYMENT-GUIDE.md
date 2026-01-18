# E-Sabong Deployment to Hostinger - Complete Guide

## 🚀 Quick Overview

This guide will help you deploy the E-Sabong Laravel application to Hostinger shared hosting.

**Domain:** sabing2m.com  
**Server:** Hostinger Shared Hosting  
**SSH Access:** Enabled

---

## 📋 Pre-Deployment Checklist

- [x] Production assets built (`npm run build`)
- [x] Production .env file created (`.env.production`)
- [x] Database credentials configured
- [ ] Files uploaded to server
- [ ] Composer dependencies installed on server
- [ ] Database migrations run
- [ ] Symbolic link created for public folder

---

## 🔧 Server Credentials

**SSH Details:**
- Host: `46.202.186.219`
- Port: `65002`
- Username: `u314333613`
- Password: `Ahrix@0428`

**MySQL Database:**
- Database: `u314333613_e_sabong`
- Username: `u314333613_e_sabong`
- Password: `Ahrix@0428`
- Host: `127.0.0.1`

---

## 📦 Step 1: Upload Files to Server

### Option A: Using WinSCP (Recommended)

1. **Download WinSCP**
   - Visit: https://winscp.net/download/WinSCP-Latest-Setup.exe
   - Install and open

2. **Configure Connection**
   - Protocol: `SFTP`
   - Host: `46.202.186.219`
   - Port: `65002`
   - Username: `u314333613`
   - Password: `Ahrix@0428`

3. **Upload Files**
   - Navigate to: `/home/u314333613/domains/sabing2m.com/`
   - Create folder: `laravel`
   - Upload ALL files from your local project to the `laravel` folder
   - **Important:** Make sure to upload:
     - All PHP files
     - `vendor/` folder (or install composer dependencies on server)
     - `public/build/` folder (compiled assets)
     - `.env.production` file
     - All configuration files

### Option B: Using FileZilla

1. **Download FileZilla**
   - Visit: https://filezilla-project.org/download.php?type=client

2. **Configure Connection**
   - Host: `sftp://46.202.186.219`
   - Username: `u314333613`
   - Password: `Ahrix@0428`
   - Port: `65002`

3. **Upload files** as described in Option A

---

## 🖥️ Step 2: Server Configuration via SSH

### Connect to Server

```bash
ssh -p 65002 u314333613@46.202.186.219
# Enter password: Ahrix@0428
```

### Run Setup Commands

```bash
# Navigate to Laravel directory
cd /home/u314333613/domains/sabing2m.com/laravel

# Copy production environment file
cp .env.production .env

# Install Composer dependencies (if not uploaded)
composer install --no-dev --optimize-autoloader

# Set correct permissions
find storage -type d -exec chmod 755 {} \;
find storage -type f -exec chmod 644 {} \;
find bootstrap/cache -type d -exec chmod 755 {} \;
find bootstrap/cache -type f -exec chmod 644 {} \;
chmod -R 775 storage
chmod -R 775 bootstrap/cache

# Clear existing caches
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Generate optimized config cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run database migrations
php artisan migrate --force

# Seed database with test users
php artisan db:seed --force

# Create symbolic link for public folder
cd /home/u314333613/domains/sabing2m.com
rm -rf public_html
ln -s /home/u314333613/domains/sabing2m.com/laravel/public public_html

# Verify symlink
ls -la public_html
```

---

## ⚙️ Step 3: Hostinger cPanel Configuration

1. **Login to Hostinger cPanel**
   - Visit: https://hpanel.hostinger.com

2. **Configure PHP Version**
   - Go to: `Advanced` → `PHP Configuration`
   - Set PHP version: **8.2 or higher**
   - Click `Save`

3. **Enable Required PHP Extensions**
   - In PHP Configuration, enable:
     - ✅ BCMath
     - ✅ Ctype
     - ✅ Fileinfo
     - ✅ JSON
     - ✅ Mbstring
     - ✅ OpenSSL
     - ✅ PDO
     - ✅ PDO MySQL
     - ✅ Tokenizer
     - ✅ XML
     - ✅ cURL

4. **Increase PHP Limits** (if available)
   - `upload_max_filesize`: `10M`
   - `post_max_size`: `10M`
   - `max_execution_time`: `300`
   - `memory_limit`: `256M`

5. **Verify Database Connection**
   - Go to: `Databases` → `MySQL Databases`
   - Confirm database `u314333613_e_sabong` exists
   - Confirm user `u314333613_e_sabong` has all privileges

---

## 🔐 Step 4: Test User Accounts

After deployment, you can login with these accounts:

### Admin Account
- **Email:** `admin@esabong.com`
- **Password:** `password`
- **Access:** Full system control, fight management, settings

### Declarator Account
- **Email:** `declarator@esabong.com`
- **Password:** `password`
- **Access:** Declare fight results

### Teller Account
- **Email:** `teller@esabong.com`
- **Password:** `password`
- **Access:** Accept bets, manage transactions

---

## ✅ Step 5: Verify Deployment

1. **Visit Website**
   ```
   https://sabing2m.com
   ```

2. **Check Login Page**
   - Should see the login form
   - No 500 errors
   - CSS and styling loads correctly

3. **Test Admin Login**
   - Login with admin credentials
   - Access admin dashboard
   - Check if fights can be created

4. **Test Database Connection**
   - All data should load correctly
   - No database connection errors

---

## 🐛 Troubleshooting

### Issue 1: 500 Internal Server Error

**Possible Causes:**
- Incorrect file permissions
- Missing .env file
- PHP version incompatibility

**Solutions:**
```bash
# Check Laravel log
tail -50 /home/u314333613/domains/sabing2m.com/laravel/storage/logs/laravel.log

# Fix permissions
cd /home/u314333613/domains/sabing2m.com/laravel
chmod -R 775 storage bootstrap/cache

# Clear cache
php artisan config:clear
php artisan cache:clear
```

### Issue 2: Database Connection Error

**Solutions:**
```bash
# Verify database credentials in .env
cat .env | grep DB_

# Test database connection
php artisan migrate:status

# If fails, check database exists in cPanel
# Recreate database user if needed
```

### Issue 3: White Screen or Missing CSS

**Solutions:**
```bash
# Verify public_html symlink
ls -la /home/u314333613/domains/sabing2m.com/public_html

# Recreate symlink if broken
cd /home/u314333613/domains/sabing2m.com
rm -rf public_html
ln -s /home/u314333613/domains/sabing2m.com/laravel/public public_html

# Check if build assets exist
ls -la /home/u314333613/domains/sabing2m.com/laravel/public/build/
```

### Issue 4: Permission Denied Errors

**Solutions:**
```bash
# Set correct ownership (if you have sudo access)
chown -R u314333613:u314333613 /home/u314333613/domains/sabing2m.com/laravel

# Set correct permissions
find /home/u314333613/domains/sabing2m.com/laravel -type d -exec chmod 755 {} \;
find /home/u314333613/domains/sabing2m.com/laravel -type f -exec chmod 644 {} \;
chmod -R 775 /home/u314333613/domains/sabing2m.com/laravel/storage
chmod -R 775 /home/u314333613/domains/sabing2m.com/laravel/bootstrap/cache
```

### Issue 5: Session/Cache Issues

**Solutions:**
```bash
# Clear all caches
php artisan optimize:clear

# Regenerate caches
php artisan optimize

# If sessions not working, check database
php artisan session:table
php artisan migrate
```

---

## 📊 View Logs

```bash
# Real-time log monitoring
tail -f /home/u314333613/domains/sabing2m.com/laravel/storage/logs/laravel.log

# View last 100 lines
tail -100 /home/u314333613/domains/sabing2m.com/laravel/storage/logs/laravel.log

# Search for errors
grep "ERROR" /home/u314333613/domains/sabing2m.com/laravel/storage/logs/laravel.log
```

---

## 🔄 Future Updates/Re-deployment

When you need to update the application:

```bash
# 1. Build assets locally
npm run build

# 2. Upload changed files via SFTP

# 3. SSH to server
ssh -p 65002 u314333613@46.202.186.219

# 4. Clear caches
cd /home/u314333613/domains/sabing2m.com/laravel
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# 5. Run new migrations (if any)
php artisan migrate --force

# 6. Regenerate cache
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## 📝 Important Notes

1. **Security:**
   - Change default passwords after first login
   - Keep `APP_DEBUG=false` in production
   - Never commit `.env` file to git

2. **Backups:**
   - Regularly backup database via cPanel
   - Keep local copy of uploaded files
   - Export database before major changes

3. **Performance:**
   - Always run with caching enabled
   - Use `composer install --optimize-autoloader --no-dev`
   - Keep `APP_DEBUG=false` for better performance

4. **SSL Certificate:**
   - Hostinger provides free SSL certificates
   - Enable it in cPanel → SSL/TLS
   - Force HTTPS in `.htaccess` (already configured)

---

## ✨ Success Indicators

You'll know deployment is successful when:

- ✅ Website loads at https://sabing2m.com
- ✅ No 500 or 404 errors
- ✅ CSS and JavaScript load correctly
- ✅ Login page is functional
- ✅ Can login with test accounts
- ✅ Dashboard displays correctly
- ✅ Fight creation/management works
- ✅ Betting system is functional

---

## 🆘 Getting Help

If you encounter issues:

1. Check error logs (see "View Logs" section)
2. Review troubleshooting section
3. Verify all steps were completed
4. Contact Hostinger support for server-specific issues

---

## 📞 Support Contact

**Hostinger Support:**
- Live Chat: Available in cPanel
- Email: support@hostinger.com
- Knowledge Base: https://support.hostinger.com

---

**Deployment Date:** January 18, 2026  
**Application:** E-Sabong System v1.0  
**Server:** Hostinger Shared Hosting  
**Domain:** sabing2m.com
