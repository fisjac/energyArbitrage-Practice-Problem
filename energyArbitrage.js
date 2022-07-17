/* In the energy markets, prices are determined 24 hours in advance in what's known as the Day-Ahead Market. The units for each price are $/MWh, where a MWh is 1 MW discharged constantly for 1 hour. Suppose you have a large battery that can charge and discharge at a rate of 1MW and can store 2 hours worth of energy (2MWh). To fill the battery, you'd need to charge for 2hours at 1MW for the current price of  1 MWh, then you could discharge at a later time for 2 hours to recieve a higher price later in the day.


Write a function that takes in:
(i) an array of future prices
(ii) a duration of energy, in hours, that the battery can hold

and then returns the optimal schedule of charge and discharge
*/


class GraphNode {
  constructor(price) {

    // stored values
    this.price = price;
    this.energy = 0;
    this.profit = 0;

    // branches
    this.charge = null;
    this.wait = null;
    this.discharge = null;
  }


  getNext() {
    return [this.charge, this.wait, this.discharge];
  }


}

// start by building a trinary graph
class Graph {
  constructor(duration) {
    this.root = null;
    this.duration = duration
  }

  insert(price) {
    console.log(`Inserting ${price}
    ---------------------------`);
    if (!this.root) {
      const rootNode = new GraphNode(price);
      this.root = rootNode;
    }
    // if there is a root, traverse to every terminal node in the graph
    else {
      let stack = [this.root];
      while (stack.length) {
        let currentNode = stack.pop();
        let [chargeNode, waitNode, dischargeNode] = currentNode.getNext();
        if (!(chargeNode || waitNode || dischargeNode)) {

          // if there's space in the battery add to charge path
          if (currentNode.energy < this.duration) {
            const newNode = new GraphNode(price);
            currentNode.charge = newNode;
            // Set newNodes energy to currentNode's energy + 1
            currentNode.charge.energy = currentNode.energy + 1;
            currentNode.charge.profit = currentNode.profit - price;
            // console.log(`added to charge path. Energy is now at ${currentNode.charge.energy}`);
          };

          // if there's energy in the battery add to discharge path
          if (currentNode.energy > 0) {
            const newNode = new GraphNode(price);
            currentNode.discharge = newNode;
            // Set newNodes energy to currentNode's energy + 1
            currentNode.discharge.energy = currentNode.energy - 1;
            currentNode.discharge.profit = currentNode.profit + price;
            // console.log(`added to discharge path. Energy is now at ${currentNode.discharge.energy}`);
          };

          // add new node to wait path
          const newNode = new GraphNode(price);
          currentNode.wait = newNode;
          // maintain energy level
          currentNode.wait.energy = currentNode.energy;
          currentNode.wait.profit = currentNode.profit;
          // console.log(`added to wait path. Energy is now at ${currentNode.wait.energy}`);
        } else {
          [chargeNode, waitNode, dischargeNode].forEach(nextNode => {
            if (nextNode) stack.push(nextNode);
          })

        }
      }
    }
  }
}

function findSchedule(prices, duration) {
  let graph = new Graph(duration);
  graph.insert(0);
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

const prices1 = [
  48.09, 44.83, 43.53, 40.86,
  61.50, 80.00, 115.00, 120.00,
  100.00, 70.00, 61.13, 80.24
]
console.log(findSchedule(prices1, 4))

const prices2 = [
  20,20,40,80
]
console.log(findSchedule(prices2, 2))
