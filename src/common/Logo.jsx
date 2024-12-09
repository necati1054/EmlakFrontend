import React from "react";

import LogoImg from "../../public/assets/images/logo/logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Logo = () => {
  const { t, i18n } = useTranslation();
  let lang = i18n.resolvedLanguage;
  return (
    <>
      <Link to={"/" + lang} className="link">
        <img src={LogoImg} alt="Logo" />
      </Link>
    </>
  );
};

export default Logo;
