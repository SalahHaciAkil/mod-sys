// test/domain/strategies/noThresholdStrategy.test.js

const NoThresholdStrategy = require('../../src/domain/strategies/noThresholdStrategy');

describe('NoThresholdStrategy', () => {
  test('should return 0 surplus because user does not opt for MOD', () => {
    const strategy = new NoThresholdStrategy();
    expect(strategy.getSurplus(5000)).toBe(0);
  });
});
