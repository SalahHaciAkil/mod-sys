// src/domain/planFactory.js

const BronzePlan = require('./plans/bronzePlan');
const SilverPlan = require('./plans/silverPlan');
const GoldPlan = require('./plans/goldPlan');
const DiamondPlan = require('./plans/diamondPlan');

function planFactory(modBalance) {
  if (modBalance >= 3000) {
    return new DiamondPlan();
  } else if (modBalance >= 2500) {
    return new GoldPlan();
  } else if (modBalance >= 2000) {
    return new SilverPlan();
  } else if (modBalance >= 1000) {
    return new BronzePlan();
  }
  return null; // Not in a plan if under 1000
}

module.exports = planFactory;
