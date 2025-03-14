import React, { Suspense } from "react";
import StepsData from "../../Assets/Data/StepsData.json";
import mbl from "../../Assets/Group 1597883840.png";

const HowItWorks = () => {
  return (
    <div className="container-fluid howbackground" style={{ overflowX: "hidden" }}>
      <div className="row p-md-5 py-5">
        <div className="col-md-7">
          {StepsData.steps && StepsData.steps.length > 0 ? (
            StepsData.steps.map((step) => (
              <div
                className="d-flex mb-4"
                key={step.step}
                style={{ height: "auto" }}
              >
                <div className="d-flex align-items-center">
                  <div className="point rounded-circle">
                    <span>Step</span>
                    <span>{step.step}</span>
                  </div>
                </div>
                <div className="text-white point-text">
                  <h1 className="ms-4 mb-0">{step.title}</h1>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No steps available.</p>
          )}
        </div>
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <Suspense fallback={<div>Loading...</div>}>
          <div className="howit-image mt-md-0 mt-2">
            <img src={mbl} className="img-fluid" alt="Illustration of how it works" />
          </div>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
