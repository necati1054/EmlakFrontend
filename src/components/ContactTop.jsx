import React, { useState, useEffect } from "react";
// import { contactTopInfos } from "../data/OthersPageData/OthersPageData";
import { Link } from "react-router-dom";
import axios from "../axios.js";

const ContactTop = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    console.log("useEffect");
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
      <section className="contact-top padding-y-120">
        <div className="container container-two">
          <div className="section-heading">
            <span className="section-heading__subtitle bg-gray-100">
              <span className="text-gradient fw-semibold">İletişim</span>
            </span>
            <h2 className="section-heading__title">İletişim!</h2>
          </div>
          <div className="row gy-4">
            <div className="col-lg-4 col-sm-6">
              <div className="contact-card">
                <span className="contact-card__icon">
                  <i className="fas fa-paper-plane"></i>
                </span>
                <h5 className="contact-card__title">E-Posta</h5>
                <p className="contact-card__text font-18">
                  <Link
                    to={`mailto: ${
                      footerData?.find((item) => item.key === "email")?.value
                    }`}
                    className="link"
                  >
                    {footerData?.find((item) => item.key === "email")?.value}
                  </Link>
                </p>
                {/* <p className="contact-card__text font-18">
                  {contactTopInfo.text}
                </p> */}
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="contact-card">
                <span className="contact-card__icon">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <h5 className="contact-card__title">address</h5>
                {/* <p className="contact-card__text font-18">
                  <Link
                    to={`mailto: ${
                      footerData?.find((item) => item.key === "email")?.value
                    }`}
                    className="link"
                  >
                    {footerData?.find((item) => item.key === "email")?.value}
                  </Link>
                </p> */}
                <p className="contact-card__text font-18">
                  {footerData?.find((item) => item.key === "address")?.value}
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="contact-card">
                <span className="contact-card__icon">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <h5 className="contact-card__title">Telefon Numarası</h5>
                <p className="contact-card__text font-18">
                  <Link
                    to={`tel: ${
                      footerData?.find((item) => item.key === "phone")?.value
                    }`}
                    className="link"
                  >
                    {footerData?.find((item) => item.key === "phone")?.value}
                  </Link>
                </p>
                {/* <p className="contact-card__text font-18">
                  {footerData?.find((item) => item.key === "phone_number")?.value}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactTop;
