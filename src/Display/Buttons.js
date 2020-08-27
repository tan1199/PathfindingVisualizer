import React from "react";
import "./Buttons.css";
function Buttons(props) {
  const assignAlgo = (algo) => {
    props.callback5(algo);
  };
  const ans = props.brick ? "Weight" : "Wall";
  return (
    <div className="disp">
      <h2 className="para">Select Algorithm :</h2>
      <select
        className="algos"
        onChange={(event) => assignAlgo(event.target.value)}
      >
        <option className="internal">Dijkstra Algorithm</option>
        <option className="internal">BFS Algorithm</option>
        <option className="internal">DFS Algorithm</option>
        <option className="internal">A &#9734; Algorithm</option>
      </select>
      <button className="ll" onClick={() => props.callback1()}>
        Visualize
      </button>
      <button className="ll" onClick={() => props.callback2()}>
        {ans}
      </button>
      <button className="lol" onClick={() => props.callback3()}>
        Clear Board
      </button>

      <button className="lol" onClick={() => props.callback4()}>
        {props.value}
      </button>
    </div>
  );
}

export default Buttons;
