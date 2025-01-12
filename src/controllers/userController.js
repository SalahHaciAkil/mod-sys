const dataStoreService = require("../services/dataStoreService");
const { User } = require("../domain/user");
const FixedThresholdStrategy = require("../domain/strategies/fixedThresholdStrategy");
const NoThresholdStrategy = require("../domain/strategies/noThresholdStrategy");
const { createUserObject } = require("../utils/user");

exports.getAllUsers = (req, res) => {
  try {
    const users = dataStoreService.loadUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error getting all users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserById = (req, res) => {
  const { userId } = req.params;
  const users = dataStoreService.loadUsers();

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.status(200).json(user);
};

/**
 * Creates a user with a chosen threshold strategy
 */
exports.createUser = (req, res) => {
  try {
    const { id, name, email, mainBalance, thresholdType, thresholdValue } =
      req.body;
    const users = dataStoreService.loadUsers();

    // Decide which strategy to instantiate
    let strategy;
    switch (thresholdType) {
      case "fixed":
        strategy = new FixedThresholdStrategy(thresholdValue);
        break;
      default:
        strategy = new NoThresholdStrategy();
        break;
    }

    const newUser = new User(
      createUserObject({
        id: id || String(Date.now()),
        name,
        email,
        mainBalance: mainBalance || 0,
        thresholdStrategy: strategy,
      })
    );

    users.push(newUser);
    dataStoreService.saveUsers(users);

    return res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePortfolio = (req, res) => {
  try {
    const { userId } = req.params;
    const newAllocation = req.body; // e.g. { BTC: 50, ETH: 30, USDT: 20 }

    // Basic validation: ensure allocations sum to 1.0 or 100%
    const totalAllocation = Object.values(newAllocation).reduce(
      (sum, val) => sum + val,
      0
    );
    if (totalAllocation !== 100) {
      return res.status(400).json({ error: "Allocation must sum to 100%" });
    }

    const users = dataStoreService.loadUsers();
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's portfolio
    users[userIndex].portfolio = newAllocation;
    dataStoreService.saveUsers(users);

    return res.status(200).json({
      message: "Portfolio updated successfully",
      user: users[userIndex],
    });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
