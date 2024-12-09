import React from "react";
import { Link } from "react-router-dom";

import LogoWhiteImage from "../../public/assets/images/logo/white-logo.png";
import { useTranslation } from "react-i18next";

const LogoWhite = () => {
  const { t, i18n } = useTranslation();
  let lang = i18n.resolvedLanguage;
  return (
    <>
      <Link to={"/" + lang} className="mobile-menu__logo">
        <img src={LogoWhiteImage} alt="Logo" />
      </Link>
    </>
  );
};

export default LogoWhite;
