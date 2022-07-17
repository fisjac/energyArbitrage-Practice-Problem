const { expect } = require('chai');
const maxProfit = require('../energyArbitrage');

const prices1 = [20,40,20,40];
const prices2 = [
  48.09, 44.83, 43.53, 40.86,
  61.50, 80.00, 115.00, 120.00,
  100.00, 70.00, 61.13, 80.24
];
const pricesFlat = [50,50,50,50];

console.log(maxProfit(pricesFlat,2));
