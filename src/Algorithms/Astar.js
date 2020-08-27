import Heap from "heap-js";
export function Astar(grid, startNode, finishNode, diagonal) {
  getAllNodes(grid);
  const visitedNodes = [];
  var openHeap = new Heap(function (nodeA, nodeB) {
    if (nodeA.f !== nodeB.f) {
      return nodeA.f - nodeB.f;
    }
    return nodeB.g - nodeA.g;
  });
  startNode.distance = 0;
  openHeap.push(startNode);

  while (openHeap.size() > 0) {
    var closestNode = openHeap.pop();
    visitedNodes.push(closestNode);
    closestNode.closed = true;
    if (closestNode === finishNode) return visitedNodes;
    var currNeighbors = getUnvisitedNeighbors(closestNode, grid, diagonal);
    for (var i = 0; i < currNeighbors.length; i++) {
      var neighbour = currNeighbors[i];
      var previousNode = neighbour;
      if (neighbour.closed || neighbour.isWall) {
        continue;
      } else {
        var gScore = closestNode.g + 1 + neighbour.weight;
        var beenVisited = neighbour.isVisited;
        if (!beenVisited || gScore < neighbour.g) {
          neighbour.isVisited = true;
          neighbour.parent = closestNode;
          neighbour.h = neighbour.h || manhattan(neighbour, finishNode);
          neighbour.g = gScore;
          neighbour.f = neighbour.g + neighbour.h;
          if (!beenVisited) {
            openHeap.push(neighbour);
          } else {
            openHeap.remove(previousNode);
            openHeap.push(neighbour);
          }
        }
      }
    }
  }
}

function manhattan(pos0, pos1) {
  var d1 = Math.abs(pos1.row - pos0.row);
  var d2 = Math.abs(pos1.col - pos0.col);
  return d1 + d2;
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
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors;
}

function getAllNodes(grid) {
  for (const row of grid) {
    for (const node of row) {
      node.isVisited = false;
      node.parent = null;
      node.distance = Infinity;
      node.f = 0;
      node.g = 0;
      node.h = 0;
      node.closed = false;
    }
  }
}

export function nodesInShortestPathastar(finishNode) {
  var curr = finishNode;
  var shortestPathNodes = [];
  while (curr.parent) {
    shortestPathNodes.push(curr);
    curr = curr.parent;
  }
  shortestPathNodes.push(curr);
  return shortestPathNodes.reverse();
}
