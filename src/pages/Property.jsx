import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Breadcrumb from "../common/Breadcrumb";
import PropertyPageSection from "../components/PropertyPageSection";
import PageTitle from "../common/PageTitle";
import { useParams } from "react-router-dom";
import axios from "../axios.js";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useQueryParams = () => {
  const location = useLocation();
  return React.useMemo(() => {
    // Sorgu parametrelerini nesneye dönüştürme
    const params = new URLSearchParams(location.search);
    const queryObject = {};
    params.forEach((value, key) => {
      queryObject[key] = value;
    });
    return queryObject;
  }, [location.search]);
};

const Property = () => {
  const { ilanType } = useParams();
  const [propertiesData, setPropertiesData] = useState([]);
  const queryParams = useQueryParams();

  const getData = async () => {
    const response = await axios.get(`/${ilanType}`);
    console.log(typeof response);
    setPropertiesData(response.data);
  };

  const getDataWithQueryParams = async () => {
    const dataToSend = {
      searchValues: queryParams,
    };

    const response = await axios.post(`/search`, dataToSend);
    setPropertiesData(response.data);
  };

  useEffect(() => {
    if (Object.keys(queryParams).length > 0) {
      getDataWithQueryParams();
    } else {
      getData();
    }
  }, []);

  const { t } = useTranslation();
  return (
    <>
      <PageTitle title={`CityScape - ${t("İlanlar")}`} />

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
        <Breadcrumb pageTitle={t("İlanlar")} pageName={ilanType} />

        {ilanType === "konut" && (
          <PropertyPageSection propertiesData={propertiesData} ilan_type={1} />
        )}

        {ilanType === "isyeri" && (
          <PropertyPageSection propertiesData={propertiesData} ilan_type={2} />
        )}

        {ilanType === "arsa" && (
          <PropertyPageSection propertiesData={propertiesData} ilan_type={3} />
        )}

        <Footer />
      </main>
    </>
  );
};

export default Property;
