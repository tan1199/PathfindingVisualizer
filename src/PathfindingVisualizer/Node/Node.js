import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      col,
      isEnd,
      isStart,
      isWall,
      weight,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    const newlassName = isEnd
      ? "node-end"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";
    const symbol = weight > 0 ? "dot" : "";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${newlassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      >
        <span className={`circle ${symbol}`}></span>
      </div>
    );
  }
}
