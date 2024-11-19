import React, { useEffect, useState } from "react";
import TopHeader from "../common/TopHeader";
import Header from "./../common/Header";
import Banner from "../components/Banner";
import About from "../components/About";
import Property from "../components/Property";
import PropertyType from "../components/PropertyType";
import VideoPopup from "../components/VideoPopup";
import Counter from "./../components/Counter";
import Portfolio from "../components/Portfolio";
import Testimonial from "./../components/Testimonial";
import Blog from "./../components/Blog";
import FooterTwo from "./../common/FooterTwo";
import Message from "./../components/Message";
import MobileMenu from "../common/MobileMenu";
import OffCanvas from "../common/OffCanvas";
import PageTitle from "../common/PageTitle";
import axios from "../axios.js";

const HomeOne = () => {
  const [PropertiesData, setPropertiesData] = useState([]);

  const getData = async () => {
    const response = await axios.get("/home-page");
    setPropertiesData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(PropertiesData);
  return (
    <>
      <PageTitle title="CityScape - Home Page" />
      <OffCanvas />
      <MobileMenu />

      <main className="body-bg">
        {/* Top header */}
        {/* <TopHeader /> */}

        {/* Header */}
        <Header
          headerClass=""
          logoBlack={true}
          logoWhite={false}
          headerMenusClass=""
          btnClass="btn btn-outline-light d-lg-block d-none"
          btnLink="/login"
          btnText="Giriş Yap"
          spanClass="icon-right text-gradient"
          showHeaderBtn={true}
          showOffCanvasBtn={false}
          offCanvasBtnClass=""
          showContactNumber={false}
        />

        {/* Banner */}
        <Banner />

        {/* About */}
        {/* <About/> */}

        {/* Property */}

        {/* konut */}
        <Property
          title="Şanslı Gününüze Özel Prestijli Konutlar"
          propertyData={PropertiesData.konut}
          ilan_type="1"
        />

        {/* işyeri */}
        <Property
          title="Şanslı Gününüze Özel Prestijli İşYerleri"
          propertyData={PropertiesData.isyeri}
          ilan_type="2"
        />

        {/* arsa */}
        <Property
          title="Şanslı Gününüze Özel Prestijli Arsalar"
          propertyData={PropertiesData.arsa}
          ilan_type="3"
        />

        {/* Property Type */}
        {/* <PropertyType /> */}

        {/* Video Popup */}
        {/* <VideoPopup /> */}

        {/* Counter */}
        {/* <Counter /> */}

        {/* Message */}
        {/* <Message /> */}

        {/* Portfolio */}
        {/* <Portfolio /> */}

        {/* Testimonial */}
        {/* <Testimonial /> */}

        {/* Blog */}
        {/* <Blog /> */}

        {/* FooterTwo */}
        <FooterTwo />
      </main>
    </>
  );
};

export default HomeOne;
