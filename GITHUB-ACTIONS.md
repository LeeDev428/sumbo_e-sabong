# GitHub Actions Setup Guide

## Why Use GitHub Actions?

GitHub Actions automates your deployment process. Benefits:

1. **Automatic Deployments** - Every push to master automatically builds and deploys
2. **Consistent Builds** - Same environment every time, no "works on my machine"
3. **Build Artifacts** - Compiled assets (CSS/JS) uploaded to production
4. **Migration Runner** - Automatically runs database migrations
5. **Team Collaboration** - Other devs push code, it auto-deploys
6. **No Manual Steps** - No need to manually SSH, build, upload, etc.

## How It Works

```
You push code to GitHub
    ↓
GitHub Actions triggered
    ↓
1. Builds frontend assets (npm run build)
2. SSHs into Hostinger
3. Pulls latest code with git
4. Installs composer dependencies
5. Runs migrations
6. Uploads compiled assets
7. Clears/caches Laravel config
    ↓
Production updated! 🎉
```

## Setup Instructions

### 1. Initialize Git on Hostinger (One-time setup)

SSH into your Hostinger server and run:

```bash
cd /home/u314333613/domains/sabing2m.com/laravel-app

# Initialize git repository
git init

# Add GitHub as remote (use your GitHub repo URL)
git remote add origin https://github.com/LeeDev428/sumbo_e-sabong.git

# Fetch from GitHub
git fetch origin

# Set tracking branch
git branch -u origin/master master

# Pull latest code
git pull origin master
```

### 2. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

| Secret Name | Value |
|------------|-------|
| `SSH_HOST` | `46.202.186.219` |
| `SSH_USERNAME` | `u314333613` |
| `SSH_PASSWORD` | `Ahrix@0428` |
| `SSH_PORT` | `65002` |

### 3. Test the Workflow

1. Make a small change to any file
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test GitHub Actions deployment"
   git push origin master
   ```
3. Go to GitHub → Actions tab → Watch the deployment run

### 4. Manual Deployment (if needed)

You can also trigger deployments manually:
1. Go to GitHub → Actions
2. Select "Deploy to Hostinger" workflow
3. Click "Run workflow" button

## Troubleshooting

**If deployment fails:**
- Check the Actions tab for error logs
- Verify SSH credentials are correct
- Ensure git is initialized on server
- Check file permissions on server

**If builds fail:**
- Check Node.js version compatibility
- Run `npm install` locally first
- Verify package.json scripts work locally

## Alternative: Deploy Script

If you prefer manual control, use the deploy script:
```powershell
# Windows
.\DEPLOY-HOSTINGER.ps1

# Or SSH manually
ssh -p 65002 u314333613@46.202.186.219
cd /home/u314333613/domains/sabing2m.com/laravel-app
git pull origin master
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan optimize
```
