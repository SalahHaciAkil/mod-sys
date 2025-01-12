// test/services/modService.test.js

const { rebalanceUser } = require("../../src/services/modService");
const { User } = require("../../src/domain/user");
const FixedThresholdStrategy = require("../../src/domain/strategies/fixedThresholdStrategy");
const planFactory = require("../../src/domain/planFactory");
const { createUserObject } = require("../../src/utils/user");

jest.mock("../../src/domain/planFactory");
// We'll mock planFactory if we want tight control over plan logic in these tests.
// Or we can leave it unmocked if we want a true integration test.

describe("rebalanceUser", () => {
  beforeEach(() => {
    // If we are mocking planFactory, we can define default behavior here:
    planFactory.mockImplementation((modBalance) => {
      if (modBalance >= 3000) {
        return { name: "Diamond", rate: 0.22 };
      } else if (modBalance >= 2500) {
        return { name: "Gold", rate: 0.18 };
      } else if (modBalance >= 2000) {
        return { name: "Silver", rate: 0.15 };
      } else if (modBalance >= 1000) {
        return { name: "Bronze", rate: 0.1 };
      }
      return null;
    });
  });

  test("should credit interest to mainBalance if user has a plan", () => {
    const user = new User(createUserObject({
      id: "123",
      name: "Salah",
      mainBalance: 5000,
      modBalance: 3000,
      plan: { name: "Diamond", rate: 0.22 },
      thresholdStrategy: new FixedThresholdStrategy(2000),
    }));

    const updatedUser = rebalanceUser(user);    
    // Interest = 3000 * 0.22 = 660
    expect(updatedUser.mainBalance).toBeCloseTo(2000, 2);
    expect(updatedUser.modBalance).toBeCloseTo(6660, 2);
  });

  test("should move surplus to modBalance if above threshold after interest credit", () => {
    const user = new User(createUserObject({
      name: "Bob",
      mainBalance: 2000,
      modBalance: 2000,
      plan: { name: "Silver", rate: 0.15 },
      thresholdStrategy: new FixedThresholdStrategy(1000),
    }));
    // 1) interest on 2000 => 2000 * 0.15 = 300 => mainBalance=2300
    // 2) surplus = 2300 - 1000 = 1300 => investToMOD => modBalance=3300
    const updatedUser = rebalanceUser(user);
    expect(updatedUser.mainBalance).toBe(1000);
    expect(updatedUser.modBalance).toBe(3300);
  });

  test("should do nothing if user.modBalance = 0 or no plan is set", () => {
    const user = new User(createUserObject({
      name: "Donna",
      mainBalance: 1000,
      modBalance: 0,
      plan: null,
      thresholdStrategy: new FixedThresholdStrategy(1000),
    }));
    const updatedUser = rebalanceUser(user);
    // No interest added, surplus=0 => no changes
    expect(updatedUser.mainBalance).toBe(1000);
    expect(updatedUser.modBalance).toBe(0);
    expect(updatedUser.plan).toBe(null);
  });
});
