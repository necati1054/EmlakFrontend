import React from "react";
import Header from "../common/Header";
import PageTitle from "../common/PageTitle";
import LoginSection from "../components/LoginSection";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={`CityScape - ${t("Giriş")}`} />

      <main className="body-bg">
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

        <LoginSection />
      </main>
    </>
  );
};

export default Login;
