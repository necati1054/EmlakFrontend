import React from "react";
import Header from "../common/Header";
import FooterTwo from "./../common/FooterTwo";
import Breadcrumb from "../common/Breadcrumb";
import Cta from "../components/Cta";
import FaqTwo from "../components/FaqTwo";
import FaqContactUs from "../components/FaqContactUs";
import CounterFour from "../components/CounterFour";
import PageTitle from "../common/PageTitle";
import { useTranslation } from "react-i18next";

const FaqPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={`CityScape - ${t("Sıkça Sorulan Sorular")}`} />

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
      <Breadcrumb
        pageTitle="Sıkça Sorulan Sorular"
        pageName="Sıkça Sorulan Sorular"
      />

      <FaqTwo />

      <CounterFour />

      <FooterTwo />
    </>
  );
};

export default FaqPage;
