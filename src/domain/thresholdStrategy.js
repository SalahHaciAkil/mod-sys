
class ThresholdStrategy {
    getSurplus(mainBalance) {
      throw new Error('Must implement getSurplus in subclass');
    }
  }
  
  module.exports = ThresholdStrategy;
  