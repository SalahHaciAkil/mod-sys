
const BasePlan = require('./basePlan');

class SilverPlan extends BasePlan {
  constructor() {
    super('Silver', 0.15); // 15%
  }
}

module.exports = SilverPlan;
