# E-Sabong System - Setup Complete ✅

## Database Structure Created

### Core Tables:
1. **users** - User accounts with roles (admin, declarator, teller)
2. **fights** - Fight events with fighters and status tracking
3. **bets** - Betting tickets with odds and payouts
4. **transactions** - Cash in/out tracking for tellers
5. **audit_logs** - System activity logging

## Test User Accounts

### Admin
- **Email**: admin@esabong.com
- **Password**: password
- **Access**: Full system control

### Declarator
- **Email**: declarator@esabong.com
- **Password**: password
- **Access**: Declare fight results

### Teller
- **Email**: teller@esabong.com
- **Password**: password
- **Access**: Accept bets, manage transactions

## Application Flow

### 1. Authentication Flow
```
User accesses / → Redirected to /login → After login → Role-based dashboard redirect:
  - Admin → /admin/dashboard
  - Declarator → /declarator/dashboard
  - Teller → /teller/dashboard
```

### 2. Fight Lifecycle

```mermaid
ADMIN CREATES FIGHT (status: scheduled)
         ↓
ADMIN OPENS BETTING (status: betting_open)
         ↓
TELLERS ACCEPT BETS
(Odds locked at bet time)
         ↓
ADMIN CLOSES BETTING (status: betting_closed)
(Auto-odds calculated if enabled)
         ↓
DECLARATOR DECLARES RESULT (status: result_declared)
(System calculates payouts automatically)
```

### 3. Detailed Role Workflows

#### **ADMIN Workflow**
1. Login → Admin Dashboard
2. Create Fight:
   - Set fight number
   - Enter MERON fighter name
   - Enter WALA fighter name
   - Set odds (manual or enable auto-odds)
3. Open Betting (changes status to `betting_open`)
4. Monitor live betting
5. Close Betting when ready (changes status to `betting_closed`)
6. View reports and manage users

**Admin Pages:**
- `/admin/dashboard` - Overview with stats
- `/admin/fights` - Manage all fights (CRUD)
- `/admin/users` - Manage system users

#### **TELLER Workflow**
1. Login → Teller Dashboard
2. View open fights (status: `betting_open`)
3. Select a fight
4. Choose side (MERON or WALA)
5. Enter bet amount
6. System shows potential payout
7. Issue ticket (auto-generated ticket ID)
8. Print/display ticket to customer

**Teller Pages:**
- `/teller/dashboard` - Place bets interface
- `/teller/bets` - Bet history

**Bet Calculation:**
```
Potential Payout = Bet Amount × Odds
Example: ₱1000 × 1.5 = ₱1500 potential payout
```

#### **DECLARATOR Workflow**
1. Login → Declarator Dashboard
2. View closed fights awaiting results
3. Select fight
4. Declare result:
   - MERON Win
   - WALA Win
   - DRAW (refund all)
   - CANCELLED (refund all)
5. Add optional remarks
6. Confirm (FINAL - cannot undo)

**System automatically:**
- Marks winning bets as "won"
- Marks losing bets as "lost"
- Calculates actual payouts
- Handles refunds for draw/cancelled

**Declarator Pages:**
- `/declarator/dashboard` - View pending fights
- `/declarator/fights` - Declare results

## Features Implemented

### ✅ Phase 1 (BASIC - COMPLETE)
- [x] User authentication with 3 roles
- [x] Role-based dashboard redirection
- [x] Admin: Create/manage fights
- [x] Admin: Open/close betting
- [x] Teller: View open fights
- [x] Teller: Place bets with ticket generation
- [x] Declarator: View closed fights
- [x] Declarator: Declare results
- [x] Automatic payout calculation
- [x] Auto-odds calculation (optional)
- [x] Audit trail structure

### Database Features
- Soft deletes on fights and bets
- Timestamps on all tables
- Foreign key relationships
- Unique ticket IDs
- Immutable bet records

## Key Business Rules Enforced

1. **Betting Rules:**
   - Bets only accepted when status = `betting_open`
   - Odds captured at bet placement (immutable per bet)
   - Auto-odds update in real-time if enabled

2. **Fight Status Rules:**
   - `scheduled` → Can edit, can open betting
   - `betting_open` → Cannot edit, can close betting
   - `betting_closed` → Cannot edit, can declare result
   - `result_declared` → LOCKED (no changes allowed)

3. **Result Declaration:**
   - Only for `betting_closed` fights
   - FINAL and irreversible
   - Automatic payout processing

