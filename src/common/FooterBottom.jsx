import React from "react";
import BottomFooterLinks from "./footer/BottomFooterLinks";

const FooterBottom = (props) => {
  return (
    <>
      <div className={`bottom-footer ${props.footerClass}`}>
        <div className="container container-two">
          <div className="bottom-footer__inner flx-between gap-3">
            <p className="bottom-footer__text">
              &copy; Emlak {new Date().getFullYear()} | Bütün hakkları saklıdır.
            </p>
          </div>
          <p className="footer-author">Necati Arman &copy; NeArSoftware</p>
        </div>
      </div>
    </>
  );
};

export default FooterBottom;
