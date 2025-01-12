const FixedThresholdStrategy = require("../domain/strategies/fixedThresholdStrategy");
const NoThresholdStrategy = require("../domain/strategies/noThresholdStrategy");
const { User } = require("../domain/user");
const dataStoreService = require("../services/dataStoreService");
const { rebalanceUser } = require("../services/modService");
const { createUserObject } = require("../utils/user");

function mapThresholdStrategyToDTO(strategy) {
  if (strategy.type === "fixed") {
    return new FixedThresholdStrategy(strategy.value);
  }
  return new NoThresholdStrategy();
}

function mapUsersToDTO(users) {
  return users.map((user) => {
    return new User(
      createUserObject({
        ...user,
        thresholdStrategy: mapThresholdStrategyToDTO(user.thresholdStrategy),
      })
    );
  });
}
exports.rebalanceAllUsers = (req, res) => {
  try {
    let users = mapUsersToDTO(dataStoreService.loadUsers());
    users = users.map((user) => rebalanceUser(user));
    dataStoreService.saveUsers(users);
    return res.status(200).json({ message: "All users rebalanced", users });
  } catch (error) {
    console.error("Error rebalancing all users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
