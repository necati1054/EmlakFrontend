import React from "react";
import { useTranslation } from "react-i18next";
const FooterBottom = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={`bottom-footer ${props.footerClass}`}>
        <div className="container container-two">
          <div className="bottom-footer__inner flx-between gap-3">
            <p className="bottom-footer__text">
              &copy; Emlak {new Date().getFullYear()} |{" "}
              {t("Bütün hakları saklıdır.")}
            </p>
          </div>
          <p className="footer-author">Necati Arman &copy; NeArSoftware</p>
        </div>
      </div>
    </>
  );
};

export default FooterBottom;
