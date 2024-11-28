import React, { useCallback, useEffect, useState } from "react";
import { türkiyeIlleri } from "../data/OthersPageData/OthersPageData";
import { useFormik } from "formik";
import MyComponent from "./GoogleMaps";
import axios from "../axios.js";
import { useTranslation } from "react-i18next";

const defaultCenter = {
  lat: 39.9334, // Başlangıç enlem (Eğer izin verilmezse kullanılacak)
  lng: 32.8597, // Başlangıç boylam (Eğer izin verilmezse kullanılacak)
};

const KonutListingForm = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinceData, setProvinceData] = useState(null);
  const [center, setCenter] = useState(defaultCenter); // Haritanın merkezi
  const [markerPosition, setMarkerPosition] = useState(defaultCenter); // İşaretçinin konumu

  const handleProvinceChange = async (event) => {
    const selectedIl = event.target.value;
    setSelectedProvince(selectedIl);

    if (selectedIl != "seç") {
      try {
        const response = await fetch(
          `https://turkiyeapi.dev/api/v1/provinces?name=${selectedIl}`
        );
        const data = await response.json();

        setProvinceData(data.data[0].districts); // Veriyi state'e kaydediyoruz
      } catch (error) {
        console.error("API isteği sırasında bir hata oluştu:", error);
      }
    } else {
      setProvinceData(null);
    }
  };

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages((prevImage) => [...prevImage, ...selectedImages]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const formik = useFormik({
    initialValues: {
      ilan_basligi: "",
      açıklama: "",
      teklif_tipi: "Satılık",
      taşınmaz_türü: "daire",
      fiyat: "",
      m2: "",
      bölüm_oda_sayisi: "",
      açık_alan_m2: "",
      giriş_yüksekliği: "",
      kapalı_alan_m2: "",
      oda_sayisi: "",
      yapı_tipi: "betonarme",
      yapı_durumu: "sıfır",
      kat_sayisi: "",
      bina_yaşı: "",
      aidat: "",
      ısıtma: "yok",
      yapının_durumu: "sıfır",
      bulunduğu_kat: "",
      asansör_sayisi: "",
      kullanım_durumu: "boş",
      tapu_durumu: "kat_irtifakı",
      taşınmaz_numarası: "",
      durumu: "sıfır",
      İl: "",
      İlçe: "",
      Mahalle: "",
      lat: "",
      lng: "",
      alkol_ruhsatı: false,
      kiracılı: false,
      krediye_uygunluk: false,
      takaslı: false,
      zemin_etüdü: false,
    },
    onSubmit: (values) => {
      console.log("Form verileri:", values);
      console.log("Resimler:", images);
      console.log("id:", JSON.parse(localStorage.getItem("user")).id);

      const formData = new FormData();
      formData.append("ilan_basligi", values.ilan_basligi);
      formData.append("aciklama", values.açıklama);
      formData.append("teklif_tipi", values.teklif_tipi);
      formData.append("tasinmaz_turu", values.taşınmaz_türü);
      formData.append("fiyat", values.fiyat);
      formData.append("m2", values.m2);
      formData.append("bolum_oda_sayisi", values.bölüm_oda_sayisi);
      formData.append("acik_alan_m2", values.açık_alan_m2);
      formData.append("giriş_yuksekligi", values.giriş_yüksekliği);
      formData.append("kapali_alan_m2", values.kapalı_alan_m2);
      formData.append("oda_sayisi", values.oda_sayisi);
      formData.append("yapi_tipi", values.yapı_tipi);
      formData.append("yapi_durumu", values.yapı_durumu);
      formData.append("kat_sayisi", values.kat_sayisi);
      formData.append("bina_yasi", values.bina_yaşı);
      formData.append("aidat", values.aidat);
      formData.append("isitma", values.ısıtma);
      formData.append("yapinin_durumu", values.yapının_durumu);
      formData.append("bulundugu_kat", values.bulunduğu_kat);
      formData.append("asansor_sayisi", values.asansör_sayisi);
      formData.append("kullanim_durumu", values.kullanım_durumu);
      formData.append("tapu_durumu", values.tapu_durumu);
      formData.append("tasinmaz_numarasi", values.taşınmaz_numarası);
      formData.append("Il", values.İl);
      formData.append("Ilce", values.İlçe);
      formData.append("Mahalle", values.Mahalle);
      formData.append("lat", values.lat);
      formData.append("lng", values.lng);
      formData.append("alkol_ruhsati", values.alkol_ruhsatı);
      formData.append("kiracili", values.kiracılı);
      formData.append("krediye_uygunluk", values.krediye_uygunluk);
      formData.append("takasli", values.takaslı);
      formData.append("zemin_etudu", values.zemin_etüdü);
      formData.append("durumu", values.durumu);
      formData.append("user_id", JSON.parse(localStorage.getItem("user")).id);

      images.forEach((image) => {
        formData.append("images[]", image);
      });

      axios
        .post("/is_yeri", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      lat: markerPosition.lat,
      lng: markerPosition.lng,
    });
    console.log("markerPosition", markerPosition);
  }, [markerPosition]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {/* bilgiler */}
        <div className="card-item" id="basicInformation">
          <div className="card common-card">
            <div className="card-header">
              <h6 className="title mb-0">{t("Bilgiler")}</h6>
            </div>
            <div className="card-body">
              <div className="row gy-4">
                <div className="col-sm-12">
                  <label htmlFor="ilan_basligi" className="form-label">
                    {t("İlan Başlığı")}
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="ilan_basligi"
                    name="ilan_basligi"
                    placeholder={t("İlan Başlığı")}
                    value={formik.values.ilan_basligi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="açıklama" className="form-label">
                    {t("Açıklama")}
                  </label>
                  <textarea
                    className="common-input"
                    id="açıklama"
                    placeholder={t("Açıklama")}
                    value={formik.values.açıklama}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="teklif_tipi" className="form-label">
                    {t("Tekif Tipi")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="teklif_tipi"
                      value={formik.values.teklif_tipi}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="Satılık">{t("Satılık")}</option>
                      <option value="Kiralık">{t("Kiralık")}</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="taşınmaz_türü" className="form-label">
                    {t("Taşınmaz Türü")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="taşınmaz_türü"
                      value={formik.values.taşınmaz_türü}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="atölye">{t("Atölye")}</option>
                      <option value="avm">{t("Avm")}</option>
                      <option value="büfe">{t("Büfe")}</option>
                      <option value="ofis">{t("Ofis")}</option>
                      <option value="kafe">{t("Kafe")}</option>
                      <option value="çiftlik">{t("Çiftlik")}</option>
                      <option value="depo">{t("Depo")}</option>
                      <option value="dükkan">{t("Dükkan")}</option>
                      <option value="kıraathane">{t("Kıraathane")}</option>
                      <option value="kumarhane">{t("Kumarhane")}</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="fiyat" className="form-label">
                    {t("Fiyat")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="fiyat"
                    placeholder={t("Fiyat")}
                    value={formik.values.fiyat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="m2" className="form-label">
                    {t("M2")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="m2"
                    placeholder={t("M2")}
                    value={formik.values.m2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="bölüm_oda_sayisi" className="form-label">
                    {t("Bölüm Oda Sayisi")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="bölüm_oda_sayisi"
                    placeholder={t("Bölüm Oda Sayisi")}
                    value={formik.values.bölüm_oda_sayisi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="açık_alan_m2" className="form-label">
                    {t("Açık Alan M2")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="açık_alan_m2"
                    placeholder={t("Açık Alan M2")}
                    value={formik.values.açık_alan_m2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="giriş_yüksekliği" className="form-label">
                    {t("Giriş Yüksekliği")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="giriş_yüksekliği"
                    placeholder={t("Giriş Yüksekliği")}
                    value={formik.values.giriş_yüksekliği}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="kapalı_alan_m2" className="form-label">
                    {t("Kapalı Alan M2")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="kapalı_alan_m2"
                    placeholder={t("Kapalı Alan M2")}
                    value={formik.values.kapalı_alan_m2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="oda_sayisi" className="form-label">
                    {t("Oda Sayisi")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="oda_sayisi"
                    placeholder={t("Oda Sayisi")}
                    value={formik.values.oda_sayisi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="yapı_tipi" className="form-label">
                    {t("Yapı Tipi")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="yapıTipi"
                      value={formik.values.yapı_tipi}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="betonarme">{t("Betonarme")}</option>
                      <option value="çelik_konstrüksiyon">
                        {t("Çelik Konstrüksiyon")}
                      </option>
                      <option value="ahşap">{t("Ahşap")}</option>
                      <option value="yari_kagir">{t("Yari Kagir")}</option>
                      <option value="tam_kagir">{t("Tam Kagir")}</option>
                      <option value="taŞ">{t("Taş")}</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="yapı_durumu" className="form-label">
                    {t("Yapı Durumu")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="yapı_durumu"
                      value={formik.values.yapı_durumu}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="sıfır">{t("Sıfır")}</option>
                      <option value="ikinci_el">{t("İkinci El")}</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="kat_sayisi" className="form-label">
                    {t("Kat Sayisi")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="kat_sayisi"
                    placeholder={t("Kat Sayisi")}
                    value={formik.values.kat_sayisi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="bina_yaşı" className="form-label">
                    {t("Bina Yaşı")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="bina_yaşı"
                    placeholder="bina_yaşı"
                    value={formik.values.bina_yaşı}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="aidat" className="form-label">
                    {t("Aidat")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="aidat"
                    placeholder={t("Aidat")}
                    value={formik.values.aidat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="ısıtma" className="form-label">
                    {t("Isıtma")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="ısıtma"
                      value={formik.values.ısıtma}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="yok">{t("Yok")}</option>
                      <option value="soba">{t("Soba")}</option>
                      <option value="doğalgaz">{t("Doğalgaz")}</option>
                      <option value="yari_kagir">{t("Kat Kaloriferi")}</option>
                      <option value="merkezi">{t("Merkezi")}</option>
                      <option value="merkezi_(Pay Ölçer)">
                        {t("Merkezi (Pay Ölçer)")}
                      </option>
                      <option value="kombi_(Doğalgaz)">
                        {t("Kombi (Doğalgaz)")}
                      </option>
                      <option value="kombi_(Elektrik)">
                        {t("Kombi (Elektrik)")}
                      </option>
                      <option value="yerden_ısıtma">
                        {t("Yerden Isıtma")}
                      </option>
                      <option value="klima">{t("Klima")}</option>
                      <option value="fancoil_ünitesi">
                        {t("Fancoil Ünitesi")}
                      </option>
                      <option value="güneş_enerjisi">
                        {t("Güneş Enerjisi")}
                      </option>
                      <option value="elektrikli_radyatör">
                        {t("Elektrikli Radyatör")}
                      </option>
                      <option value="jeotermal">{t("Jeotermal")}</option>
                      <option value="şömine">{t("Şömine")}</option>
                      <option value="VRV">{t("VRV")}</option>
                      <option value="ısı_pompası">{t("Isı Pompası")}</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="yapının_durumu" className="form-label">
                    {t("Yapının Durumu")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="yapının_durumu"
                      value={formik.values.yapının_durumu}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="sıfır">{t("Sıfır")}</option>
                      <option value="ikinci_el">{t("İkinci El")}</option>
                      <option value="inşaat_halinde">
                        {t("inşaat Halinde")}
                      </option>
                      <option value="tarihi_eser">{t("Tarihi Eser")}</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="bulunduğu_kat" className="form-label">
                    {t("Bulunduğu Kat")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="bulunduğu_kat"
                    placeholder={t("Bulunduğu Kat")}
                    value={formik.values.bulunduğu_kat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="asansör_sayisi" className="form-label">
                    {t("Asansör Sayisi")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="asansör_sayisi"
                    placeholder="asansör_sayisi"
                    value={formik.values.asansör_sayisi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="kullanım_durumu" className="form-label">
                    {t("Kullanım Durumu")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="kullanım_durumu"
                      value={formik.values.kullanım_durumu}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="boş">{t("Boş")}</option>
                      <option value="kiracılı">{t("Kiracılı")}</option>
                      <option value="mülk_sahibi">{t("Mülk Sahibi")}</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="tapu_durumu" className="form-label">
                    {t("Tapu Durumu")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="tapu_durumu"
                      value={formik.values.tapu_durumu}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="kat_irtifakı">{t("Kat İrtifakı")}</option>
                      <option value="kat_mülkiyeti">
                        {t("Kat Mülkiyeti")}
                      </option>
                      <option value="hisseli_tapu">{t("Hisseli Tapu")}</option>
                      <option value="arsa_tapulu">{t("Arsa Tapulu")}</option>
                      <option value="kooperatif_hisseli_tapu">
                        {t("Kooperatif Hisseli Tapu")}
                      </option>
                      <option value="yurt_dışı_tapulu">
                        {t("Yurt Dışı Tapulu")}
                      </option>
                      <option value="tapu_kaydı_yok">
                        {t("Tapu Kaydı Yok")}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="taşınmaz_numarası" className="form-label">
                    {t("Taşınmaz Numarası")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="taşınmaz_numarası"
                    placeholder={t("Taşınmaz Numarası")}
                    value={formik.values.taşınmaz_numarası}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="durumu" className="form-label">
                    {t("Durumu")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="durumu"
                      value={formik.values.durumu}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="sıfır">{t("Sıfır")}</option>
                      <option value="ikinci_el">{t("İkinci El")}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* konum */}
        <div className="card-item" id="propertyInformation">
          <div className="card common-card">
            <div className="card-header">
              <h6 className="title mb-0">{t("Konum Bilgileri")}</h6>
            </div>
            <div className="card-body">
              <div className="row gy-4">
                {/* il */}
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="İl" className="form-label">
                    {t("İl")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="İl"
                      value={selectedProvince}
                      onChange={(e) => (
                        handleProvinceChange(e), formik.handleChange(e)
                      )}
                    >
                      {türkiyeIlleri[0]?.map((il) => (
                        <option value={il.value} key={il.value}>
                          {il.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* içe */}
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="İlçe" className="form-label">
                    {t("İlçe")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="İlçe"
                      value={formik.values.İlçe}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="seç">seç</option>
                      {provinceData &&
                        provinceData?.map((ilce) => (
                          <option value={ilce.name} key={ilce.name}>
                            {ilce.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {/* mahalle */}
                <div className="col-sm-12 col-xs-12">
                  <label htmlFor="Mahalle" className="form-label">
                    {t("Mahalle")}
                  </label>
                  <input
                    className="common-input"
                    id="Mahalle"
                    placeholder={t("Mahalle")}
                    value={formik.values.Mahalle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-12">
                  {/* harita */}
                  <div className="col-sm-12">
                    <div className="map-wrapper">
                      <MyComponent
                        center={center}
                        setCenter={setCenter}
                        markerPosition={markerPosition}
                        setMarkerPosition={setMarkerPosition}
                        cityName={formik.values.İl}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* fotoğraf */}
        <div className="card-item" id="propertyGallery">
          <div className="card common-card">
            <div className="card-header">
              <h6 className="title mb-0">{t("Fotoğraflar")}</h6>
            </div>
            <div className="card-body">
              <div className="image-uploader">
                <label
                  htmlFor="ImageUploadLabel"
                  className="image-uploader__label"
                >
                  <span className="d-none">{t("Resim Yükle")}</span>
                </label>

                <input
                  type="file"
                  name="images[]"
                  className="image-uploader__input"
                  id="ImageUploadLabel"
                  multiple
                  onChange={handleImageChange}
                />
                {images.length > 0 ? (
                  <div className="uploaded-images d-flex flex-wrap gap-3">
                    {images.map((image, index) => (
                      <div className="uploaded-image" key={index}>
                        <button
                          type="button"
                          className="uploaded-image__remove"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <i className="fas fa-times"></i>
                        </button>

                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Image ${index}`}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="upload-text">
                    <span className="upload-text__icon">
                      <i className="fas fa-cloud-upload-alt"></i>
                    </span>
                    <span className="upload-text__text">
                      {t("Fotoğraf Yüklemek İçin Tıklayınız")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ek bilgiler */}
        <div className="card-item" id="propertyInformation">
          <div className="card common-card">
            <div className="card-header">
              <h6 className="title mb-0">{t("Ek Bilgiler")}</h6>
            </div>
            <div className="card-body">
              <div className="row gy-4">
                <div className="col-12">
                  <div className="row gy-3 checkboxes">
                    <div className="row gy-3 checkboxes">
                      <div className="col-md-4 col-sm-6 col-xs-6">
                        <div className="common-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="alkol_ruhsatı"
                            id="alkol_ruhsatı"
                            checked={formik.values.alkol_ruhsatı}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="alkol_ruhsatı"
                          >
                            {t("Alkol Ruhsatı")}
                          </label>
                        </div>
                        <div className="common-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="kiracılı"
                            id="kiracılı"
                            checked={formik.values.kiracılı}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="kiracılı"
                          >
                            {t("Kiracılı")}
                          </label>
                        </div>
                        <div className="common-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="krediye_uygunluk"
                            id="krediye_uygunluk"
                            luk
                            checked={formik.values.krediye_uygunluk}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="krediye_uygunluk"
                          >
                            {t("krediye Uygunluk")}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6">
                        <div className="common-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="zemin etüdü"
                            id="zemin_etüdü"
                            checked={formik.values.zemin_etüdü}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="zemin_etüdü"
                          >
                            {t("Zemin Etüdü")}
                          </label>
                        </div>
                        <div className="common-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="takaslı"
                            id="takaslı"
                            checked={formik.values.takaslı}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="form-check-label" htmlFor="takaslı">
                            {t("Takaslı")}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-main w-100">
          {t("Kaydet")}
        </button>
      </form>
    </>
  );
};

export default KonutListingForm;
