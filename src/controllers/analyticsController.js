const { getAnalyticsReport } = require('../services/analyticsService');

exports.getAnalytics = (req, res) => {
  try {
    const report = getAnalyticsReport();
    return res.status(200).json(report);
  } catch (error) {
    console.error('Error generating analytics report:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
