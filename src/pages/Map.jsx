import React, { useEffect, useState } from "react";
import Header from "./../common/Header";
import FooterTwo from "./../common/FooterTwo";
import MobileMenu from "../common/MobileMenu";
import OffCanvas from "../common/OffCanvas";
import PageTitle from "../common/PageTitle";
import axios from "../axios.js";
import { slugURL } from "../utility/Utility";
import { Link } from "react-router-dom";

import Config from "../urlConf";
import { useTranslation } from "react-i18next";

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const Map = () => {
  const API_KEY = "AIzaSyCZ2lv_291yFguiqfick2M6d_jatFdjFNs";
  const { t, i18n } = useTranslation();
  let lang = i18n.resolvedLanguage;

  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [tip, setTip] = useState("konut");

  const mapContainerStyle = {
    width: "100%",
    height: "680px",
  };

  const defaultCenter = {
    lat: 39.92077, // Türkiye merkez
    lng: 32.85411,
  };

  function formatCurrency(amount) {
    // String'i sayıya çevirme
    const numericAmount = parseFloat(amount);

    // Sayıyı para birimi formatında döndürme
    return numericAmount.toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
    });
  }

  const propertyURL = slugURL({
    url: `${lang}/property`,
    id: selectedProperty?.id,
    ilanType: tip == "konut" ? 1 : tip.isyeri == "isyeri" ? 2 : "arsa",
  });

  useEffect(() => {
    axios
      .get(tip)
      .then((res) => {
        console.log(res.data);
        setProperties(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tip]);
  return (
    <>
      <PageTitle title="CityScape - Map" />
      <OffCanvas />
      <MobileMenu />

      <main className="body-bg">
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
          showHeaderBtn={false}
          showOffCanvasBtn={false}
          offCanvasBtnClass=""
          showContactNumber={false}
        />

        <div className="row mb-4">
          <div className="col-sm-4">
            <label htmlFor="tip" className="form-label">
              Tip Seç
            </label>
            <select
              className="select common-input"
              id="tip"
              onChange={(e) => {
                setTip(e.target.value);
              }}
              value={tip}
            >
              <option value="konut" defaultChecked>
                Konut
              </option>
              <option value="arsa">Arsa</option>
              <option value="isyeri">iş Yeri</option>
            </select>
          </div>
          <div className="col-sm-4 mt-4">
            <p className="account-alert">
              <strong className="text-heading fw-500 text-poppins">
                {tip}'türünde {properties.length} tane veri getirildi
              </strong>{" "}
            </p>
          </div>
        </div>

        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={defaultCenter}
            zoom={6}
          >
            {/* Tüm markerları oluştur */}
            {properties.map((property, index) => (
              <Marker
                key={index}
                position={{
                  lat: parseFloat(property.lat),
                  lng: parseFloat(property.lng),
                }}
                title={property.ilan_basligi || `Property ${index + 1}`} // Varsayılan bir başlık ekle
                onClick={() => setSelectedProperty(property)} // Marker'a tıklanınca kart açılır
              />
            ))}

            {/* InfoWindow: Seçili Marker için */}
            {selectedProperty && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedProperty.lat),
                  lng: parseFloat(selectedProperty.lng),
                }}
                onCloseClick={() => setSelectedProperty(null)} // Kapatma butonuna basılınca kart kapanır
              >
                <div
                  style={{
                    width: "200px",
                    height: "%10",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                  }}
                >
                  <img
                    src={
                      selectedProperty?.first_photo?.path
                        ? `${Config.BASE_URL}/Image/${selectedProperty?.first_photo?.path}`
                        : `${Config.BASE_URL}/Image/no-image.png`
                    }
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    className="cover-img"
                  />
                  <div style={{ fontSize: "10px", fontWeight: "bold" }}>
                    {selectedProperty.ilan_basligi}
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: "bold" }}>
                    {formatCurrency(selectedProperty.fiyat)}{" "}
                    {selectedProperty.teklif_tipi == "kiralık" && (
                      <span className="day">Aylık</span>
                    )}
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: "bold" }}>
                    {selectedProperty.İl} / {selectedProperty.İlçe}
                  </div>
                  <div style={{ fontSize: "10px", fontWeight: "bold" }}>
                    {selectedProperty.oda_sayisi} +{" "}
                    {selectedProperty.salon_sayisi}
                  </div>
                  <Link
                    to={propertyURL}
                    state={
                      (selectedProperty.title,
                      selectedProperty.desc,
                      selectedProperty.price)
                    }
                    style={{ color: "#222" }}
                    className={`simple-btn `}
                  >
                    İlanı Gör
                    <span className="icon-right">
                      <i className="fas fa-arrow-right"></i>{" "}
                    </span>
                  </Link>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>

        <FooterTwo />
      </main>
    </>
  );
};

export default Map;
