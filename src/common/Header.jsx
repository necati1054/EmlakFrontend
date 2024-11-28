import React, { useContext, useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import Logo from "./Logo";
import { MobileMenuContext } from "../contextApi/MobileMenuContext";
import { OffCanvasContext } from "../contextApi/OffCanvasContext";
import { ScrollHideContext } from "../contextApi/ScrollHideContext";
import Button from "./Button";
import LogoWhite from "./LogoWhite";
import { useTranslation } from "react-i18next";

const Header = (props) => {
  const { handleMobileMenuClick } = useContext(MobileMenuContext);

  const { handleOffCanvas } = useContext(OffCanvasContext);

  const { handleScrollHide, handleScrollHideLg } =
    useContext(ScrollHideContext);

  // Sticky header Code
  const [stickyHeader, setStickyHeader] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      window.scrollY > 100 ? setStickyHeader(true) : setStickyHeader(false);
    });
  }, []);

  const lngs = {
    tr: { nativeName: "Türkçe" },
    en: { nativeName: "İngilizce" },
    de: { nativeName: "Almanca" },
    fr: { nativeName: "Fransızca" },
    by: { nativeName: "Rusça" },
  };
  const { t, i18n } = useTranslation();
  return (
    <>
      {/* ==================== Header Start Here ==================== */}
      <header
        className={`header ${props.headerClass} ${
          stickyHeader ? "fixed-header" : ""
        }`}
      >
        <div className="container container-two">
          <nav className="header-inner flx-between">
            {props.logoBlack && (
              <div className="logo">
                <Logo />
              </div>
            )}
            {props.logoWhite && (
              <div className="logo">
                <LogoWhite />
              </div>
            )}
            {/* Menu Start  */}
            <div
              className={`header-menu d-lg-block d-none ${props.headerMenusClass}`}
            >
              <NavMenu navMenusClass="" />
            </div>
            {/* Menu End  */}
            {/* Header Right start */}

            <div className="header-right flx-align">
              {props.showOffCanvasBtn && (
                <button
                  type="button"
                  className={`offcanvas-btn d-lg-block d-none ${props.offCanvasBtnClass}`}
                  onClick={() => {
                    handleOffCanvas();
                    handleScrollHideLg();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="24"
                    viewBox="0 0 30 24"
                    fill="none"
                  >
                    <line
                      x1="0.0078125"
                      y1="12.293"
                      x2="30.0078"
                      y2="12.293"
                      stroke="#181616"
                      strokeWidth="3"
                    />
                    <path
                      d="M5.00781 22.293H30.0078"
                      stroke="#181616"
                      strokeWidth="3"
                    />
                    <path
                      d="M10.0078 2.29297H30.0078"
                      stroke="#181616"
                      strokeWidth="3"
                    />
                  </svg>
                </button>
              )}

              {/* header daki button burada */}
              {props.showHeaderBtn && (
                <Button
                  btnLink={props.btnLink}
                  btnClass={props.btnClass}
                  btnText={props.btnText}
                  spanClass={props.spanClass}
                  iconClass="fas fa-arrow-right"
                />
              )}

              {/* Dil değiştirme dropdown */}
              <select
                className="ms-3"
                value={i18n.resolvedLanguage}
                onChange={(e) => {
                  i18n.changeLanguage(e.target.value);
                }}
              >
                {Object.keys(lngs).map((lng) => (
                  <option
                    value={lng}
                    key={lng}
                    disabled={i18n.resolvedLanguage == lng}
                  >
                    {lngs[lng].nativeName}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="toggle-mobileMenu d-lg-none ms-3"
                onClick={() => {
                  handleMobileMenuClick();
                  handleScrollHide();
                }}
              >
                <i className="las la-bars"></i>
              </button>
            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>
      {/* ==================== Header End Here ==================== */}
    </>
  );
};

export default Header;
