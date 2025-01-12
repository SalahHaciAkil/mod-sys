
const dataStoreService = require('./dataStoreService');

function getAnalyticsReport() {
  const users = dataStoreService.loadUsers();

  let totalInterestPaid = 0;
  const planCounts = {
    bronze: 0,
    silver: 0,
    gold: 0,
    diamond: 0,
    none: 0, 
  };

  users.forEach(u => {
    totalInterestPaid += (u.interestPaid || 0);
    if (!u.plan) {
      planCounts.none += 1;
    } else {
      switch (u.plan.name.toLowerCase()) {
        case 'bronze':
          planCounts.bronze += 1;
          break;
        case 'silver':
          planCounts.silver += 1;
          break;
        case 'gold':
          planCounts.gold += 1;
          break;
        case 'diamond':
          planCounts.diamond += 1;
          break;
        default:
          planCounts.none += 1;
          break;
      }
    }
  });

  return {
    totalInterestPaid,
    planCounts,
    totalUsers: users.length,
  };
}

module.exports = {
  getAnalyticsReport
};
