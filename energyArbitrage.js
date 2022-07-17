const {Graph} = require('./classes/Graph');

/* In the energy markets, prices are determined 24 hours in advance in what's known as the Day-Ahead Market. The units for each price are $/MWh, where a MWh is 1 MW discharged constantly for 1 hour. Suppose you have a large battery that can charge and discharge at a rate of 1MW and can store 2 hours worth of energy (2MWh). To fill the battery, you'd need to charge for 2 hours at 1MW for the current price of  1 MWh, then you could discharge at a later time for 2 hours to recieve a higher price later in the day.




Write a function that takes in:
(i) an array of future prices
(ii) a duration of energy, in hours, that the battery can hold

and then returns the max profit you could make by arbitraging energy prices.
*/

function maxProfit(prices, duration) {
  let graph = new Graph(duration);
  prices.forEach(price => {
    graph.insert(price);
  })

  let max = -Infinity;
  const stack = [graph.root];
  while (stack.length) {
    let currentNode = stack.pop();
    let nextNodes = currentNode.getNext();
    if (currentNode.profit > max) max = currentNode.profit;

    nextNodes.forEach(node => {
      if (node) stack.push(node)
    })
  }
  return max;
}

module.exports = maxProfit;
