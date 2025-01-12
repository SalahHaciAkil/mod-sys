class User {
  constructor({
    id,
    name,
    email,
    mainBalance,
    modBalance,
    thresholdStrategy,
    plan,
    portfolio,
    interestPaid,
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.mainBalance = mainBalance;
    this.modBalance = modBalance;
    this.thresholdStrategy = thresholdStrategy; // e.g. new FixedThresholdStrategy(2000)
    this.plan = plan; // e.g. new BronzePlan()
    this.portfolio = portfolio; // optional portfolio distribution
    this.interestPaid = interestPaid;
  }

  calculateSurplus() {
    if (!this.thresholdStrategy) return 0;
    return this.thresholdStrategy.getSurplus(this.mainBalance);
  }

  creditMainBalance(amount) {
    this.mainBalance += amount;
  }

  investToMOD(amount) {
    if (amount <= 0) return;
    if (this.mainBalance < amount) {
      throw new Error("Insufficient main balance to invest");
    }
    this.mainBalance -= amount;
    this.modBalance += amount;
  }

  withdrawFromMOD(amount) {
    if (amount <= 0) return;
    if (this.modBalance < amount) {
      throw new Error("Insufficient MOD balance to withdraw");
    }
    this.modBalance -= amount;
    this.mainBalance += amount;
  }

  setPortfolio(allocation) {
    this.portfolio = allocation;
  }

  addInterestPaid(amount) {
    this.interestPaid += amount;
  }
}

module.exports = {
  User,
};
