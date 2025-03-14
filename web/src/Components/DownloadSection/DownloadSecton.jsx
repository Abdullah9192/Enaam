import React from "react";
import mbls from "../../Assets/mbls.png";
import GoogleLink from "../GoogleLink/GoogleLink";
import AppleStoreLink from "../AppleStoreLink/AppleStoreLink";

const DownloadSecton = () => {
  return (
    <div className="download-section container-md container-fluid text-white mb-5">
      <div className="row align-items-center bg-downloadapp px-2">
        {/* Text Section */}
        <div className="col-md-6 col-12 text-center text-md-start py-4">
          <h1 className="download-title">Download the App</h1>
          <p className="download-subtitle">New features. New appearance.</p>
          <div className="d-flex justify-content-center justify-content-md-start gap-2 text-start p-0">
            <GoogleLink />
            <AppleStoreLink />
          </div>
        </div>
        {/* Image Section */}
        <div className="col-md-6 d-none d-md-flex justify-content-center">
          <div className="download-image">
          <img src={mbls} alt="Mobile Devices" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSecton;
