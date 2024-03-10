import React from "react";
import Sidebar from "../components/Sidebar";
import "./Contributer.css";
const Contributer = () => {
  return (
    <>
      <Sidebar />
      <div className="contributer-wrapper">
        <div className="contributer-detail">
          <div className="contributer-image">
            <img src="./assets/images/bitcoin.png" alt="" />
          </div>
          <div className="contributer-desc">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorem
              enim quia illum ea exercitationem, ducimus tempore ab accusamus
              rerum architecto maxime deserunt, labore nostrum iste eum aliquam
              voluptatibus atque qui! Repellendus expedita natus non odio itaque
              nam ipsum labore libero sunt quasi necessitatibus accusamus iste
              delectus, sint minima, dolore beatae, vel eos quod fuga? Iusto
              consequatur nesciunt consectetur perferendis sed ad earum maxime,
              voluptatem praesentium, officia voluptate. Dolores fugit aut
              aliquid odit cumque aperiam? Laborum ratione dolore, quia iusto
              nesciunt pariatur, nulla sit ducimus ipsa adipisci ad excepturi,
              suscipit ipsum eligendi. Sint velit tempore fugiat optio ipsa
              minus voluptate eum.
            </p>
          </div>
        </div>
        <div className="student-assignment">
          <h1>Assignment</h1>
        </div>
      </div>
    </>
  );
};

export default Contributer;
