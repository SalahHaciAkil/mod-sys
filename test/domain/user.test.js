// test/domain/user.test.js

const { User } = require('../../src/domain/user');
const FixedThresholdStrategy = require('../../src/domain/strategies/fixedThresholdStrategy');
const { createUserObject } = require('../../src/utils/user');

describe('User Class', () => {
  test('should create a user with default values', () => {
    const user = new User(createUserObject({ id: '123', name: 'Test', email: 'test@example.com' }));
    expect(user.id).toBe('123');
    expect(user.name).toBe('Test');
    expect(user.email).toBe('test@example.com');
    expect(user.mainBalance).toBe(0);
    expect(user.modBalance).toBe(0);
    expect(user.thresholdStrategy).toBeNull();
    expect(user.plan).toBeNull();
  });

  test('should create a user with specified balances and strategy', () => {
    const strategy = new FixedThresholdStrategy(2000);
    const user = new User(createUserObject({
      id: 'abc',
      name: 'Alice',
      email: 'alice@example.com',
      mainBalance: 5000,
      modBalance: 300,
      thresholdStrategy: strategy
    }));

    expect(user.id).toBe('abc');
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
    expect(user.mainBalance).toBe(5000);
    expect(user.modBalance).toBe(300);
    expect(user.thresholdStrategy).toBe(strategy);
  });

  test('should calculate surplus correctly using threshold strategy', () => {
    const strategy = new FixedThresholdStrategy(2000);
    const user = new User(createUserObject({
      id: 'abc',
      name: 'Alice',
      email: 'alice@example.com',
      mainBalance: 5000,
      thresholdStrategy: strategy
    }));

    // Surplus should be 3000 (5000 - 2000)
    const surplus = user.calculateSurplus();
    expect(surplus).toBe(3000);
  });

  test('investToMOD should move funds from main to modBalance', () => {
    const user = new User(createUserObject({ mainBalance: 2000, modBalance: 100 }));
    user.investToMOD(500);

    expect(user.mainBalance).toBe(1500);
    expect(user.modBalance).toBe(600);
  });

  test('withdrawFromMOD should move funds from modBalance to mainBalance', () => {
    const user = new User(createUserObject({ mainBalance: 500, modBalance: 1000 }));
    user.withdrawFromMOD(400);

    expect(user.mainBalance).toBe(900);
    expect(user.modBalance).toBe(600);
  });

  test('should not allow investing more than mainBalance', () => {
    const user = new User(createUserObject({ mainBalance: 200, modBalance: 0 }));
    expect(() => user.investToMOD(300)).toThrow('Insufficient main balance to invest');
  });
});
