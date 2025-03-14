import React from 'react'
import apple from "../../Assets/apple.svg"
const AppleStoreLink = () => {
  return (
    <a
    href={"https://apps.apple.com/pk/app/enaam/id6450613357"}
    target="_blank"
    className="appLinks d-flex align-items-center bg-light rounded-3 p-2"
    rel="noopener noreferrer"
  >
    <div className='p-md-2 p-1' style={{ flex: "0 0 25%" }}>
        <img className='img-fluid' src={apple} alt="" />
    </div>
    <div className='downloadApp' style={{ flex: "0 0 75%" }}>
      <span>Download From</span>
      <h4 className="m-0">App Store</h4>
    </div>
  </a>
  )
}

export default AppleStoreLink
