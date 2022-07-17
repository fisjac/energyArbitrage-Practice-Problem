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


class Graph {
  constructor(duration) {
    const rootNode = new GraphNode(0)
    this.root = rootNode;
    this.duration = duration
  }

  // Build insert method
  insert(price) {

    // Traverse to every terminal node in the graph
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

        };

        // if there's energy in the battery add to discharge path
        if (currentNode.energy > 0) {
          const newNode = new GraphNode(price);
          currentNode.discharge = newNode;
          // Set newNodes energy to currentNode's energy + 1
          currentNode.discharge.energy = currentNode.energy - 1;
          currentNode.discharge.profit = currentNode.profit + price;

        };

        // add new node to wait path
        const newNode = new GraphNode(price);
        currentNode.wait = newNode;
        // maintain energy level
        currentNode.wait.energy = currentNode.energy;
        currentNode.wait.profit = currentNode.profit;

      } else {
        [chargeNode, waitNode, dischargeNode].forEach(nextNode => {
          if (nextNode) stack.push(nextNode);
        })

      }
    }
  }
}



module.exports = { GraphNode, Graph };
