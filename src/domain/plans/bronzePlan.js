
const BasePlan = require('./basePlan');

class BronzePlan extends BasePlan {
  constructor() {
    super('Bronze', 0.10); // 10%
  }
}

module.exports = BronzePlan;
