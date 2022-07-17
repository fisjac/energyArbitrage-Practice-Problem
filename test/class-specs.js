const { expect } = require('chai');
const {GraphNode, Graph} = require('../classes/Graph');

describe('GraphNode', () => {
  it("Has a getNext method that return an array of the current node's paths", ()=> {
    let rootNode = new GraphNode();
    let chargeNode = new GraphNode();
    let waitNode = new GraphNode();
    let dischargeNode = new GraphNode();
    rootNode.charge = chargeNode;
    rootNode.wait = waitNode;
    rootNode.discharge = dischargeNode;
    expect(rootNode.getNext()).to.have.members([chargeNode,waitNode,dischargeNode])
  })
});


// this.price = price;
// this.energy = 0;
// this.profit = 0;

// // branches
// this.charge = null;
// this.wait = null;
// this.discharge = null;
// }


// getNext() {
// return [this.charge, this.wait, this.discharge];
