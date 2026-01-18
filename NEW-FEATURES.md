# New Features Implemented

## ✅ Requirement 1: Bet Control System
**Feature**: Admin can temporarily close/hold betting for Meron or Wala sides to maintain balance

### What was added:
1. **Database Fields** (Migration: `2026_01_09_065521_add_bet_controls_and_commission_to_fights_table.php`)
   - `meron_betting_open` (boolean, default: true)
   - `wala_betting_open` (boolean, default: true)
   - `commission_percentage` (decimal, default: 7.5%)

2. **Fight Model Updates** (`app/Models/Fight.php`)
   - Added new fields to `$fillable` and `$casts`
   - New helper methods:
     - `canAcceptMeronBets()` - Returns true only if fight is open AND meron_betting_open is true
     - `canAcceptWalaBets()` - Returns true only if fight is open AND wala_betting_open is true

3. **Admin Bet Controls Page** (`resources/js/pages/admin/bet-controls/index.tsx`)
   - View all active fights (standby, open, lastcall)
   - Visual bet distribution bar showing Meron vs Wala percentages
   - Toggle buttons to close/open Meron betting
   - Toggle buttons to close/open Wala betting
   - Commission percentage settings per fight
   - Live calculation preview showing:
     * Total Pot
     * Commission amount
     * Net Pot (after commission)

4. **Backend Controller** (`app/Http/Controllers/Admin/BetControlController.php`)
   - `index()` - Lists all active fights with bet totals
   - `toggleMeron()` - Opens/closes Meron betting
   - `toggleWala()` - Opens/closes Wala betting
   - `updateCommission()` - Updates commission percentage for specific fight

5. **Routes Added** (`routes/web.php`)
   ```php
   Route::get('bet-controls', [BetControlController::class, 'index']);
   Route::post('bet-controls/{fight}/toggle-meron', [BetControlController::class, 'toggleMeron']);
   Route::post('bet-controls/{fight}/toggle-wala', [BetControlController::class, 'toggleWala']);
   Route::post('bet-controls/{fight}/commission', [BetControlController::class, 'updateCommission']);
   ```

6. **Teller Validation** (`app/Http/Controllers/Teller/BetController.php`)
   - Prevents tellers from betting on Meron when `meron_betting_open = false`
   - Prevents tellers from betting on Wala when `wala_betting_open = false`
   - Shows error message: "Meron/Wala betting is temporarily closed by admin"

7. **UI Updates for Tellers** (`resources/js/pages/teller/dashboard.tsx`)
   - Meron/Wala buttons are grayed out (opacity-50) when closed by admin
   - Buttons are disabled (cursor-not-allowed)
   - Bottom label shows "🔒 CLOSED" instead of bet limits

8. **Admin Sidebar** (`resources/js/layouts/admin-layout.tsx`)
   - Added "🎛️ Bet Controls" menu item

---

## ✅ Requirement 2: Commission System
**Feature**: Arena management commission deducted from each fight's total pot before payout

### How it works:

#### Example Calculation (7.5% commission):
```
Meron Total Bets: ₱900
Wala Total Bets: ₱1000
--------------------------------
Total Pot: ₱1900
Commission (7.5%): ₱142.50
Net Pot: ₱1757.50
--------------------------------
If Meron wins:
  Meron Payout per ₱100 bet = (1757.50 ÷ 900) × 100 = ₱195.28

If Wala wins:
  Wala Payout per ₱100 bet = (1757.50 ÷ 1000) × 100 = ₱175.75
```

### Implementation Details:

1. **Payout Calculation** (`app/Http/Controllers/Declarator/ResultController.php`)
   - Modified `processPayouts()` method to:
     1. Calculate total pot (all bets)
     2. Calculate commission: `total × (commission_percentage / 100)`
     3. Calculate net pot: `total - commission`
     4. Calculate payout multiplier: `net_pot / winning_side_total`
     5. Distribute to winners: `bet_amount × payout_multiplier`

2. **Commission Settings**
   - Default: 7.5% (set in migration)
   - Can be changed per fight in Bet Controls page
   - Stored in `fights.commission_percentage` column

3. **Visual Feedback**
   - Bet Controls page shows live commission calculation
   - Preview shows:
     * Total Pot
     * Commission amount (highlighted in purple)
     * Net Pot for distribution (highlighted in green)

---

## How to Use

### Admin - Control Betting Balance:
1. Go to **Admin → Bet Controls** in sidebar
2. See all active fights with bet distribution visualization
3. If Meron has too many bets (creating imbalanced odds for Wala):
   - Click "🔒 BETTING CLOSED" button under Meron
   - Meron betting stops, tellers can only bet on Wala
   - Balance is restored
4. When balanced, click "✅ ACCEPTING BETS" to re-open
5. Click "Commission: X%" to adjust commission for that specific fight

### Admin - Set Commission:
1. In Bet Controls page, click the purple "Commission: 7.5%" button
2. Enter desired percentage (0-100)
3. See live preview of commission calculation
4. Click "Update Commission"

### Teller - Respect Bet Controls:
- If admin closes Meron betting, the Meron button is grayed out
- Shows "🔒 CLOSED" at the bottom
- Cannot click to select Meron
- Can only bet on open sides (Wala or Draw)
- If attempting to bet on closed side via API, receives error message

---

## Database Schema Changes

```sql
ALTER TABLE fights 
ADD COLUMN meron_betting_open BOOLEAN DEFAULT TRUE AFTER wala_odds,
ADD COLUMN wala_betting_open BOOLEAN DEFAULT TRUE AFTER meron_betting_open,
ADD COLUMN commission_percentage DECIMAL(5,2) DEFAULT 7.5 AFTER wala_betting_open;
```

---

## Files Modified/Created

### Created:
- `database/migrations/2026_01_09_065521_add_bet_controls_and_commission_to_fights_table.php`
- `app/Http/Controllers/Admin/BetControlController.php`
- `resources/js/pages/admin/bet-controls/index.tsx`

### Modified:
- `app/Models/Fight.php` - Added fields and helper methods
- `app/Http/Controllers/Teller/BetController.php` - Added bet control validation
- `app/Http/Controllers/Declarator/ResultController.php` - Added commission calculation
- `routes/web.php` - Added bet control routes and updated teller dashboard data
- `resources/js/layouts/admin-layout.tsx` - Added sidebar menu item
- `resources/js/pages/teller/dashboard.tsx` - Added UI for closed betting sides
- `resources/js/types/index.d.ts` - Added TypeScript types

---

## Benefits

### For Arena Management:
✅ Guaranteed commission from every fight (default 7.5%)
✅ Commission is transparent and configurable
✅ Automatic deduction before payout calculation

### For Admins:
✅ Maintain balanced betting with one-click controls
✅ Prevent excessive odds imbalance
✅ Real-time visualization of bet distribution
✅ Per-fight commission control

### For Tellers:
✅ Clear visual feedback when betting is closed
✅ Cannot accidentally bet on closed sides
✅ Helpful error messages

---

## Testing Checklist

- [x] Migration runs successfully
- [x] Bet Controls page loads with active fights
- [x] Toggling Meron betting closes/opens betting
- [x] Toggling Wala betting closes/opens betting
- [x] Tellers cannot bet on closed sides (validation works)
- [x] Teller UI shows closed buttons as grayed out
- [x] Commission percentage can be updated per fight
- [x] Payout calculation includes commission deduction
- [x] Commission preview shows correct calculations
- [x] Menu item appears in admin sidebar
