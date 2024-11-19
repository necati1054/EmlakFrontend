import React from "react";
import { Link } from "react-router-dom";

export const footerServiceLinks = [
  {
    text: "Hakkımızda",
    link: "/about-us",
  },
  {
    text: "İletişim",
    link: "/Contact",
  },
  {
    text: "Sıkça Sorulan Sorular",
    link: "/faq",
  },
  {
    text: "Kullanıcı Sözleşmesi",
    link: "/property",
  },
  {
    text: "Gizlilik Politikası",
    link: "/property",
  },
];

const FooterServiceItem = () => {
  return (
    <>
      <div className="footer-item">
        <h6 className="footer-item__title">Sayfalar</h6>
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
