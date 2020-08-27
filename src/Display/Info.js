import React from "react";
import "./Info.css";
function Info() {
  return (
    <div className="information">
      <div>
        <div className="nodeinfo">Start Node</div>
        <div className="startbox"> </div>
      </div>
      <div>
        <div className="nodeinfo">End Node</div>
        <div className="endbox"></div>
      </div>
      <div>
        <div className="nodeinfo">Wall</div>
        <div className="wallbox"></div>
      </div>
      <div>
        <div className="nodeinfo">Weight</div>
        <div className="weightbox"></div>
      </div>
      <div>
        <div className="nodeinfo">Visited Node</div>
        <div className="visitedbox"> </div>
      </div>
      <div>
        <div className="nodeinfo">ShortestPath</div>
        <div className="shortestbox"></div>
      </div>
    </div>
  );
}

export default Info;
