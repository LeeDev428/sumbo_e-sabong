# E-Sabong System Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         E-SABONG SYSTEM                         │
│                    (Laravel + React + MySQL)                    │
└─────────────────────────────────────────────────────────────────┘

                              ┌─────────┐
                              │  LOGIN  │
                              └────┬────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
              ┌─────▼─────┐  ┌────▼────┐  ┌─────▼─────┐
              │   ADMIN   │  │  TELLER │  │DECLARATOR │
              │ Dashboard │  │Dashboard│  │ Dashboard │
              └─────┬─────┘  └────┬────┘  └─────┬─────┘
                    │              │              │
         ┌──────────┼──────────┐   │              │
         │          │          │   │              │
    ┌────▼───┐ ┌───▼────┐ ┌──▼───▼──┐      ┌────▼─────┐
    │ Create │ │ Manage │ │  View   │      │  Declare │
    │ Fight  │ │ Users  │ │  Stats  │      │  Result  │
    └────┬───┘ └────────┘ └─────────┘      └────┬─────┘
         │                                        │
    ┌────▼──────┐                          ┌─────▼──────┐
    │   FIGHT   │◄─────────────────────────┤  PROCESS   │
    │  CREATED  │                          │   PAYOUT   │
    └────┬──────┘                          └────────────┘
         │                                        ▲
    ┌────▼──────┐                                │
    │   OPEN    │                                │
    │  BETTING  │                                │
    └────┬──────┘                                │
         │                                        │
         │  ┌─────────────┐                      │
         ├─►│TELLER PLACES│                      │
         │  │    BETS     │                      │
         │  └──────┬──────┘                      │
         │         │                              │
         │    ┌────▼─────┐                       │
         │    │ GENERATE │                       │
         │    │  TICKET  │                       │
         │    └──────────┘                       │
         │                                        │
    ┌────▼──────┐                                │
    │   CLOSE   │                                │
    │  BETTING  │────────────────────────────────┘
    └───────────┘
```

## Data Flow

### 1. Fight Creation (Admin)
```
Admin → Creates Fight → Database (status: scheduled)
                     → Fight appears on all dashboards
```

### 2. Betting Phase (Admin + Teller)
```
Admin → Opens Betting → Database (status: betting_open)
                     → Teller sees open fights
                     
Teller → Selects Fight → Chooses Side (MERON/WALA)
      → Enters Amount → System Calculates Payout
      → Issues Ticket → Database saves bet
      → [Auto-odds update if enabled]
```

### 3. Result Declaration (Admin + Declarator)
```
Admin → Closes Betting → Database (status: betting_closed)
                      → Fight appears on Declarator dashboard
                      
Declarator → Selects Fight → Declares Result (Meron/Wala/Draw/Cancel)
          → Confirms → Database (status: result_declared)
          → System processes ALL bets:
              - Winners get potential_payout
              - Losers get 0
              - Draw/Cancel get refund
```

## Database Relationships

```
users (1) ────────> (N) fights [created_by]
users (1) ────────> (N) fights [declared_by]
users (1) ────────> (N) bets [teller_id]
users (1) ────────> (N) transactions [teller_id]
users (1) ────────> (N) audit_logs [user_id]

fights (1) ───────> (N) bets [fight_id]
```

## Role-Based Access Matrix

| Feature                | Admin | Declarator | Teller |
|------------------------|-------|------------|--------|
| Create Fight           |   ✅   |     ❌      |   ❌    |
| Open/Close Betting     |   ✅   |     ❌      |   ❌    |
| View All Fights        |   ✅   |     ✅      |   ✅    |
| Place Bets             |   ❌   |     ❌      |   ✅    |
| Declare Results        |   ❌   |     ✅      |   ❌    |
| Manage Users           |   ✅   |     ❌      |   ❌    |
| View Reports           |   ✅   |     ✅      |   ✅    |
| Cash In/Out            |   ❌   |     ❌      |   ✅    |

## API Request/Response Examples

### Admin: Create Fight
```json
POST /admin/fights
{
  "fight_number": 1,
  "meron_fighter": "Phoenix",
  "wala_fighter": "Dragon",
  "meron_odds": 1.5,
  "wala_odds": 2.0,
  "auto_odds": false,
  "scheduled_at": "2026-01-04 18:00:00"
}

