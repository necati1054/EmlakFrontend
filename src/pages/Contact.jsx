import React from "react";
import Header from "../common/Header";
import FooterTwo from "./../common/FooterTwo";
import Breadcrumb from "../common/Breadcrumb";
import Cta from "../components/Cta";
import ContactTop from "../components/ContactTop";
import ContactUsSection from "../components/ContactUsSection";
import PageTitle from "../common/PageTitle";
import { HelmetProvider } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      <PageTitle title="CityScape - Contact Us" />

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
        <Breadcrumb pageTitle="İletişim" pageName="İletişim" />

        {/* Contact Top */}
        <ContactTop />

        <div className="contact-map address-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6352252.32432791!2d29.845249160321572!3d38.97684404417161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b0155c964f2671%3A0x40d9dbd42a625f2a!2zVMO8cmtpeWU!5e0!3m2!1str!2str!4v1729860275260!5m2!1str!2str"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Contact Us Section
        <ContactUsSection /> */}

        {/* Cta
        <Cta ctaClass="" /> */}

        {/* Footer */}
        <FooterTwo />
      </main>
    </>
  );
};

export default Contact;
