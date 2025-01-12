# Multi-Option Deposit (MOD) System

A simple Node.js application that simulates a Multi-Option Deposit system for cryptocurrency portfolios. Users' balances are stored in a JSON file, and monthly rebalancing can be triggered via an HTTP endpoint.

## File Structure
my-mod-project/
├── package.json
├── README.md
├── .gitignore
├── index.js                 # Main entry point (starts server, initializes data)
└── src
    ├── domain/                  # Core business logic (entities, strategies, plan factory)
    │   ├── user.js
    │   ├── planFactory.js
    │   ├── plans/
    │   │   ├── basePlan.js
    │   │   ├── bronzePlan.js
    │   │   ├── silverPlan.js
    │   │   ├── goldPlan.js
    │   │   └── diamondPlan.js
    │   ├── thresholdStrategy.js
    │   └── strategies/
    │       ├── fixedThresholdStrategy.js
    │       └── noThresholdStrategy.js
    ├── services/
    │   ├── dataStoreService.js  # Reads/writes to JSON file
    │   ├── modService.js        # Interest calculation & rebalancing
    │   ├── analyticsService.js  # Summarizes total interest, plan distribution
    │   └── emailService.js      # (Optional) for sending notifications
    ├── controllers/
    │   ├── userController.js
    │   ├── modController.js
    │   ├── portfolioController.js
    │   └── analyticsController.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── modRoutes.js
    │   ├── portfolioRoutes.js
    │   └── analyticsRoutes.js
    └── data/
        └── users.json           # JSON file for user data


## How to Run

1. **Install dependencies**:
    ```bash
    npm install
    ```
2. **Run the application**:
    ```bash
    npm start
    ```
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