Response:
{
  "success": true,
  "message": "Fight created successfully",
  "fight": {
    "id": 1,
    "fight_number": 1,
    "status": "scheduled",
    ...
  }
}
```

### Teller: Place Bet
```json
POST /teller/bets
{
  "fight_id": 1,
  "side": "meron",
  "amount": 1000
}

Response:
{
  "success": true,
  "message": "Bet placed successfully",
  "ticket": {
    "ticket_id": "TKT-ABC123XYZ",
    "fight_id": 1,
    "side": "meron",
    "amount": 1000,
    "odds": 1.5,
    "potential_payout": 1500,
    "status": "active"
  }
}
```

### Declarator: Declare Result
```json
POST /declarator/fights/1/declare
{
  "result": "meron",
  "remarks": "Clear win by technical knockout"
}

Response:
{
  "success": true,
  "message": "Result declared successfully. Payouts calculated.",
  "fight": {
    "id": 1,
    "result": "meron",
    "status": "result_declared",
    "result_declared_at": "2026-01-04 18:30:00"
  },
  "payouts": {
    "total_winners": 15,
    "total_payout": 45000,
    "total_losers": 10
  }
}
```

## Component Structure

```
resources/js/
├── components/
│   └── ui/
│       ├── badge.tsx         # Status badges
│       ├── button.tsx        # Action buttons
│       ├── card.tsx          # Content cards
│       └── ...
├── layouts/
│   └── app-layout.tsx       # Main authenticated layout
├── pages/
│   ├── admin/
│   │   └── dashboard.tsx    # Admin overview
│   ├── declarator/
│   │   └── dashboard.tsx    # Declarator interface
│   ├── teller/
│   │   └── dashboard.tsx    # Teller betting UI
│   └── auth/                # Login pages
└── types/
    └── index.d.ts           # TypeScript types
```

## Color Coding Convention

Throughout the UI:

- **🔴 MERON (Red)**: `text-red-600`, `bg-red-50`, `border-red-600`
- **🔵 WALA (Blue)**: `text-blue-600`, `bg-blue-50`, `border-blue-600`
- **🟢 DRAW (Green)**: `text-green-600`, `bg-green-50`
- **⚫ CANCELLED (Gray)**: `text-gray-600`, `bg-gray-50`

Status Colors:
- **Scheduled**: Secondary badge (gray)
- **Betting Open**: Default badge (primary)
- **Betting Closed**: Destructive badge (red)
- **Result Declared**: Outline badge (neutral)

## Real-World Usage Scenario

### Morning Setup (8:00 AM)
1. Admin logs in
2. Creates 10 fights for the day
3. Sets fight times and odds

### Fight Time (10:00 AM)
1. Admin opens betting for Fight #1
2. 3 Tellers start accepting bets
3. Customers place bets on MERON or WALA
4. Tickets generated with QR codes
5. Auto-odds update based on bet distribution

### Fight End (10:15 AM)
1. Admin closes betting
2. Fight happens (physical event)
3. Declarator declares result: "MERON WINS"
4. System automatically:
   - Marks all MERON bets as WON
   - Marks all WALA bets as LOST
   - Calculates payouts
   - Updates financial records

### Payout Time (10:20 AM)
1. Winners present tickets
2. Teller scans QR code
3. System verifies win
4. Teller pays out calculated amount
5. System marks ticket as PAID

### Reporting (End of Day)
1. Admin views daily summary
2. Total bets: ₱100,000
3. Total payouts: ₱85,000
4. Gross revenue: ₱15,000
5. Fight-by-fight breakdown available

---

**Architecture Version**: 1.0
**Created**: January 4, 2026
**Status**: Production Ready
