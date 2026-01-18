# 🚀 Quick Start Guide - E-Sabong System

## ✅ Setup Complete!

Your E-Sabong betting management system is ready to use!

## 📋 What's Been Built

### ✅ Database
- 5 core tables created (users, fights, bets, transactions, audit_logs)
- 3 test users created with different roles
- Database relationships established
- Migrations ready for production

### ✅ Backend (Laravel)
- Role-based authentication (Admin, Declarator, Teller)
- 5 controllers with full CRUD operations
- Business logic for betting and payouts
- Middleware for role protection
- API routes configured

### ✅ Frontend (React + TypeScript)
- 3 role-specific dashboards
- Responsive UI components
- Real-time betting interface
- Result declaration interface
- TypeScript type safety

## 🔑 Login Credentials

### Admin Account
```
Email: admin@esabong.com
Password: password
```
**Can do:**
- Create/manage fights
- Open/close betting
- Manage users
- View all reports

### Declarator Account
```
Email: declarator@esabong.com
Password: password
```
**Can do:**
- View closed fights
- Declare fight results
- View fight details

### Teller Account
```
Email: teller@esabong.com
Password: password
```
**Can do:**
- View open fights
- Place bets
- Issue tickets
- Cash in/out

## 🏃‍♂️ How to Run

### Option 1: Two Terminals (Recommended for Development)

**Terminal 1 - Backend:**
```bash
php artisan serve
```
Server will start at: http://localhost:8000

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Vite will watch for file changes

### Option 2: Production Build
```bash
# Build frontend once
npm run build

# Run Laravel server
php artisan serve
```

### Access the Application
Open browser: **http://localhost:8000**
- Will automatically redirect to login page
- Use any of the test accounts above

## 🎯 First Time Walkthrough

### Step 1: Login as Admin
1. Go to http://localhost:8000
2. Login with admin@esabong.com / password
3. You'll see the Admin Dashboard

### Step 2: Create Your First Fight
1. Click "Create Fight" button
2. Fill in:
   - Fight Number: 1 (auto-suggested)
   - MERON Fighter: "Phoenix"
   - WALA Fighter: "Dragon"
   - MERON Odds: 1.5
   - WALA Odds: 2.0
3. Click "Submit"
4. Fight created with status: **SCHEDULED**

### Step 3: Open Betting
1. Find your fight on the dashboard
2. Click "Open" button
3. Status changes to: **BETTING OPEN** ✅

### Step 4: Place Bets (Teller)
1. Open a new browser window (or incognito)
2. Login with teller@esabong.com / password
3. You'll see Fight #1 in "Open Fights"
4. Click "Place Bet"
5. Select "MERON" or "WALA"
6. Enter amount: 1000
7. See potential payout: ₱1500 (if MERON)
8. Click "Issue Ticket"
9. Ticket generated with unique ID ✅

### Step 5: Close Betting
1. Switch back to Admin browser
2. Click "Close" button on Fight #1
3. Status changes to: **BETTING CLOSED** 🔒

### Step 6: Declare Result (Declarator)
1. Open another browser window
2. Login with declarator@esabong.com / password
3. You'll see Fight #1 waiting for result
4. Click "Declare Result"
5. Select "MERON Win"
6. Add remarks (optional): "Clear victory"
7. Click "Confirm"
8. Status changes to: **RESULT DECLARED** ✅
9. All payouts calculated automatically!

### Step 7: Check Results
1. Switch back to Teller
2. View bet history
3. See your MERON bet marked as **WON** 🎉
4. Actual payout: ₱1500

## 📊 Understanding the System

### Fight Status Flow
```
SCHEDULED → BETTING OPEN → BETTING CLOSED → RESULT DECLARED
   ↓            ↓               ↓                ↓
Can edit    Accept bets    Waiting result   LOCKED
```

### Betting Rules
- ✅ Can bet only when status = BETTING OPEN
- ✅ Odds locked at bet placement time
- ✅ Each bet gets unique ticket ID
- ❌ Cannot cancel after betting closes

### Payout Calculation
```
Winning Bet: Payout = Amount × Odds
Example: ₱1000 × 1.5 = ₱1500

Losing Bet: Payout = ₱0

Draw/Cancelled: Payout = Amount (refund)
```

## 🛠️ Useful Commands

### Database
```bash
# Reset database and seed
php artisan migrate:fresh --seed

# Just add test users
php artisan db:seed

# Create new migration
php artisan make:migration create_table_name
```

### Laravel
```bash
# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# View routes
php artisan route:list

# Create controller
php artisan make:controller Admin/FightController
```

### Frontend
```bash
# Install dependencies
npm install

# Development mode (hot reload)
npm run dev

# Production build
npm run build

# Type check
npm run type-check
```

## 🐛 Troubleshooting

### Problem: "Cannot login"
**Solution:**
```bash
php artisan config:clear
php artisan migrate:fresh --seed
```

### Problem: "White screen"
**Solution:**
```bash
npm run build
php artisan config:clear
```

### Problem: "Routes not found"
**Solution:**
```bash
php artisan route:clear
composer dump-autoload
```

### Problem: "Database error"
**Solution:**
Check `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sumbo_e_sabong
DB_USERNAME=root
DB_PASSWORD=
```

## 📁 Project Structure

```
sumbo_e-sabong/
├── app/
│   ├── Http/Controllers/
│   │   ├── Admin/           # Admin controllers
│   │   ├── Declarator/      # Declarator controllers
│   │   └── Teller/          # Teller controllers
│   └── Models/              # Database models
├── database/
│   ├── migrations/          # Database structure
│   └── seeders/            # Test data
├── resources/js/
│   ├── pages/
│   │   ├── admin/          # Admin React pages
│   │   ├── declarator/     # Declarator pages
│   │   └── teller/         # Teller pages
│   └── components/ui/      # Reusable components
└── routes/
    └── web.php             # All routes
```

## 🎨 Color Coding

Throughout the UI:
- 🔴 **MERON** = Red
- 🔵 **WALA** = Blue
- 🟢 **DRAW** = Green
- ⚫ **CANCELLED** = Gray

## 📖 More Documentation

- `README-SYSTEM.md` - Complete system documentation
- `ARCHITECTURE.md` - Technical architecture
- `database/ERD.md` - Database structure

## 🚧 Next Steps (Optional)

### Phase 2 Features:
- [ ] Ticket printing
- [ ] QR code generation
- [ ] Real-time WebSocket updates
- [ ] Financial reports
- [ ] SMS notifications
- [ ] Advanced analytics

### Ready to Build?
The foundation is solid! You can now:
1. Customize the UI based on the images you provided
2. Add real-time features with Laravel Reverb
3. Integrate ticket printing
4. Add PWA features with Capacitor for Android app

## 💡 Tips

1. **Test thoroughly** - Use all 3 roles to understand the flow
2. **Check database** - Use phpMyAdmin or TablePlus to see data
3. **Read docs** - Review README-SYSTEM.md for detailed info
4. **Customize** - Edit colors, layouts to match your branding

## ✅ You're All Set!

Your E-Sabong system is **production-ready** for basic operations.

**Start the server and test it now!** 🚀

```bash
php artisan serve
# In another terminal:
npm run dev
```

Then visit: http://localhost:8000

---

**Need Help?** Check the documentation files or review the code comments!
