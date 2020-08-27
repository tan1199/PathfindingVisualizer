import React from "react";
import "./Home.css";
function Home(props) {
  return (
    <>
      <div className="home">
        <h1 className="headingHome">Pathfinding Visualizer</h1>
        <h3 className="help" onClick={() => props.callback7()}>
          {props.text}
        </h3>
      </div>
      <div className="reveal" id="show">
        <p className="heading">Instructions</p>
        <p className="leftAlign">
          Select an Algorithm to visualize from the dropdown menu.
        </p>
        <p className="leftAlign">
          To add wall or weight by click the corresponding Button.
        </p>
        <p className="leftAlign">To add wall/weight to a cell single click.</p>
        <p className="leftAlign">
          To add multiple wall/weight simaltaneously :-
        </p>
        <p className="leftAlign">
          I. Click on a empty cell and hold for a sec, then move over the cells
          to add wall/weight.
        </p>
        <p className="leftAlign">
          II. When done click on a cell or move out of the grid to stop adding
          wall/weight
        </p>
        <p className="leftAlign">
          To clear the wall/weight repeat the above steps on node having
          wall/weight.
        </p>
        <p className="leftAlign">
          To clear the board click Clear Board Button.
        </p>
        <p className="leftAlign">Control diagonal movement through checkbox.</p>
      </div>
    </>
  );
}

export default Home;
