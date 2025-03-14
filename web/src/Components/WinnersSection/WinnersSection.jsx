import React from "react";
import compWinners from "../../Assets/comp.svg";
import hangWinners from "../../Assets/hang.svg";
const WinnersSection = () => {
  return (
    <div className="container-fluid px-md-5 my-md-5 my-3">
      <div className="row ">
        <div className="col-6">
          <div className="winner-slide aspect-ratio-container">
            <img
              src={compWinners}
              alt="Competition Winner"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="winner-slide aspect-ratio-container ">
            <img src={hangWinners} alt="Hangout Winner" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WinnersSection;
