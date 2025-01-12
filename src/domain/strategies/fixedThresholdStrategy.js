// src/domain/strategies/fixedThresholdStrategy.js
const ThresholdStrategy = require('../thresholdStrategy');

class FixedThresholdStrategy extends ThresholdStrategy {
  constructor(thresholdAmount) {
    super();
    this.type = 'fixed';
    this.value = thresholdAmount;
  }

  getSurplus(mainBalance) {
    const surplus = mainBalance - this.value;
    return surplus > 0 ? surplus : 0;
  }
}

module.exports = FixedThresholdStrategy;
