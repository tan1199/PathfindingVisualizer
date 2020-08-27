export function dijkstra(grid, startNode, finishNode, diagonal) {
  const visitedNodes = [];
  const unvisitedNodes = getAllNodes(grid);
  startNode.distance = 0;
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) {
      continue;
    } else {
      if (closestNode.distance === Infinity) return visitedNodes;
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
      if (closestNode === finishNode) return visitedNodes;
      updateUnvisitedNeighbors(closestNode, grid, diagonal);
    }
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid, diagonal) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid, diagonal);
  for (const neighbor of unvisitedNeighbors) {
    let x = node.distance + 1 + neighbor.weight;
    if (neighbor.distance > x) {
      neighbor.distance = x;
      neighbor.parent = node;
    }
  }
}

function getUnvisitedNeighbors(node, grid, diagonal) {
  const neighbors = [];
  const { col, row } = node;
  if (diagonal) {
    if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]);
    if (row < grid.length - 1 && col < grid[0].length - 1)
      neighbors.push(grid[row + 1][col + 1]);
    if (col > 0 && row < grid.length - 1)
      neighbors.push(grid[row + 1][col - 1]);
    if (row > 0 && col < grid[0].length - 1)
      neighbors.push(grid[row - 1][col + 1]);
  }
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      node.isVisited = false;
      node.parent = null;
      node.distance = Infinity;
      nodes.push(node);
    }
  }
  return nodes;
}

export function nodesInShortestPath(finishNode) {
  var curr = finishNode;
  var shortestPathNodes = [];
  while (curr.parent) {
    shortestPathNodes.push(curr);
    curr = curr.parent;
  }
  shortestPathNodes.push(curr);
  return shortestPathNodes.reverse();
}
