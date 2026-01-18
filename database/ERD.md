# E-Sabong Database ERD

## Core Tables

### users
- id (PK)
- name
- email (unique)
- password
- **role** (enum: admin, declarator, teller)
- **is_active** (boolean)
- remember_token
- timestamps

### fights
- id (PK)
- fight_number (unique)
- meron_fighter
- wala_fighter
- status (enum: scheduled, betting_open, betting_closed, result_declared)
- meron_odds (decimal, nullable)
- wala_odds (decimal, nullable)
- auto_odds (boolean)
- result (enum: meron, wala, draw, cancelled, nullable)
- remarks (text, nullable)
- scheduled_at
- betting_opened_at
- betting_closed_at
- result_declared_at
- created_by (FK → users.id)
- declared_by (FK → users.id, nullable)
- timestamps
- soft_deletes

### bets
- id (PK)
- ticket_id (unique)
- fight_id (FK → fights.id)
- teller_id (FK → users.id)
- side (enum: meron, wala)
- amount (decimal)
- odds (decimal)
- potential_payout (decimal)
- status (enum: active, won, lost, cancelled, refunded)
- actual_payout (decimal, nullable)
- paid_at
- timestamps
- soft_deletes

### transactions
- id (PK)
- teller_id (FK → users.id)
- type (enum: cash_in, cash_out)
- amount (decimal)
- remarks (text, nullable)
- timestamps

### audit_logs
- id (PK)
- user_id (FK → users.id)
- action
- model_type (nullable)
- model_id (nullable)
- old_values (json, nullable)
- new_values (json, nullable)
- ip_address
- user_agent
- timestamps

## Relationships

1. **users → fights (created_by)**: One user (admin) can create many fights
2. **users → fights (declared_by)**: One user (declarator) can declare many fight results
3. **fights → bets**: One fight can have many bets
4. **users → bets (teller_id)**: One user (teller) can create many bets
5. **users → transactions**: One user (teller) can have many cash transactions
6. **users → audit_logs**: One user can have many audit log entries

## Business Rules

1. Only users with role='admin' can create/manage fights
2. Only users with role='teller' can create bets
3. Only users with role='declarator' can declare fight results
4. Bets can only be placed when fight.status = 'betting_open'
5. Once fight.status = 'result_declared', no changes allowed
6. ticket_id is auto-generated and unique
7. Odds are captured at bet placement time (immutable per bet)
8. Auto-odds calculation:
   - meron_odds = total_wala_bets / total_meron_bets
   - wala_odds = total_meron_bets / total_wala_bets

## Simplified Flow

```
ADMIN                    TELLER                   DECLARATOR
  |                        |                          |
  |--[Create Fight]------->|                          |
  |  (fight_number: 1)     |                          |
  |  (status: scheduled)   |                          |
  |                        |                          |
  |--[Open Betting]------->|                          |
  |  (status: betting_open)|                          |
  |                        |                          |
  |                        |--[Place Bet]             |
  |                        |  (side: meron)           |
  |                        |  (amount: 1000)          |
  |                        |  (ticket generated)      |
  |                        |                          |
  |--[Close Betting]------>|                          |
  |  (status: betting_closed)                         |
  |                        |                          |
  |                        |                          |
  |                        |<----[Declare Result]-----|
  |                        |     (result: meron)      |
  |                        |     (status: result_declared)
  |                        |                          |
  |<-[System calculates payouts for winning tickets]->|
```
