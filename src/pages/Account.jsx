import React from "react";
import Header from "../common/Header";
import FooterTwo from "../common/FooterTwo";
import AccountSection from "../components/AccountSection";
import PageTitle from "../common/PageTitle";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={`CityScape - ${t("Hesap")}`} />

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
        <AccountSection />

        <FooterTwo />
      </main>
    </>
  );
};

export default Account;
