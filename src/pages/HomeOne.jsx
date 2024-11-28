import React, { useEffect, useState } from "react";
import Header from "./../common/Header";
import Banner from "../components/Banner";
import Property from "../components/Property";
import FooterTwo from "./../common/FooterTwo";
import MobileMenu from "../common/MobileMenu";
import OffCanvas from "../common/OffCanvas";
import PageTitle from "../common/PageTitle";
import axios from "../axios.js";
import { useTranslation } from "react-i18next";

const HomeOne = () => {
  const [PropertiesData, setPropertiesData] = useState([]);

  const getData = async () => {
    const response = await axios.get("/home-page");
    setPropertiesData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={`CityScape - ${t("Ana Sayfa")}`} />
      <OffCanvas />
      <MobileMenu />

      <main className="body-bg">
        <Header
          headerClass=""
          logoBlack={true}
          logoWhite={false}
          headerMenusClass=""
          btnClass="btn btn-outline-light d-lg-block d-none"
          btnLink="/login"
          btnText={t("Giriş Yap")}
          spanClass="icon-right text-gradient"
          showHeaderBtn={true}
          showOffCanvasBtn={false}
          offCanvasBtnClass=""
          showContactNumber={false}
        />
        <Banner />

        <Property
          title={t("Şanslı Gününüze Özel Prestijli Konutlar")}
          propertyData={PropertiesData.konut}
          ilan_type="1"
        />

        {/* işyeri */}
        <Property
          title={t("Şanslı Gününüze Özel Prestijli İşYerleri")}
          propertyData={PropertiesData.isyeri}
          ilan_type="2"
        />

        {/* arsa */}
        <Property
          title={t("Şanslı Gününüze Özel Prestijli Arsalar")}
          propertyData={PropertiesData.arsa}
          ilan_type="3"
        />
        <FooterTwo />
      </main>
    </>
  );
};

export default HomeOne;
