import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Breadcrumb from "../common/Breadcrumb";
import Cta from "../components/Cta";
import PropertyDetailsSection from "../components/PropertyDetailsSection";
import PropertyDetailsSectionIsyeri from "../components/PropertyDetailsSectionIsyeri";
import PropertyDetailsSecritonArsa from "../components/PropertyDetailsSectionArsa.jsx";
import { useParams } from "react-router-dom";
import PageTitle from "../common/PageTitle";
import axios from "../axios.js";

const PropertyDetails = () => {
  const [PropertiesData, setPropertiesData] = useState();
  const { ilanType, id } = useParams();

  const getData = async () => {
    const response = await axios.get(`/${ilanType}/${id}`);
    setPropertiesData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageTitle title="CityScape - Property Details" />

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
        pageTitle="Ürün Detayları"
        pageName={PropertiesData?.ilan_basligi}
      />

      {/* Property Details Section */}
      {/* konut */}
      {ilanType === "konut" && (
        <PropertyDetailsSection PropertiesData={PropertiesData} />
      )}

      {/* işyeri */}
      {ilanType === "isyeri" && (
        <PropertyDetailsSectionIsyeri PropertiesData={PropertiesData} />
      )}

      {/* arsa */}
      {ilanType === "arsa" && (
        <PropertyDetailsSecritonArsa PropertiesData={PropertiesData} />
      )}

      {/* CTA */}

      {/* Footer */}
      <Footer />
    </>
  );
};

export default PropertyDetails;
