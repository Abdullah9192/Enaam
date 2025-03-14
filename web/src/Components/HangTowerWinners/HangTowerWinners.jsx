import React from "react";
import winners from "../../Assets/Data/LuckyDrawWinnersData";
import hangWinnerFrame from "../../Assets/HangWinnersFrame.png";
const HangTowerWinners = () => {
  return (
    <div className="container-fluid">
      <h1 className="Recent-title text-center">Hang Tower Winners</h1>
      <div className="row px-5">
        {winners.map((winner) => (
          <div key={winner.id} className="col-md-3 my-4">
            <div className="recent-winner text-center">
              <img
                src={winner.imgSource}
                className="img-fluid winnerImg"
                alt=""
              />
              <div className="winner-frame">
                <img src={hangWinnerFrame} className="img-fluid" alt="" />
              </div>
              <div className="winner-detail mt-2">
                <p>{winner.name}</p>
                <span>{winner.prize}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HangTowerWinners;
