
const BasePlan = require('./basePlan');

class DiamondPlan extends BasePlan {
  constructor() {
    super('Diamond', 0.22); // 22%
  }
}

module.exports = DiamondPlan;
