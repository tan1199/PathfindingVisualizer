export function bfs(grid, startNode, finishNode, diagonal) {
  getAllNodes(grid);
  const visitedNodes = [];
  const unvisitedNodes = [];
  startNode.distance = 0;
  unvisitedNodes.push(startNode);
  while (!!unvisitedNodes.length) {
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) {
      continue;
    } else {
      if (closestNode.distance === Infinity) return visitedNodes;
      closestNode.isVisited = true;
      visitedNodes.push(closestNode);
      if (closestNode === finishNode) return visitedNodes;
      updateUnvisitedNeighbors(closestNode, grid, unvisitedNodes, diagonal);
    }
  }
}

function updateUnvisitedNeighbors(node, grid, unvisitedNodes, diagonal) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid, diagonal);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.parent = node;
    if (neighbor.isVisited === false) {
      unvisitedNodes.push(neighbor);
      neighbor.isVisited = true;
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
  for (const row of grid) {
    for (const node of row) {
      node.isVisited = false;
      node.parent = null;
      node.distance = Infinity;
      node.weight = 0;
    }
  }
}

export function nodesInShortestPathbfs(finishNode) {
  var curr = finishNode;
  var shortestPathNodes = [];
  while (curr.parent) {
    shortestPathNodes.push(curr);
    curr = curr.parent;
  }
  shortestPathNodes.push(curr);
  return shortestPathNodes.reverse();
}
