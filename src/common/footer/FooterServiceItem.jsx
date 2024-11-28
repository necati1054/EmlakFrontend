import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FooterServiceItem = () => {
  const { t } = useTranslation();
  const footerServiceLinks = [
    {
      text: t("Hakkımızda"),
      link: "/about-us",
    },
    {
      text: t("İletişim"),
      link: "/Contact",
    },
    {
      text: t("Sıkça Sorulan Sorular"),
      link: "/faq",
    },
    {
      text: t("Kullanıcı Sözleşmesi"),
      link: "/property",
    },
    {
      text: t("Gizlilik Politikası"),
      link: "/property",
    },
  ];
  return (
    <>
      <div className="footer-item">
        <h6 className="footer-item__title">{t("Sayfalar")}</h6>
        <ul className="footer-menu">
          {footerServiceLinks.map((footerServiceLink, index) => {
            return (
              <li className="footer-menu__item" key={index}>
                <Link to={footerServiceLink.link} className="footer-menu__link">
                  {footerServiceLink.text}{" "}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default FooterServiceItem;
