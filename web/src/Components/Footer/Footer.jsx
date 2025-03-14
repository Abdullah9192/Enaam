import React from "react";
import logo from "../../Assets/enaam 4.png";

import jazzcash from "../../Assets/jazcash.svg";
import easypaisa from "../../Assets/easypaisa.svg";
import GoogleLink from "../GoogleLink/GoogleLink";
import AppleStoreLink from "../AppleStoreLink/AppleStoreLink";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer-background p-4 text-white mt-5">
      <div className="row py-md-5">
        <div className="col-md-3 mb-4">
          <img
            src={logo}
            className="footer-logo"
            alt="Logo"
            height="115"
            width="230"
          />
        </div>
        <div className="col-md-6">
          <div className="row ms-3">
            <div className="col-md-4 col-6">
              <h5 className="footer-links">Website as</h5>
              <div className="footer-link-list">
                <a href="/">Home</a>
                <a href="/about-us">About</a>
                <a href="/hang-tower-winners">Winners</a>
                <a href="/prizes">Prizes</a>
                <a href="/#" className="mblas">
                  Blogs
                </a>
                <a href="/#" className="mblas">
                  Privacy Policy
                </a>
              </div>
            </div>
            <div className="col-md-4 col-6">
              <h5 className="footer-links">More as</h5>
              <div className="footer-link-list">
                <a href="/contact-us">Contact Us</a>
                <a href="/#">FAQs</a>
                <a href="/#">Offers</a>
                <a href="/">Reviews</a>
                <a href="/#" className="mblas">
                  How It Works
                </a>
                <a href="/#" className="mblas">
                  Terms & Conditions
                </a>
              </div>
            </div>
            <div className="col-4 lapcol">
              <h5 className="footer-links">Legal</h5>
              <div className="footer-link-list">
                <a href="/#">Blogs</a>
                <a href="/#">How It Works</a>
                <a href="/#">Privacy Policy</a>
                <a href="/#">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <h5 className="footer-title mb-3 mt-md-0 mt-3 text-md-center">
            Download the App
          </h5>
          <div className="d-flex flex-row flex-md-column align-items-end justify-content-start gap-2">
            <GoogleLink />
            <AppleStoreLink />
          </div>
        </div>
      </div>
      <hr className="border-white opacity-75 mt-5 mb-4" />
      <div className="row align-items-center">
        <div className="col-md-4 mb-3 mb-md-0 d-flex gap-3 justify-content-md-start justify-content-center">
          {/* <img src={facebook} alt="Facebook" className="" /> */}
          {/* <img src={youtube} alt="YouTube" className="" />
          <img src={tiktok} alt="TikTok" className="" />
          <img src={insta} alt="Instagram" className="" /> */}
          <div className="main-social-footer-29 d-flex justify-content-center align-items-center justify-content-lg-start">
            <a
              href="https://www.facebook.com/profile.php?id=100091683138802&mibextid=ZbWKwL"
              target="_blank"
               rel="noreferrer"
              className="facebook "
              style={{ fontSize: "1.5rem" }}
            >
             <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/enaampkofficial"
              className="twitter "
              target="_blank"
               rel="noreferrer"
              style={{ fontSize: "1.5rem" }}
            >
              <FaXTwitter/>
            </a>
            <a
              href="https://www.tiktok.com/@enaampk"
              className="tiktok "
              target="_blank"
               rel="noreferrer"
              style={{ fontSize: "1.5rem" }}
            >
             <FaTiktok/>
            </a>
            <a
              href="https://instagram.com/enaampk.official?igshid=MzRlODBiNWFlZA=="
              target="_blank"
               rel="noreferrer"
              className="instagram "
              style={{ fontSize: "1.5rem" }}
            >
              <FaInstagram/>
            </a>
            <a
              href="https://www.youtube.com/@enaampk"
              className="youtube "
              target="_blank"
               rel="noreferrer"
              style={{ fontSize: "1.5rem" }}
            >
              <FaYoutube/>
            </a>
            <a
              href="https://wa.me/+923211118392"
              className="whatsapp"
              target="_blank"
               rel="noreferrer"
              style={{ fontSize: "1.5rem" }}
            >
              <FaWhatsapp/>
            </a>
          </div>
        </div>
        <div className="col-md-5 text-center">
          <p className="mb-0">
            All Rights Reserved © 2024 | Designed and developed by Meptics
          </p>
        </div>
        <div className="col-md-3 text-md-end text-center mt-3 mt-md-0">
          <span className="">We Accept: </span>
          <img src={jazzcash} alt="JazzCash" className="me-2" />
          <img src={easypaisa} alt="EasyPaisa" className="me-2" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
