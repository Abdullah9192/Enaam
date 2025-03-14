import React from "react";
import PrizesHeroSlider from "./PrizesHeroSlider";
import HotDeals from "./HotDeals";
import "./PrizesHeroSlider.css";
const PrizesHero = () => {
  return (
    <div className="container-fluid">
      <div className="row d-flex align-items-stretch">
        <div className="col-md-8 mb-md-0 mb-3 d-flex ">
          <PrizesHeroSlider />
        </div>
        <div className="col-md-4 d-flex ">
          <HotDeals />
        </div>
      </div>
    </div>
  );
};

export default PrizesHero;
