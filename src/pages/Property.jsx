import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Breadcrumb from "../common/Breadcrumb";
import PropertyPageSection from "../components/PropertyPageSection";
import Cta from "../components/Cta";
import PageTitle from "../common/PageTitle";
import { useParams } from "react-router-dom";
import axios from "../axios.js";
import { useLocation } from "react-router-dom";

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

  return (
    <>
      <PageTitle title="CityScape - Property" />

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
        {/* BreadCrumb */}
        <Breadcrumb pageTitle="İlanlar" pageName={ilanType} />
        {/* konut */}
        {ilanType === "konut" && (
          <PropertyPageSection propertiesData={propertiesData} ilan_type={1} />
        )}
        {/* işyeri */}
        {ilanType === "isyeri" && (
          <PropertyPageSection propertiesData={propertiesData} ilan_type={2} />
        )}
        {/* arsa */}
        {ilanType === "arsa" && (
          <PropertyPageSection propertiesData={propertiesData} ilan_type={3} />
        )}

        {/* Cta
        <Cta ctaClass="" /> */}
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

export default Property;
