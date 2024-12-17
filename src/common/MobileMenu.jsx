import React, { useContext } from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import { MobileMenuContext } from "../contextApi/MobileMenuContext";
import { ScrollHideContext } from "../contextApi/ScrollHideContext";
import Button from "./Button";
import { useTranslation } from "react-i18next";

const MobileMenu = () => {
  const { toggleMobileMenu, handleMobileMenuClose } =
    useContext(MobileMenuContext);

  const { handleScrollHideClose } = useContext(ScrollHideContext);

  const { t, i18n } = useTranslation();

  let lang = i18n.resolvedLanguage;

  return (
    <>
      {/* ==================== Mobile Menu Start Here ==================== */}
      <div
        className={`side-overlay ${toggleMobileMenu ? "show" : ""}`}
        onClick={() => {
          handleMobileMenuClose();
          handleScrollHideClose();
        }}
      ></div>

      <div
        className={`mobile-menu d-lg-none d-block ${
          toggleMobileMenu ? "active" : ""
        }`}
      >
        <button
          type="button"
          className="close-button"
          onClick={() => {
            handleMobileMenuClose();
            handleScrollHideClose();
          }}
        >
          <i className="las la-times"></i>
        </button>
        <div className="mobile-menu__inner">
          {/* Logo */}
          <Logo />

          <div className="mobile-menu__menu">
            {/* Nav Menu */}
            <NavMenu navMenusClass="nav-menu--mobile" />

            {/* Header Button */}
            <Button
              btnLink={"/" + lang + "/login"}
              btnClass="btn-outline-light d-lg-none d-block mt-4"
              btnText={t("Giriş Yap")}
              spanClass="icon-right text-gradient"
              iconClass="fas fa-arrow-right"
            />
          </div>
        </div>
      </div>
      {/* ==================== Mobile Menu End Here ==================== */}
    </>
  );
};

export default MobileMenu;
