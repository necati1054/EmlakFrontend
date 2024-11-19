import React, { useCallback, useEffect, useRef, useState } from "react";
import { türkiyeIlleri } from "../data/OthersPageData/OthersPageData";
import { useFormik } from "formik";
import * as Yup from "yup";
import MyComponent from "./GoogleMaps";
import axios from "../axios.js";

const defaultCenter = {
  lat: 39.9334, // Başlangıç enlem (Eğer izin verilmezse kullanılacak)
  lng: 32.8597, // Başlangıç boylam (Eğer izin verilmezse kullanılacak)
};

const KonutListingForm = () => {
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
      m2_brüt: "",
      m2_net: "",
      açık_alan_m2: "",
      arazi_m2: "",
      oda_sayisi: "",
      salon_sayisi: "",
      bina_yaşı: "",
      kat_sayisi: "",
      bulunduğu_kat: "",
      ısıtma: "yok",
      yapı_tipi: "betonarme",
      banyo_sayisi: "",
      yapının_durumu: "sıfır",
      kullanım_durumu: "boş",
      aidat: "",
      tapu_durumu: "kat_irtifakı",
      taşınmaz_numarası: "",
      İl: "",
      İlçe: "",
      Mahalle: "",
      lat: "",
      lng: "",
      balkon: false,
      asansör: false,
      otopark: false,
      eşyalı: false,
      krediye_uygun: false,
      zemin_etüdü: false,
      takaslı: false,
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
      formData.append("m2_brut", values.m2_brüt);
      formData.append("m2_net", values.m2_net);
      formData.append("acik_alan_m2", values.açık_alan_m2);
      formData.append("arazi_m2", values.arazi_m2);
      formData.append("oda_sayisi", values.oda_sayisi);
      formData.append("salon_sayisi", values.salon_sayisi);
      formData.append("bina_yasi", values.bina_yaşı);
      formData.append("kat_sayisi", values.kat_sayisi);
      formData.append("bulundugu_kat", values.bulunduğu_kat);
      formData.append("isitma", values.ısıtma);
      formData.append("yapi_tipi", values.yapı_tipi);
      formData.append("banyo_sayisi", values.banyo_sayisi);
      formData.append("yapinin_durumu", values.yapının_durumu);
      formData.append("kullanim_durumu", values.kullanım_durumu);
      formData.append("aidat", values.aidat);
      formData.append("tapu_durumu", values.tapu_durumu);
      formData.append("tasinmaz_numarasi", values.taşınmaz_numarası);
      formData.append("Il", values.İl);
      formData.append("Ilce", values.İlçe);
      formData.append("Mahalle", values.Mahalle);
      formData.append("lat", values.lat);
      formData.append("lng", values.lng);
      formData.append("balkon", values.balkon);
      formData.append("asansor", values.asansör);
      formData.append("otopark", values.otopark);
      formData.append("esyali", values.eşyalı);
      formData.append("krediye_uygun", values.krediye_uygun);
      formData.append("zemin_etudu", values.zemin_etüdü);
      formData.append("takasli", values.takaslı);
      formData.append("user_id", JSON.parse(localStorage.getItem("user")).id);

      images.forEach((image) => {
        formData.append("images[]", image);
      });

      axios
        .post("/konut", formData, {
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
              <h6 className="title mb-0">Bilgiler</h6>
            </div>
            <div className="card-body">
              <div className="row gy-4">
                <div className="col-sm-12">
                  <label htmlFor="ilan_basligi" className="form-label">
                    İlan Başlığı
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    id="ilan_basligi"
                    name="ilan_basligi"
                    placeholder="İlan Başlığı"
                    value={formik.values.ilan_basligi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="açıklama" className="form-label">
                    Açıklama
                  </label>
                  <textarea
                    className="common-input"
                    id="açıklama"
                    placeholder="Açıklama"
                    value={formik.values.açıklama}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="teklif_tipi" className="form-label">
                    Tekif Tipi
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="teklif_tipi"
                      value={formik.values.teklif_tipi}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="Satılık">Satılık</option>
                      <option value="Kiralık">Kiralık</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="taşınmaz_türü" className="form-label">
                    Taşınmaz Türü
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="taşınmaz_türü"
                      value={formik.values.taşınmaz_türü}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="daire">daire</option>
                      <option value="rezidans">rezidans</option>
                      <option value="müstakil_ev">müstakil_ev</option>
                      <option value="çiftlik_evi">çiftlik evi</option>
                      <option value="köşk_konak">köşk konak</option>
                      <option value="yalı">yalı</option>
                      <option value="yalı_dairesi">yalı dairesi</option>
                      <option value="yazlık">yazlık</option>
                      <option value="kooperatif">kooperatif</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="fiyat" className="form-label">
                    fiyat
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="fiyat"
                    placeholder="Fiyat"
                    value={formik.values.fiyat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="m2_brüt" className="form-label">
                    m2(brüt)
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="m2_brüt"
                    placeholder="m2(brüt)"
                    value={formik.values.m2_brüt}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="m2_net" className="form-label">
                    m2(net)
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="m2_net"
                    placeholder="m2(net)"
                    value={formik.values.m2_net}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="açık_alan_m2" className="form-label">
                    açık alan m2
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="açık_alan_m2"
                    placeholder="açık alan m2"
                    value={formik.values.açık_alan_m2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="arazi_m2" className="form-label">
                    arazi m2
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="arazi_m2"
                    placeholder="arazi m2"
                    value={formik.values.arazi_m2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="oda_sayisi" className="form-label">
                    oda sayisi
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="oda_sayisi"
                    placeholder="oda sayisi"
                    value={formik.values.oda_sayisi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="salon_sayisi" className="form-label">
                    salon sayisi
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="salon_sayisi"
                    placeholder="salon sayisi"
                    value={formik.values.salon_sayisi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="bina_yaşı" className="form-label">
                    bina yaşı
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="bina_yaşı"
                    placeholder="bina yaşı"
                    value={formik.values.bina_yaşı}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="kat_sayisi" className="form-label">
                    kat sayisi
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="kat_sayisi"
                    placeholder="kat sayisi"
                    value={formik.values.kat_sayisi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="bulunduğu_kat" className="form-label">
                    bulunduğu kat
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="bulunduğu_kat"
                    placeholder="bulunduğu kat"
                    value={formik.values.bulunduğu_kat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="ısıtma" className="form-label">
                    ısıtma
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="ısıtma"
                      value={formik.values.ısıtma}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="yok">yok</option>
                      <option value="soba">soba</option>
                      <option value="doğalgaz">doğalgaz</option>
                      <option value="yari_kagir">kat kaloriferi</option>
                      <option value="merkezi">merkezi</option>
                      <option value="merkezi_(Pay Ölçer)">
                        merkezi (Pay Ölçer)
                      </option>
                      <option value="kombi_(Doğalgaz)">kombi (Doğalgaz)</option>
                      <option value="kombi_(Elektrik)">kombi (Elektrik)</option>
                      <option value="yerden_ısıtma">yerden ısıtma</option>
                      <option value="klima">klima</option>
                      <option value="fancoil_ünitesi">fancoil ünitesi</option>
                      <option value="güneş_enerjisi">güneş_enerjisi</option>
                      <option value="elektrikli_radyatör">
                        elektrikli radyatör
                      </option>
                      <option value="jeotermal">jeotermal</option>
                      <option value="şömine">şömine</option>
                      <option value="VRV">VRV</option>
                      <option value="ısı_pompası">ısı pompası</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="yapı_tipi" className="form-label">
                    yapı tipi
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="yapıTipi"
                      value={formik.values.yapı_tipi}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="betonarme">betonarme</option>
                      <option value="çelik_konstrüksiyon">
                        çelik konstrüksiyon
                      </option>
                      <option value="ahşap">ahşap</option>
                      <option value="yari_kagir">yari kagir</option>
                      <option value="tam_kagir">tam kagir</option>
                      <option value="taş">taş</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="banyo_sayisi" className="form-label">
                    banyo sayisi
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="banyo_sayisi"
                    placeholder="banyo sayisi"
                    value={formik.values.banyo_sayisi}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="yapının_durumu" className="form-label">
                    yapının durumu
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="yapının_durumu"
                      value={formik.values.yapının_durumu}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="sıfır">sıfır</option>
                      <option value="ikinci_el">ikinci el</option>
                      <option value="inşaat_halinde">inşaat halinde</option>
                      <option value="tarihi_eser">tarihi eser</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="kullanım_durumu" className="form-label">
                    kullanım durumu
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="kullanım_durumu"
                      value={formik.values.kullanım_durumu}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="boş">boş</option>
                      <option value="kiracılı">kiracılı</option>
                      <option value="mülk_sahibi">mülk sahibi</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="aidat" className="form-label">
                    aidat
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="aidat"
                    placeholder="aidat"
                    value={formik.values.aidat}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="tapu_durumu" className="form-label">
                    tapu durumu
                  </label>
                  <div className="select-has-icon icon-black">
                    <select
                      className="select common-input"
                      id="tapu_durumu"
                      value={formik.values.tapu_durumu}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="kat_irtifakı">kat irtifakı</option>
                      <option value="kat_mülkiyeti">kat mülkiyeti</option>
                      <option value="hisseli_tapu">hisselitapu</option>
                      <option value="arsa_tapulu">arsa tapulu</option>
                      <option value="kooperatif_hisseli_tapu">
                        kooperatif hisseli tapu
                      </option>
                      <option value="yurt_dışı_tapulu">yurt dışı tapulu</option>
                      <option value="tapu_kaydı_yok">tapu kaydı yok</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="taşınmaz_numarası" className="form-label">
                    taşınmaz numarası
                  </label>
                  <input
                    type="number"
                    className="common-input"
                    id="taşınmaz_numarası"
                    placeholder="taşınmaz numarası"
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
              <h6 className="title mb-0">Konum Bilgileri</h6>
            </div>
            <div className="card-body">
              <div className="row gy-4">
                {/* il */}
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="İl" className="form-label">
                    İl
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
                    ilçe
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
                    Mahalle
                  </label>
                  <input
                    className="common-input"
                    id="Mahalle"
                    placeholder="Mahalle"
                    value={formik.values.Mahalle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {/* <div className="col-sm-6 col-xs-6">
                        <label htmlFor="lat" className="form-label">
                          lat
                        </label>
                        <input
                          type="number"
                          className="common-input"
                          id="lat"
                          placeholder="lat"
                          value={formik.values.lat}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div> */}
                {/* <div className="col-sm-6 col-xs-6">
                        <label htmlFor="lng" className="form-label">
                          lng
                        </label>
                        <input
                          type="number"
                          className="common-input"
                          id="lng"
                          placeholder="lng"
                          value={formik.values.lng}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div> */}
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
              <h6 className="title mb-0">Fotoğraflar</h6>
            </div>
            <div className="card-body">
              <div className="image-uploader">
                <label
                  htmlFor="ImageUploadLabel"
                  className="image-uploader__label"
                >
                  <span className="d-none">Resim Yükle</span>
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
                      Fotoğraf Yüklemek İçin Tıklayınız
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
              <h6 className="title mb-0">Ek Bilgiler</h6>
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
                            value="balkon"
                            id="balkon"
                            checked={formik.values.balkon}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="form-check-label" htmlFor="balkon">
                            balkon
                          </label>
                        </div>
                        <div className="common-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="asansör"
                            id="asansör"
                            checked={formik.values.asansör}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="form-check-label" htmlFor="asansör">
                            asansör
                          </label>
                        </div>
                        <div className="common-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="otopark"
                            id="otopark"
                            checked={formik.values.otopark}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="form-check-label" htmlFor="otopark">
                            otopark
                          </label>
                        </div>
                      </div>

                      <div className="col-md-4 col-sm-6 col-xs-6">
                        <div className="common-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="eşyalı"
                            id="eşyalı"
                            checked={formik.values.eşyalı}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="form-check-label" htmlFor="eşyalı">
                            eşyalı
                          </label>
                        </div>
                        <div className="common-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="krediye uygun"
                            id="krediye_uygun"
                            checked={formik.values.krediye_uygun}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="krediye_uygun"
                          >
                            krediye uygun
                          </label>
                        </div>
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
                            zemin etüdü
                          </label>
                        </div>
                      </div>

                      <div className="col-md-4 col-sm-6 col-xs-6">
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
                            takaslı
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
          Kaydet
        </button>
      </form>
    </>
  );
};

export default KonutListingForm;
