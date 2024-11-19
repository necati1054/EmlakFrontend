import React from "react";

const SocialList = ({ footerData }) => {
  return (
    <ul className="social-list">
      <li className="social-list__item">
        <a
          href={
            "https://" +
            footerData?.find((item) => item.key === "instagram")?.value
          }
          className="social-list__link"
        >
          <i className="fab fa-instagram"></i>
        </a>
      </li>
    </ul>
  );
};

export default SocialList;
