import React from "react";
import google from "../../Assets/google.svg"
const GoogleLink = () => {
  return (
      <a
        href={"https://play.google.com/store/apps/details?id=com.app.enaam"}
        target="_blank"
        className="appLinks d-flex align-items-center bg-light rounded-3 p-2"
        rel="noopener noreferrer"
      >
        <div className='p-md-2 p-1' style={{ flex: "0 0 25%" }}>
            <img className="img-fluid" src={google} alt="" />
        </div>
        <div className="downloadApp" style={{ flex: "0 0 75%" }}>
          <span>Download From</span>
          <h4 className="m-0">Google Play</h4>
        </div>
      </a>
  );
};

export default GoogleLink;
