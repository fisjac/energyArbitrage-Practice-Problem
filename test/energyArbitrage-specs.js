const { expect } = require('chai');
const maxProfit = require('../energyArbitrage');


describe('maxProfit', () => {

  context('finds the node with the max profit', () => {
    const prices1 = [10, 20, 30, 40, 50, 50, 10, 20];
    const prices2 = [
      48.09, 44.83, 43.53, 40.86,
      61.50, 80.00, 115.00, 120.00,
      100.00, 70.00, 61.13, 80.24
    ];
    const pricesFlat = [50,50,50,50];

    it('can calculate for price arrays of different lengths', () => {
      expect(maxProfit(prices1)).to.not.throw;
      expect(maxProfit(prices2)).to.not.throw;
    })

    it('should find the correct profit amount for different durations', ()=> {
      expect(maxProfit(prices1)).to.equal(50);
      expect(maxProfit(prices1,2)).to.equal(80);
      expect(maxProfit(prices1,3)).to.equal(90);
    })

    it("should have profit of $0 if there's no volatility", ()=> {
      expect(maxProfit(pricesFlat)).to.equal(0)
    })
  })
})
