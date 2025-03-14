// HotDeals.js
import React from "react";
import dealImg from "../../Assets/hotdeal.png";
import CountdownTimer from "../CountdownTimer/CountdownTimer";

const HotDeals = () => {
  return (
    <div className="deals-bg text-center p-5 h-100 w-100 d-flex flex-column justify-content-between">
      <h2 className="deals-title">Hot Deals of The Day</h2>
      <div className="w-100 deals-img">
        <img src={dealImg} className="img-fluid" style={{ aspectRatio: 1.8 }} alt="" />
      </div>
      <CountdownTimer targetDate="2025-03-05T15:37:25" />
      <div className="mt-3">
        <button type="button" className="btn btn-primary btn-lg">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default HotDeals;
