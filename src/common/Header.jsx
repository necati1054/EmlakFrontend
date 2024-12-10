import React, { useContext, useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import Logo from "./Logo";
import { MobileMenuContext } from "../contextApi/MobileMenuContext";
import { OffCanvasContext } from "../contextApi/OffCanvasContext";
import { ScrollHideContext } from "../contextApi/ScrollHideContext";
import Button from "./Button";
import LogoWhite from "./LogoWhite";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";

import tr_flag from "/assets/images/flag/turkey.png";
import en_flag from "/assets/images/flag/abd.png";
import de_flag from "/assets/images/flag/germany.png";
import fr_flag from "/assets/images/flag/franch.png";
import by_flag from "/assets/images/flag/russian.png";
import it_flag from "/assets/images/flag/italian.png";

import "../../public/assets/css/dropdown.css";

const Header = (props) => {
  const navigate = useNavigate();
  const { handleMobileMenuClick } = useContext(MobileMenuContext);
  const [isOpen, setIsOpen] = useState(false);

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
    tr: { nativeName: "Türkçe", flag: tr_flag },
    en: { nativeName: "İngilizce", flag: en_flag },
    de: { nativeName: "Almanca", flag: de_flag },
    fr: { nativeName: "Fransızca", flag: fr_flag },
    by: { nativeName: "Rusça", flag: by_flag },
    it: { nativeName: "İtalyanca", flag: it_flag },
  };
  const { t, i18n } = useTranslation();

  const location = useLocation();

  const chaneLanguage = (e) => {
    i18n.changeLanguage(e);
    // i18n.changeLanguage(e.target.value);
    const currentPath = location.pathname;
    // const updatedPath = currentPath.replace(
    //   /^\/[a-z]{2}/,
    //   `/${e.target.value}`
    // );
    const updatedPath = currentPath.replace(/^\/[a-z]{2}/, `/${e}`);
    navigate(updatedPath);
    setIsOpen(false);
  };
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

              {/*  */}
              <div
                className="dropdown-container"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="selected-language">
                  <img
                    src={lngs[i18n.resolvedLanguage].flag}
                    alt={i18n.resolvedLanguage}
                  />
                  <span>{lngs[i18n.resolvedLanguage].name}</span>
                </div>
                {isOpen && (
                  <div className="dropdown-options">
                    {Object.keys(lngs).map((lng) => (
                      <div
                        key={lng}
                        className={`dropdown-option ${
                          i18n.resolvedLanguage === lng ? "disabled" : ""
                        }`}
                        onClick={() => chaneLanguage(lng)}
                      >
                        <img src={lngs[lng].flag} alt={lng} />
                        <span>{lngs[lng].name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/*  */}

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
