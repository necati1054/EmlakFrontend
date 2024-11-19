import React from "react";
import Header from "../common/Header";
import FooterTwo from "./../common/FooterTwo";
import Breadcrumb from "../common/Breadcrumb";
import Cta from "../components/Cta";
import FaqTwo from "../components/FaqTwo";
import FaqContactUs from "../components/FaqContactUs";
import CounterFour from "../components/CounterFour";
import PageTitle from "../common/PageTitle";

const FaqPage = () => {
  return (
    <>
      <PageTitle title="CityScape - Frequently Ask Question" />

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
      <Breadcrumb
        pageTitle="Sıkça Sorulan Sorular"
        pageName="Sıkça Sorulan Sorular"
      />

      {/* Faq Two */}
      <FaqTwo />

      {/* Faq Contact Us
      <FaqContactUs /> */}

      {/* Counter Four */}
      <CounterFour />

      {/* Cta
      <Cta ctaClass="" /> */}

      {/* Footer */}
      <FooterTwo />
    </>
  );
};

export default FaqPage;
