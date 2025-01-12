// src/services/modService.js
const planFactory = require("../domain/planFactory");

function rebalanceUser(user) {
  // 1. Calculate interest if the user has an active plan  
  if (user.modBalance > 0 && user.plan && user.plan.rate) {
    let interest = user.modBalance * user.plan.rate; // e.g., 0.22 for Diamond
    interest = parseFloat(interest.toFixed(2)); // round to 2 decimal places
    user.mainBalance += interest;

    user.addInterestPaid(interest);
    console.log(
      `User ${user.name} earned interest: ${interest.toFixed(2)} USDT`
    );
  }

  // 2. Re-check surplus
  const surplus = user.calculateSurplus();
  if (surplus > 0) {
    user.investToMOD(surplus);
    console.log(
      `User ${user.name} invests surplus: ${surplus.toFixed(2)} USDT`
    );
  }

  // 3. Update plan based on new modBalance
  user.plan = planFactory(user.modBalance);
  if (user.plan) {
    console.log(`User ${user.name} is now on the ${user.plan.name} plan.`);
  } else {
    console.log(`User ${user.name} does not qualify for any plan.`);
  }
  return user;
}

module.exports = {
  rebalanceUser,
};
