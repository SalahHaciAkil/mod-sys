# Multi-Option Deposit (MOD) System

A simple Node.js application that simulates a Multi-Option Deposit system for cryptocurrency portfolios. Users' balances are stored in a JSON file, and monthly rebalancing can be triggered via an HTTP endpoint.

## File Structure

mod-system
├── data
│ └── balances.json
├── src
│ ├── controllers
│ │ └── mod.controller.js
│ ├── models
│ │ └── user.model.js

## How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run the application**:
   `bash
    npm start
    `
   the server will start on http://localhost:3000.

## KEY POINTS

1. **User Balances**:

   - User balances are stored in a JSON file (`data/balances.json`).
   - Each user has a `main` account and a `mod` account.
   - The `main` account is used for regular transactions, while the `mod` account is used for surplus funds.
   - Users can have different plans with varying interest rates and thresholds.

2. **Rebalancing Process**:

   - The rebalancing process is triggered via an HTTP endpoint (`POST /api/mod/rebalance`).
   - It calculates interest based on each user's current plan.
   - It credits interest to their `main` account.
   - It moves any surplus funds above the fixed threshold from their `main` account to their `mod` account.
   - It updates user plans accordingly.

3. **Data Storage**:
   - User balances are stored in a JSON file (`data/balances.json`).
