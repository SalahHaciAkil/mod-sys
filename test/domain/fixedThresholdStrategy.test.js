// test/domain/strategies/fixedThresholdStrategy.test.js

const FixedThresholdStrategy = require('../../src/domain/strategies/fixedThresholdStrategy');

describe('FixedThresholdStrategy', () => {
  test('should return surplus = mainBalance - thresholdAmount if above threshold', () => {
    const strategy = new FixedThresholdStrategy(2000);
    const surplus = strategy.getSurplus(5000);
    expect(surplus).toBe(3000);
  });

  test('should return 0 if mainBalance <= thresholdAmount', () => {
    const strategy = new FixedThresholdStrategy(2000);
    const surplus = strategy.getSurplus(1500);
    expect(surplus).toBe(0);
  });
});
