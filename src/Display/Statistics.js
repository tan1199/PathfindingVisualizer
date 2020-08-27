import React from "react";
import "./Statistics.css";
function Statistics(props) {
  const text =
    props.text === "Dijkstra Algorithm"
      ? "Dijkstra's algorithm is commonly used for calculating shortest path."
      : props.text === "BFS Algorithm"
      ? "BFS algorithm will give shortest path only when weight of each node is zero."
      : props.text === "DFS Algorithm"
      ? "DFS Algorithm does not guarantee shortest path."
      : " A* is a faster and more efficient version of Dijkstra’s algorithm.";
  const time = props.time / 1000;
  const length = props.shortLength;

  return (
    <div className="info">
      <p className="insideinfo"> {text}</p>
      {length > 1 ? (
        <div>
          <p className="stats">
            Nodes Visited : {props.pathLength} , Nodes in Shortest Path :
            {props.shortLength} , Visualization Time : {time}s
          </p>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Statistics;
