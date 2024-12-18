import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FooterServiceItem = () => {
  const { t, i18n } = useTranslation();
  let lang = i18n.resolvedLanguage;

  const footerServiceLinks = [
    {
      text: t("Hakkımızda"),
      link: `/${lang}/about-us`,
    },
    {
      text: t("İletişim"),
      link: `/${lang}/Contact`,
    },
    {
      text: t("Sıkça Sorulan Sorular"),
      link: `/${lang}/faq`,
    },
    {
      text: t("Kullanıcı Sözleşmesi"),
      link: `/${lang}/about-us`,
    },
    {
      text: t("Gizlilik Politikası"),
      link: `/${lang}/about-us`,
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
