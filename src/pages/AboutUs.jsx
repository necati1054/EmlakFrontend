import React from "react";
import Header from "../common/Header";
import FooterTwo from "./../common/FooterTwo";
import AboutThree from "../components/AboutThree";
import PageTitle from "../common/PageTitle";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={`CityScape - ${t("Hakkımızda")}`} />

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

      <AboutThree />

      {/* <PropertyTypeThree /> */}

      <FooterTwo />
    </>
  );
};

export default AboutUs;
