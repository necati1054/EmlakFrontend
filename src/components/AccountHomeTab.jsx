import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "../data/HomeTwoData/HomeTwoData";
import { Link } from "react-router-dom";
import axios from "../axios.js";
import KonutIcon from "../../public/assets/images/icons/Konut_Icon.png";
import ArsaIcon from "../../public/assets/images/icons/Arsa_Icon.svg";
import IşYeriIcon from "../../public/assets/images/icons/IşYeri_Icon.png";

const AccountHomeTab = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const [data, setData] = useState([]);
  let control = false;

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    } else {
      if (!userData) {
        navigate("/login");
      }
    }
  }, [navigate]);

  if (!userData) return null;

  const getData = async () => {
    await axios.get("/user-dashboard/" + userData.id).then((res) => {
      setData(res.data);
      control = true;
    });
  };

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    } else {
      if (!userData) {
        navigate("/login");
      }
    }
    getData();
  }, [navigate]);

  if (!userData) return null;

  if (data && control) {
    return <h1>Yükleniyor Lütfen Bekleyiniz</h1>;
  }

  console.log(data);

  return (
    <>
      <p className="account-alert">
        Selam 👋{" "}
        <strong className="text-heading fw-500 text-poppins">
          {userData.name} {userData.surname}
        </strong>{" "}
      </p>

      <section className="service padding-b-60">
        <div className="container container-two">
          <div className="row gy-4">
            {/* Konut */}
            <div className="col-lg-4 col-sm-6 col-xs-6">
              <div
                className="service-item"
                style={{
                  backgroundColor: "transparent", // Background kaldır
                  border: "1px solid rgba(2, 148, 2, 0.1098039216)", // Border ekle
                  height: "100%", // Yüksekliği tam yap
                  minHeight: "300px", // Minimum bir yükseklik belirle
                  display: "flex", // Flexbox ile içerikleri hizala
                  flexDirection: "column", // İçerikleri dikey hizala
                  justifyContent: "center", // Üstten alta yayılmasını sağla
                  textAlign: "center", // İçerikleri merkezle
                  padding: "20px", // İçerik ile kenarlar arasına boşluk ekle
                }}
              >
                <span className="service-item__icon" style={{ margin: "auto" }}>
                  <img
                    src={KonutIcon}
                    alt=""
                    style={{ maxWidth: "100%", height: "auto" }} // Resmi orantılı tut
                  />
                </span>
                <h6 className="service-item__title">
                  Aktif İlan Sayısı = {data?.KonutIlanCount?.active}
                </h6>
                <span className="service-item__text font-18 d-block">
                  Pasif / Silinmiş İlan Sayısı = {data?.KonutIlanCount?.passive}
                </span>
              </div>
            </div>
            {/* Arsa */}
            <div className="col-lg-4 col-sm-6 col-xs-6">
              <div
                className="service-item"
                style={{
                  backgroundColor: "transparent", // Background kaldır
                  border: "1px solid rgba(2, 148, 2, 0.1098039216)", // Border ekle
                  height: "100%", // Yüksekliği tam yap
                  minHeight: "300px", // Minimum bir yükseklik belirle
                  display: "flex", // Flexbox ile içerikleri hizala
                  flexDirection: "column", // İçerikleri dikey hizala
                  justifyContent: "center", // Üstten alta yayılmasını sağla
                  textAlign: "center", // İçerikleri merkezle
                  padding: "20px", // İçerik ile kenarlar arasına boşluk ekle
                }}
              >
                <span className="service-item__icon" style={{ margin: "auto" }}>
                  <img
                    src={ArsaIcon}
                    alt=""
                    style={{ maxWidth: "100%", height: "auto" }} // Resmi orantılı tut
                  />
                </span>
                <h6 className="service-item__title">
                  Aktif İlan Sayısı = {data?.ArsaIlanCount?.active}
                </h6>
                <span className="service-item__text font-18 d-block">
                  Pasif / Silinmiş İlan Sayısı = {data?.ArsaIlanCount?.passive}
                </span>
              </div>
            </div>
            {/* Is Yeri */}
            <div className="col-lg-4 col-sm-6 col-xs-6">
              <div
                className="service-item"
                style={{
                  backgroundColor: "transparent", // Background kaldır
                  border: "1px solid rgba(2, 148, 2, 0.1098039216)", // Border ekle
                  height: "100%", // Yüksekliği tam yap
                  minHeight: "300px", // Minimum bir yükseklik belirle
                  display: "flex", // Flexbox ile içerikleri hizala
                  flexDirection: "column", // İçerikleri dikey hizala
                  justifyContent: "center", // Üstten alta yayılmasını sağla
                  textAlign: "center", // İçerikleri merkezle
                  padding: "20px", // İçerik ile kenarlar arasına boşluk ekle
                }}
              >
                <span className="service-item__icon" style={{ margin: "auto" }}>
                  <img
                    src={IşYeriIcon}
                    alt=""
                    style={{ maxWidth: "100%", height: "auto" }} // Resmi orantılı tut
                  />
                </span>
                <h6 className="service-item__title">
                  Aktif İlan Sayısı = {data?.IsYeriIlanCount?.active}
                </h6>
                <span className="service-item__text font-18 d-block">
                  Pasif / Silinmiş İlan Sayısı ={" "}
                  {data?.IsYeriIlanCount?.passive}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountHomeTab;