4. **Payout Logic:**
   ```php
   // Winning side
   actual_payout = bet_amount × odds
   
   // Losing side
   actual_payout = 0
   
   // Draw/Cancelled
   actual_payout = bet_amount (refund)
   ```

## API Endpoints

### Admin Routes
```
GET  /admin/dashboard              - Dashboard overview
GET  /admin/fights                 - List all fights
POST /admin/fights                 - Create fight
GET  /admin/fights/{id}            - View fight details
PUT  /admin/fights/{id}            - Update fight
DELETE /admin/fights/{id}          - Delete fight
POST /admin/fights/{id}/open-betting   - Open betting
POST /admin/fights/{id}/close-betting  - Close betting
GET  /admin/users                  - List users
POST /admin/users                  - Create user
```

### Declarator Routes
```
GET  /declarator/dashboard         - Dashboard with pending fights
GET  /declarator/fights            - List closed fights
POST /declarator/fights/{id}/declare - Declare result
```

### Teller Routes
```
GET  /teller/dashboard             - Dashboard with open fights
GET  /teller/fights                - List open fights
POST /teller/bets                  - Place bet
GET  /teller/bets                  - Bet history
POST /teller/transactions/cash-in  - Record cash in
POST /teller/transactions/cash-out - Record cash out
```

## Technology Stack

- **Backend**: Laravel 11
- **Frontend**: React (TypeScript) + Inertia.js
- **Database**: MySQL
- **Authentication**: Laravel Fortify
- **UI**: Tailwind CSS + shadcn/ui components

## Next Steps (Phase 2 - Optional Enhancements)

### High Priority:
1. Ticket printing functionality
2. QR code generation for tickets
3. Real-time updates using WebSockets
4. Financial reports dashboard
5. Payout tracking and history
6. User activity logs display

### Medium Priority:
7. SMS notifications for results
8. Mobile-responsive optimizations
9. Offline mode support
10. Backup/restore functionality

### Low Priority:
11. Multi-language support
12. Advanced analytics
13. Fight video integration
14. Player accounts & wallets

## Running the Application

### Start Development Server:
```bash
# Terminal 1 - Laravel Backend
php artisan serve

# Terminal 2 - Vite Frontend
npm run dev
```

### Access:
- **URL**: http://localhost:8000
- **Auto-redirect**: / → /login

### First Time Setup:
1. Login as Admin (admin@esabong.com / password)
2. Create a test fight
3. Open betting on the fight
4. Login as Teller (teller@esabong.com / password) in another browser
5. Place some test bets
6. Switch back to Admin and close betting
7. Login as Declarator (declarator@esabong.com / password)
8. Declare the result

## Database Commands

```bash
# Fresh migration (WARNING: Deletes all data)
php artisan migrate:fresh --seed

# Just seed (adds test users)
php artisan db:seed

# Create new migration
php artisan make:migration create_table_name

# Run migrations
php artisan migrate
```

## Project Structure

```
app/
├── Http/Controllers/
│   ├── Admin/
│   │   ├── FightController.php    # Fight CRUD
│   │   └── UserController.php     # User management
│   ├── Declarator/
│   │   └── ResultController.php   # Result declaration
│   └── Teller/
│       ├── BetController.php      # Betting operations
│       └── TransactionController.php
├── Models/
│   ├── User.php          # User with roles
│   ├── Fight.php         # Fight events
│   ├── Bet.php          # Betting tickets
│   ├── Transaction.php  # Cash tracking
│   └── AuditLog.php     # Activity logging

resources/js/
├── pages/
│   ├── admin/
│   │   └── dashboard.tsx        # Admin dashboard
│   ├── declarator/
│   │   └── dashboard.tsx        # Declarator dashboard
│   └── teller/
│       └── dashboard.tsx        # Teller dashboard
└── types/
    └── index.d.ts              # TypeScript definitions

routes/
└── web.php                     # All routes defined here
```

## Security Features

- Role-based access control (RBAC)
- Password hashing (bcrypt)
- CSRF protection
- Middleware authentication
- SQL injection prevention (Eloquent ORM)
- XSS protection (React escaping)

## Support & Troubleshooting

### Common Issues:

**Cannot login:**
- Check database connection in `.env`
- Run `php artisan config:clear`
- Verify user exists: `php artisan db:seed`

**Pages not loading:**
- Run `npm run build` or `npm run dev`
- Clear browser cache
- Check console for errors

**Permission denied:**
- Verify user role in database
- Check middleware in `routes/web.php`

---

**System Status**: ✅ OPERATIONAL
**Last Updated**: January 4, 2026
**Version**: 1.0.0 (Basic Implementation)
