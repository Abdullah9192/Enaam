import React, { Suspense } from "react";

import offerhero from "../../Assets/offerhero.png";

import OfferCard from "../OfferCard/OfferCard";
const Offers = () => {
  return (
    <div className="container-fluid">
      <Suspense fallback={<div>Loading...</div>}>
      <div className="w-100">
        <img className="img-fluid" src={offerhero} alt="offerhero" />
      </div>
      </Suspense>
      <h1 className="text-center mt-4">Limited Time Offers</h1>
      <OfferCard />
    </div>
  );
};

export default Offers;
