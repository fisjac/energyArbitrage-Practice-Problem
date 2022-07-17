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


describe('Graph', () => {

  context('can add nodes properly', () => {
    it('has an insert method', () => {
      expect(Graph).to.respondTo('insert');
    })

    let graph1 = new Graph(1)
    let graph2 = new Graph(2)
    graph1.insert(1);
    graph1.insert(2);
    graph1.insert(3);

    graph2.insert(1);
    graph2.insert(2);
    graph2.insert(3);

    it('updates the energy state for the next node', ()=> {
      expect(graph1.root.charge.energy).to.equal(1);
      expect(graph1.root.wait.energy).to.equal(0);
      expect(graph1.root.charge.discharge.energy).to.equal(0);
    })

    it('adds nodes on the correct paths', () => {
      expect(graph1.root.charge).to.not.be.null;
      expect(graph1.root.discharge).to.be.null;
      expect(graph1.root.charge.discharge).to.not.be.null;
    })

    it('uses duration to inform the available paths', ()=> {
      expect(graph1.root.charge.charge).to.be.null;
      expect(graph2.root.charge.charge).to.not.be.null;
      expect(graph2.root.charge.charge.charge).to.be.null;
    })

    it('calculates and updates profit for the next node in the path', ()=> {
      expect(graph1.root.charge.profit).to.equal(-1);
      expect(graph1.root.charge.wait.profit).to.equal(-1);
      expect(graph1.root.charge.wait.discharge.profit).to.equal(2);
    })
  })
})
