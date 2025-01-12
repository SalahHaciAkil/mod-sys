createUserObject = ({
  id,
  name,
  email,
  mainBalance = 0,
  modBalance = 0,
  thresholdStrategy = null,
  plan = null,
  portfolio = {},
  interestPaid = 0,
}) => {
  return {
    id,
    name,
    email,
    mainBalance,
    modBalance,
    thresholdStrategy,
    plan,
    portfolio,
    interestPaid,
  };
};

module.exports = { createUserObject };
