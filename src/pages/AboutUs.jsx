import React from "react";
import Header from "../common/Header";
import FooterTwo from "./../common/FooterTwo";
import Breadcrumb from "../common/Breadcrumb";
import Cta from "../components/Cta";
import AboutThree from "../components/AboutThree";
import PropertyTypeThree from "../components/PropertyTypeThree";
import Team from "../components/Team";
import PageTitle from "../common/PageTitle";

const AboutUs = () => {
  return (
    <>
      <PageTitle title="CityScape - About Us" />
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
      {/* BreadCrumb */}
      {/* <Breadcrumb pageTitle="Hakkımızda" pageName="Hakkımızda" /> */}
      <AboutThree />
      {/* <Team /> */}
      <PropertyTypeThree />
      {/* Cta
      <Cta ctaClass="" /> */}
      {/* Footer */}
      <FooterTwo />
    </>
  );
};

export default AboutUs;
