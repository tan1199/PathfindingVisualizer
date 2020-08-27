import React, { Component } from "react";
import Node from "./Node/Node";
import Buttons from ".././Display/Buttons";
import Home from ".././Display/Home";
import Info from ".././Display/Info";
import Statistics from ".././Display/Statistics";
import { dijkstra, nodesInShortestPath } from "../Algorithms/dijkstra";
import { bfs, nodesInShortestPathbfs } from "../Algorithms/bfs";
import { dfs, nodesInShortestPathdfs } from "../Algorithms/dfs";
import { Astar, nodesInShortestPathastar } from "../Algorithms/Astar";
import "./PathfindingVisualizer.css";
var startRow = 2;
var startCol = 2;
var endRow = 17;
var endCol = 37;
var startTime = 0;
var endTime = 0;
var delta = 0;
export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: initialGrid(),
      isMousePressed: false,
      path: [],
      short: [],
      canChange: true,
      wall: true,
      addWeight: true,
      addWall: true,
      prevWeight: false,
      initialWallState: true,
      finalPos: false,
      endPoint: false,
      last: false,
      immutable: false,
      callRemoveAnimation: false,
      homeProp: "Instructions",
      selectedAlgo: "Dijkstra Algorithm",
      endpointmove: true,
      diagonalMovement: false,
      visualizationTime: 0,
    };
  }
  mouseDownHandler(row, col) {
    if (this.state.immutable) {
      return;
    }
    this.setState({ isMousePressed: false });

    startTime = new Date();
    if (delta > 0.25) {
      const newGrid = this.toggleGrid(
        this.state.grid,
        row,
        col,
        true,
        this.state.canChange,
        this.state.path
      );
      this.setState({ grid: newGrid });
    } else {
      const newGrid = this.toggleGrid(
        this.state.grid,
        row,
        col,
        false,
        this.state.canChange,
        this.state.path
      );
      this.setState({ grid: newGrid });
    }
  }

  mouseEnterHandler(row, col) {
    if (this.state.immutable) {
      return;
    }

    if (delta < 0.25) {
      this.setState({ endPoint: false });
      this.setState({ endpointmove: true });
      this.setState({ last: false });
      this.setState({ prevWeight: false });
      return;
    }

    this.setState({ isMousePressed: true });

    const newGrid = this.toggleGrid(
      this.state.grid,
      row,
      col,
      true,
      this.state.canChange,
      this.state.path
    );
    this.setState({ grid: newGrid });
  }

  mouseUpHandler() {
    if (this.state.immutable) {
      return;
    }
    endTime = new Date();

    delta = (endTime - startTime) / 1000.0;
    if (delta < 0.25) {
      this.setState({ endPoint: false });
      this.setState({ endpointmove: true });
      this.setState({ last: false });
      this.setState({ prevWeight: false });
    }
    let newGrid = this.state.grid.slice();
    let node = newGrid[endRow][endCol];
    let newNode = {
      ...node,
      isWall: false,
      weight: 0,
    };
    newGrid[endRow][endCol] = newNode;
    node = newGrid[startRow][startCol];
    newNode = {
      ...node,
      isWall: false,
      weight: 0,
    };
    newGrid[startRow][startCol] = newNode;
    this.setState({ grid: newGrid });
  }
  RemoveAnimation() {
    const { grid } = this.state;
    for (let i = 0; i < this.state.path.length; i++) {
      const node = this.state.path[i];
      const n = grid[node.row][node.col];

      if (!n.isWall && !n.isEnd && !n.isStart) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
      }
    }
  }

  addAnimationToAlgorithm(visitedNodes, shortestPathNodes) {
    this.setState({
      canChange: false,
    });

    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          this.addAnimationToShortestPath(shortestPathNodes);
        }, 10 * i);
      } else {
        const node = visitedNodes[i];

        if (
          !(
            (node.col === endCol && node.row === endRow) ||
            (node.col === startCol && node.row === startRow)
          )
        ) {
          setTimeout(() => {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              "node node-visited";
          }, 10 * i);
        }
      }
    }
  }

  addAnimationToShortestPath(shortestPathNodes) {
    this.setState({
      canChange: false,
    });

    for (let i = 0; i < shortestPathNodes.length; i++) {
      const node = shortestPathNodes[i];

      if (
        !(
          (node.col === endCol && node.row === endRow) ||
          (node.col === startCol && node.row === startRow)
        )
      ) {
        setTimeout(() => {
          this.setState({
            canChange: false,
          });
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortestpath";
        }, 70 * i);
      }
    }
  }
  noChange() {
    const isMutable = !this.state.immutable;
    if (isMutable) {
      document.getElementById(`show`).className = "  hide";
      this.setState({ homeProp: "Close" });
    } else {
      document.getElementById(`show`).className = "  reveal";
      this.setState({ homeProp: "Instructions" });
    }
    this.setState({ immutable: isMutable });
  }
  changediagonal() {
    const diagonal = !this.state.diagonalMovement;
    this.setState({ diagonalMovement: diagonal });
  }
  removeMouseDown() {
    delta = 0;
  }
  clearpath() {
    const { canChange } = this.state;
    if (!canChange) {
      return;
    }

    const defaultGrid = initialGrid();

    if (this.state.path.length) {
      this.RemoveAnimation();
    }
    this.setState({ grid: defaultGrid });
    this.setState({ short: [] });
    this.setState({ path: [] });
  }
  toggleGrid(grid, row, col, mousePressed, change, pat) {
    var newGrid = grid.slice();
    var node = newGrid[row][col];
    var currWeight = 0;

    if (!change) {
      return newGrid;
    }
    if (this.state.endpointmove && this.state.endPoint) {
      if (this.state.path.length) {
        this.RemoveAnimation();
        this.setState({ short: [] });
        this.setState({ path: [] });
      }
      if (this.state.last) {
        const newNode = {
          ...node,
          isEnd: !node.isEnd,
          isVisited: true,
        };
        newGrid[row][col] = newNode;
        const nodePrev = newGrid[endRow][endCol];
        const newnodePrev = {
          ...nodePrev,
          isEnd: !nodePrev.isEnd,
        };
        newGrid[endRow][endCol] = newnodePrev;
        endRow = row;
        endCol = col;
        return newGrid;
      } else {
        const newNode = {
          ...node,
          isStart: !node.isStart,
        };
        newGrid[row][col] = newNode;
        const nodePrev = newGrid[startRow][startCol];
        const newnodePrev = {
          ...nodePrev,
          isStart: !nodePrev.isStart,
        };
        newGrid[startRow][startCol] = newnodePrev;
        startRow = row;
        startCol = col;
        return newGrid;
      }
    } else {
      if (node.col === startCol && node.row === startRow) {
        this.setState({ endPoint: true });
        return newGrid;
      }

      if (node.col === endCol && node.row === endRow) {
        this.setState({ endPoint: true });
        this.setState({ last: true });
        return newGrid;
      } else {
        this.setState({ endpointmove: false });

        if (this.state.path.length) {
          this.RemoveAnimation();
          this.setState({ short: [] });
          this.setState({ path: [] });
        }

        if (!mousePressed) {
          if (this.state.wall) {
            const newNode = {
              ...node,
              isWall: !node.isWall,
              weight: 0,
            };
            newGrid[row][col] = newNode;

            this.setState({ initialWallState: newNode.isWall });

            return newGrid;
          } else {
            currWeight = node.weight;

            if (currWeight) {
              currWeight = 0;
              this.setState({ prevWeight: false });
            } else {
              currWeight = Math.floor(Math.random() * 10) + 5;
              this.setState({ prevWeight: true });
            }
            const newNode = {
              ...node,
              weight: currWeight,
              isWall: false,
            };
            newGrid[row][col] = newNode;

            return newGrid;
          }
        } else {
          if (this.state.wall) {
            const newNode = {
              ...node,
              isWall: this.state.initialWallState,
              weight: 0,
            };
            newGrid[row][col] = newNode;
            return newGrid;
          } else {
            currWeight = 0;
            if (this.state.prevWeight) {
              currWeight = Math.floor(Math.random() * 10) + 5;
            }
            const newNode = {
              ...node,
              weight: currWeight,
              isWall: false,
            };
            newGrid[row][col] = newNode;
            return newGrid;
          }
        }
      }
    }
  }

  visualizeAlgorithm() {
    const { canChange, immutable, removeAnimation } = this.state;

    if (!canChange || immutable) {
      return;
    }

    if (removeAnimation) {
      this.RemoveAnimation();
    }
    const { grid } = this.state;
    const { diagonalMovement } = this.state;

    let dv, ds, time;
    const startNode = grid[startRow][startCol];
    const finishNode = grid[endRow][endCol];
    var visitedNodes = {};
    var shortestPathNodes = {};
    if (this.state.selectedAlgo === "Dijkstra Algorithm") {
      visitedNodes = dijkstra(grid, startNode, finishNode, diagonalMovement);
      shortestPathNodes = nodesInShortestPath(finishNode);
    } else if (this.state.selectedAlgo === "BFS Algorithm") {
      visitedNodes = bfs(grid, startNode, finishNode, diagonalMovement);
      shortestPathNodes = nodesInShortestPathbfs(finishNode);
    } else if (this.state.selectedAlgo === "DFS Algorithm") {
      visitedNodes = dfs(grid, startNode, finishNode, diagonalMovement);
      shortestPathNodes = nodesInShortestPathdfs(finishNode);
    } else {
      visitedNodes = Astar(grid, startNode, finishNode, diagonalMovement);
      shortestPathNodes = nodesInShortestPathastar(finishNode);
    }

    if (grid[endRow][endCol].isVisited) {
      dv = visitedNodes.length;
      ds = shortestPathNodes.length;
      time = (dv + 1) * 10 + ds * 70 + 250;
      this.setState({ visualizationTime: time });

      this.setState({ path: visitedNodes });
      this.setState({ short: shortestPathNodes });

      this.addAnimationToAlgorithm(visitedNodes, shortestPathNodes);
      setTimeout(() => {
        this.setState({
          canChange: true,
        });
      }, time);

      this.setState({ removeAnimation: true });
    } else {
      alert("NO PATH EXISTS");
    }
  }
  changeWeight() {
    const ans = !this.state.wall;

    this.setState({ wall: ans });
  }
  chooseAlg(inputAlgo) {
    this.setState({ selectedAlgo: inputAlgo });
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <Home text={this.state.homeProp} callback7={() => this.noChange()} />
        <Buttons
          callback1={() => this.visualizeAlgorithm()}
          callback2={() => this.changeWeight()}
          callback3={() => this.clearpath()}
          callback4={() => this.changediagonal()}
          callback5={(oo) => this.chooseAlg(oo)}
          brick={this.state.wall}
          value={
            this.state.diagonalMovement === true
              ? "Restrict Diagonal Movement"
              : "Allow Diagonal Movement"
          }
        />
        <Statistics
          text={this.state.selectedAlgo}
          pathLength={this.state.path.length}
          shortLength={this.state.short.length}
          time={this.state.visualizationTime}
        />

        <div className="grid" onMouseLeave={() => this.removeMouseDown()}>
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="row">
                {row.map((node, nodeIndex) => {
                  const { row, col, isEnd, isStart, isWall, weight } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      col={col}
                      isEnd={isEnd}
                      isStart={isStart}
                      isWall={isWall}
                      weight={weight}
                      onMouseDown={(row, col) =>
                        this.mouseDownHandler(row, col)
                      }
                      onMouseEnter={(row, col) =>
                        this.mouseEnterHandler(row, col)
                      }
                      onMouseUp={() => this.mouseUpHandler()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Info />
      </>
    );
  }
}
const initialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 40; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === startRow && col === startCol,
    isEnd: row === endRow && col === endCol,
    weight: 0,
    distance: Infinity,
    f: 0,
    g: 0,
    h: 0,
    isVisited: false,
    isWall: false,
    parent: null,
    closed: false,
  };
};
