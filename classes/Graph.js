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

  // your code here
}


class Graph {
  constructor(duration) {
    const rootNode = new GraphNode(0)
    this.root = rootNode;
    this.duration = duration
  }

  // Build insert method

    //  Traverse to every terminal node in the graph

    // If there's space in the battery add to charge path
      // Set newNodes energy to currentNode's energy + 1

    // If there's energy in the battery add to discharge path
      // Set newNodes energy to currentNode's energy + 1

    // Add new node to wait path
      // Set newNodes energy to currentNode's energy
}


module.exports = {GraphNode, Graph};
