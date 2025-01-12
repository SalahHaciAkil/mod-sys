// src/domain/strategies/noThresholdStrategy.js
const ThresholdStrategy = require('../thresholdStrategy');

class NoThresholdStrategy extends ThresholdStrategy {
  constructor() {
    super();
    this.type = 'none';
    this.value = 0;
  }

  getSurplus(mainBalance) {
    return 0;
  }
}

module.exports = NoThresholdStrategy;
