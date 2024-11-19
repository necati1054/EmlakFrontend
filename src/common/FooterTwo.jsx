import React, { useEffect, useState } from "react";
import FooterBottom from "./FooterBottom";
import FooterServiceItem from "./footer/FooterServiceItem";
import FooterLogoDesc from "./footer/FooterLogoDesc";
import FooterInfo from "./footer/FooterInfo";
import SocialList from "./SocialList";
import SubscribeBox from "./footer/SubscribeBox";
import axios from "../axios.js";

const FooterTwo = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    axios
      .get("/settings")
      .then((response) => {
        setFooterData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);
  return (
    <>
      {/* ==================== Footer Two Start Here ==================== */}
      <footer className="footer footer-two padding-y-60">
        <div className="container container-two">
          <div className="row gy-5">
            <div className="col-xl-4 col-lg-6">
              <div className="footer-item">
                <FooterLogoDesc />

                <h6 className="footer-item__title mt-4 mt-lg-5">
                  Bugünün işini yarına bırakma ara
                </h6>

                <FooterInfo footerData={footerData} />
              </div>
            </div>
            <div className="col-xl-1 d-xl-block d-none"></div>
            <div className="col-xl-3 col-sm-6">
              <FooterServiceItem />
            </div>
            <div className="col-xl-1 d-xl-block d-none"></div>
            <div className="col-xl-3 col-sm-6">
              <div className="footer-item">
                <h6 className="footer-item__title">Sosyal Medya</h6>
                <SocialList footerData={footerData} />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* bottom Footer */}
      <FooterBottom footerClass="" />
      {/* ==================== Footer Two End Here ==================== */}
    </>
  );
};

export default FooterTwo;
