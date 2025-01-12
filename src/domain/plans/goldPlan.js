
const BasePlan = require('./basePlan');

class GoldPlan extends BasePlan {
  constructor() {
    super('Gold', 0.18); // 18%
  }
}

module.exports = GoldPlan;
