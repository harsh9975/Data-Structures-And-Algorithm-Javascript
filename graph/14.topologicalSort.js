class Node {
  constructor(value) {
    this.value = value;
    this.edgeList = [];
  }

  connect(node) {
    this.edgeList.push(node);
  }

  getAdjacentList() {
    return this.edgeList.map((edge) => edge.value);
  }

  isConnected(node) {
    return !!this.edgeList.find((edge) => edge.value == node.value);
  }
}

class Graph {
  constructor(nodes) {
    this.nodes = [...nodes];
  }

  addToGraph(node) {
    this.nodes.push(node);
  }

  topologicalSort() {
    const visited = new Set();
    const topOrdering = [];
    for (const node of this.nodes) {
      this.depthFirstSearch(node, visited, topOrdering);
    }
    console.log(topOrdering.reverse());
  }

  depthFirstSearch(start, visited, topOrdering) {
    if (visited.has(start)) return;
    visited.add(start);
    for (const adjacency of start.edgeList) {
      this.depthFirstSearch(adjacency, visited, topOrdering);
    }
    topOrdering.push(start.value);
  }
}

const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");
const f = new Node("f");

const graph = new Graph([a, b, c, d, e, f]);

a.connect(b);
a.connect(c);
b.connect(d);
d.connect(f);
e.connect(c);
e.connect(f);
graph.topologicalSort();

//gfg practice
class Solution {
  //Function to return list containing vertices in Topological order.
  topoSort(V, adj) {
    // code here
    let vis = new Array(V).fill(false);
    let stack = [];
    for (let i = 0; i < V; i++) {
      if (!vis[i]) {
        this.dfs(i, stack, vis, adj);
      }
    }
    let ans = new Array(V);
    let j = 0;
    while (stack.length > 0) {
      ans[j++] = stack.pop();
    }
    return ans;
  }

  dfs(node, stack, vis, adj) {
    // Push node onto stack before exploring neighbors
    vis[node] = true;

    for (let _adj of adj[node]) {
      if (!vis[_adj]) {
        this.dfs(_adj, stack, vis, adj);
      }
    }
    stack.push(node);
  }
}
