import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SocialList from "./SocialList";
import FooterLogoDesc from "./footer/FooterLogoDesc";
import FooterServiceItem from "./footer/FooterServiceItem";
import FooterUsefulItem from "./footer/FooterUsefulItem";
import FooterBottom from "./FooterBottom";
import axios from "../axios.js";

const Footer = () => {
  return (
    <>
      {/* =============================== Footer Section Start ============================== */}
      <footer className="footer padding-y-120">
        <div className="container container-two">
          <div className="row gy-5">
            <div className="col-xl-3 col-sm-6 col-xsm-6">
              <div className="footer-item">
                <FooterLogoDesc />
                <SocialList />
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 col-xsm-6">
              <FooterUsefulItem />
            </div>
            <div className="col-xl-3 col-sm-6 col-xsm-6">
              <FooterServiceItem />
            </div>
          </div>
        </div>
      </footer>
      {/* bottom Footer */}
      <FooterBottom footerClass="" />
      {/* =============================== Footer Section End ============================== */}
    </>
  );
};

export default Footer;
