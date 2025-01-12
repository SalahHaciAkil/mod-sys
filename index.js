// src/index.js
const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const modRoutes = require('./src/routes/modRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');
const dataStoreService = require('./src/services/dataStoreService');
const { User } = require('./src/domain/user');
const FixedThresholdStrategy = require('./src/domain/strategies/fixedThresholdStrategy');
const NoThresholdStrategy = require('./src/domain/strategies/noThresholdStrategy');
const { createUserObject } = require("./src/utils/user");

const app = express();
app.use(express.json());

// ROUTES
console.log('Registering routes...');

app.use('/api/users', userRoutes);
app.use('/api/mod', modRoutes);
app.use('/api/analytics', analyticsRoutes);

// ----- Create 5 sample users if none exist -----
initializeSampleUsers();

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/**
 * Creates 5 sample users if users.json is empty.
 */
function initializeSampleUsers() {
  let users = dataStoreService.loadUsers();
  if (users.length === 0) {
    console.log('No users found. Creating 5 sample users...');

    // Example threshold strategies
    const strategy1 = new FixedThresholdStrategy(2000);    // keep 2000 USDT in main
    const strategy2 = new NoThresholdStrategy();           // user not opting for MOD
    const strategy3 = new FixedThresholdStrategy(1000);

    const sampleUsers = [
      new User(createUserObject( { id: '1', name: 'Salah', email: 'salah@example.com', mainBalance: 5000, thresholdStrategy: strategy1 })),
      new User(createUserObject({ id: '2', name: 'Ahmad', email: 'ahmad@example.com', mainBalance: 4000, thresholdStrategy: strategy2 })),
      new User(createUserObject({ id: '3', name: 'Wael', email: 'wael@example.com', mainBalance: 2500, thresholdStrategy: strategy3 })),
    ];

    users = [...sampleUsers];
    dataStoreService.saveUsers(users);
    console.log('Sample users created successfully.');
  }
}
