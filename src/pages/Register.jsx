import React from "react";
import Header from "../common/Header";
import FooterTwo from "./../common/FooterTwo";
import Breadcrumb from "../common/Breadcrumb";
import LoginRegister from "../components/LoginRegister";
import PageTitle from "../common/PageTitle";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={`CityScape - ${t("Kayıt Ol")}`} />

      <main className="body-bg">
        {/* Header */}
        <Header
          headerClass="dark-header has-border"
          logoBlack={false}
          logoWhite={true}
          headerMenusClass="mx-auto"
          btnClass="btn btn-outline-main btn-outline-main-dark d-lg-block d-none"
          btnLink="/add-new-listing"
          btnText="Add Listing"
          spanClass="icon-right text-gradient"
          showHeaderBtn={false}
          showOffCanvasBtn={false}
          offCanvasBtnClass=""
          showContactNumber={false}
        />

        <Breadcrumb pageTitle="Kayıt Ol" pageName="Kayıt Ol" />

        <LoginRegister
          titleText={t("Kayıt Ol")}
          firstNameCol="col-sm-6 col-xs-6"
          showFirstName={true}
          lastNameCol="col-sm-6 col-xs-6"
          showLastName={true}
          passwordCol="col-sm-6 col-xs-6"
          showConfirm={true}
          btnText={t("Kayıt Ol")}
          showForgotRemember={true}
          showTermCondition={false}
          haveAccountText={t("Hesabın Var mı?")}
          haveAccountLinkText={t("Giriş Yap")}
          haveAccountLink="/login"
        />
        <FooterTwo />
      </main>
    </>
  );
};

export default Register;
