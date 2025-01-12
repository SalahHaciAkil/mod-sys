// test/domain/planFactory.test.js

const planFactory = require('../../src/domain/planFactory');
const BronzePlan = require('../../src/domain/plans/bronzePlan');
const SilverPlan = require('../../src/domain/plans/silverPlan');
const GoldPlan = require('../../src/domain/plans/goldPlan');
const DiamondPlan = require('../../src/domain/plans/diamondPlan');

describe('planFactory', () => {
  test('should return null if modBalance < 1000', () => {
    expect(planFactory(999)).toBeNull();
  });

  test('should return BronzePlan if 1000 <= modBalance < 2000', () => {
    const plan = planFactory(1500);
    expect(plan).toBeInstanceOf(BronzePlan);
    expect(plan.name).toBe('Bronze');
    expect(plan.rate).toBe(0.10);
  });

  test('should return SilverPlan if 2000 <= modBalance < 2500', () => {
    const plan = planFactory(2200);
    expect(plan).toBeInstanceOf(SilverPlan);
    expect(plan.name).toBe('Silver');
    expect(plan.rate).toBe(0.15);
  });

  test('should return GoldPlan if 2500 <= modBalance < 3000', () => {
    const plan = planFactory(2700);
    expect(plan).toBeInstanceOf(GoldPlan);
    expect(plan.name).toBe('Gold');
    expect(plan.rate).toBe(0.18);
  });

  test('should return DiamondPlan if modBalance >= 3000', () => {
    const plan = planFactory(3500);
    expect(plan).toBeInstanceOf(DiamondPlan);
    expect(plan.name).toBe('Diamond');
    expect(plan.rate).toBe(0.22);
  });
});
