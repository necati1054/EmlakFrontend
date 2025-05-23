import React from "react";
import { useTranslation } from "react-i18next";

const FooterInfo = ({ footerData }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="row gy-4">
        <div className="col-6">
          <div className="contact-info d-flex gap-2">
            <span className="contact-info__icon text-gradient">
              <i className="fas fa-map-marker-alt"></i>
            </span>
            <div className="contact-info__content">
              <span className="contact-info__text text-white">
                {t("Adres")}
              </span>
              <span className="contact-info__address text-white">
                {footerData?.find((item) => item.key === "address")?.value}
              </span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="contact-info d-flex gap-2">
            <span className="contact-info__icon text-gradient">
              <i className="fas fa-phone"></i>
            </span>
            <div className="contact-info__content">
              <span className="contact-info__text text-white">
                {t("Telefon")}
              </span>
              <span className="contact-info__address text-white">
                {footerData?.find((item) => item.key === "phone")?.value}
              </span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="contact-info d-flex gap-2">
            <span className="contact-info__icon text-gradient">
              <i className="fas fa-envelope"></i>
            </span>
            <div className="contact-info__content">
              <span className="contact-info__text text-white">
                {t("E-Posta")}
              </span>
              <span className="contact-info__address text-white">
                {footerData?.find((item) => item.key === "email")?.value}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterInfo;
