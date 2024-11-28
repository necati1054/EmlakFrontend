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

  // Remove Uploaded Image Code
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
      fiyat: "",
      imar_durumu: "ada",
      m2: "",
      ada_no: "",
      parsel_no: "",
      pafta_no: "",
      kaks: "",
      gabari: "",
      depozito: "",
      tapu_durumu: "hisseli_tapu",
      taşınmaz_numarası: "",
      İl: "",
      İlçe: "",
      Mahalle: "",
      lat: "",
      lng: "",
      takaslı: false,
      krediye_uygunluk: false,
    },
    onSubmit: (values) => {
      console.log("Form verileri:", values);
      console.log("Resimler:", images);
      console.log("id:", JSON.parse(localStorage.getItem("user")).id);

      const formData = new FormData();
      formData.append("ilan_basligi", values.ilan_basligi);
      formData.append("aciklama", values.açıklama);
      formData.append("teklif_tipi", values.teklif_tipi);
      formData.append("fiyat", values.fiyat);
      formData.append("imar_durumu", values.imar_durumu);
      formData.append("m2", values.m2);
      formData.append("ada_no", values.ada_no);
      formData.append("parsel_no", values.parsel_no);
      formData.append("pafta_no", values.pafta_no);
      formData.append("kaks", values.kaks);
      formData.append("gabari", values.gabari);
      formData.append("depozito", values.depozito);
      formData.append("tapu_durumu", values.tapu_durumu);
      formData.append("tasınmaz_numarasi", values.taşınmaz_numarası);
      formData.append("Il", values.İl);
      formData.append("Ilce", values.İlçe);
      formData.append("Mahalle", values.Mahalle);
      formData.append("lat", values.lat);
      formData.append("lng", values.lng);
      formData.append("krediye_uygunluk", values.krediye_uygunluk);
      formData.append("takasli", values.takaslı);
      formData.append("user_id", JSON.parse(localStorage.getItem("user")).id);

      images.forEach((image) => {
        formData.append("images[]", image);
      });

      axios
        .post("/arsa", formData, {
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
                  <label htmlFor="imar_durumu" className="form-label">
                    {t("İmar Durumu")}
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="imar_durumu"
                      value={formik.values.imar_durumu}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="ada">{t("Ada")}</option>
                      <option value="a-Lejantlı">{t("A-Lejantlı")}</option>
                      <option value="arazi">{t("Arazi")}</option>
                      <option value="bahçe">{t("Bahçe")}</option>
                      <option value="depo">{"Depo"}</option>
                      <option value="eğitim">{t("Eğitim")}</option>
                      <option value="enerji_depolama">
                        {t("Enerji Depolama")}
                      </option>
                      <option value="konut">{t("Konut")}</option>
                      <option value="muhtelif">{t("Muhtelif")}</option>
                      <option value="özel_kullanım">
                        {t("Özel kullanım")}
                      </option>
                      <option value="sağlık">{t("Sağlık")}</option>
                      <option value="sanayi">{t("Sanayi")}</option>
                      <option value="sera">{t("Sera")}</option>
                      <option value="sit_alanı">{t("Sit Alanı")}</option>
                      <option value="spor_alanı">{t("Spor Alanı")}</option>
                      <option value="tarla">{t("Tarla")}</option>
                      <option value="ticari">{t("Ticari")}</option>
                      <option value="toplu_konut">{t("Toplu Konut")}</option>
                      <option value="turizm">{t("Turizm")}</option>
                      <option value="villa">{t("Villa")}</option>
                      <option value="zeytinlik">{t("Zeytinlik")}</option>
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
                  <label htmlFor="ada_no" className="form-label">
                    {t("Ada No")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="ada_no"
                    placeholder={t("Ada No")}
                    value={formik.values.ada_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="parsel_no" className="form-label">
                    {t("Parsel No")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="parsel_no"
                    placeholder={t("Parsel No")}
                    value={formik.values.parsel_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="pafta_no" className="form-label">
                    {t("Pafta No")}
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="pafta_no"
                    name="pafta_no"
                    placeholder={t("Pafta No")}
                    value={formik.values.pafta_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="kaks" className="form-label">
                    {t("Kaks")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="kaks"
                    placeholder={t("Kaks")}
                    value={formik.values.kaks}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="gabari" className="form-label">
                    {t("Gabari")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="gabari"
                    placeholder={t("Gabari")}
                    value={formik.values.gabari}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="depozito" className="form-label">
                    {t("Depozito")}
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="depozito"
                    placeholder={t("Depozito")}
                    value={formik.values.depozito}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
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
                      <option value="hisseli_tapu">{t("Hisseli Tapu")}</option>
                      <option value="müstakil_tapulu">
                        {t("Müstakil Tapulu")}
                      </option>
                      <option value="tahsis_tapu">{t("Tahsis Tapu")}</option>
                      <option value="zilliyet_tapu">
                        {t("Zilliyet Tapu")}
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
                    type="text"
                    className="common-input"
                    id="taşınmaz_numarası"
                    name="taşınmaz_numarası"
                    placeholder={t("Taşınmaz Numarası")}
                    value={formik.values.taşınmaz_numarası}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
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
                            value="krediye uygun"
                            id="krediye_uygunluk"
                            checked={formik.values.krediye_uygunluk}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="krediye_uygunluk"
                          >
                            {t("Krediye Uygunluk")}
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
