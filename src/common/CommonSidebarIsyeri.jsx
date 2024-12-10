import React from "react";
import { useTranslation } from "react-i18next";

const CommonSidebar = ({ user, PropertiesData }) => {
  function formatDateToDayMonthYear(dateString) {
    const dateObj = new Date(dateString);

    // Gün, Ay, Yıl alımı
    const day = String(dateObj.getDate()).padStart(2, "0"); // Gün: 2 haneli olacak
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Ay: 2 haneli olacak, +1 çünkü getMonth() 0'dan başlar
    const year = dateObj.getFullYear(); // Yıl: 4 haneli

    // "gün-ay-yıl" formatında döndür
    return `${day}-${month}-${year}`;
  }

  function formatCurrency(amount) {
    // String'i sayıya çevirme
    const numericAmount = parseFloat(amount);

    // Sayıyı para birimi formatında döndürme
    return numericAmount.toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
    });
  }

  const { t } = useTranslation();

  const formatString = (inputString) => {
    return inputString
      .toLowerCase() // Tüm harfleri küçük harfe çevir
      .replace(/_/g, " "); // Tüm "_" karakterlerini boşluk ile değiştir
  };
  return (
    <>
      <div className="common-sidebar">
        <h6 className="common-sidebar__title"> {t("Satıcı Bilgileri")} </h6>
        <div
          style={{
            maxWidth: "400px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={{ marginBottom: "15px" }}>
              <span style={{ fontWeight: "bold", color: "#555" }}>
                {t("İsim Soyisim")}:
              </span>
              <span style={{ color: "#333", marginLeft: "5px" }}>
                {user?.name} {user?.surname}
              </span>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <span style={{ fontWeight: "bold", color: "#555" }}>
                {t("Telefon Numarası")}:
              </span>
              <span style={{ color: "#333", marginLeft: "5px" }}>
                {user?.phone_number}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="property-details-wrapper">
        <div className="property-details-item">
          <h6 className="property-details-item__title">{t("Bilgiler")}</h6>
          <div className="property-details-item__content">
            <div className="row gy-4 gy-lg-5">
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Teklif Tipi")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.teklif_tipi}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("İlan Tarihi")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {formatDateToDayMonthYear(PropertiesData?.created_at)}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Taşınmaz Türü")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {formatString(
                        PropertiesData?.taşınmaz_türü
                          ? PropertiesData?.taşınmaz_türü
                          : ""
                      )}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Fiyat")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {formatCurrency(PropertiesData?.fiyat)}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">{t("M2")}</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.m2}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Bölüm Oda Sayısı")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.bölüm_oda_sayisi}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Açık Alan M2")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.açık_alan_m2}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Giriş Yüksekliği")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.giriş_yüksekliği}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Kapalı Alan M2")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.kapalı_alan_m2}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Oda Sayısı")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.oda_sayisi}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Yapı Tipi")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {formatString(
                        PropertiesData?.yapı_tipi
                          ? PropertiesData?.yapı_tipi
                          : ""
                      )}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Yapı Durumu")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.yapı_durumu}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Kat Sayısı")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.kat_sayisi}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Bina Yaşı")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.bina_yaşı}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Aidat")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {formatCurrency(PropertiesData?.aidat)}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Isıtma")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {formatString(
                        PropertiesData?.ısıtma ? PropertiesData?.ısıtma : ""
                      )}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Yapının Durumu")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.yapının_durumu}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Bulunduğu Kat")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.bulunduğu_kat}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Asansör Sayısı")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.asansör_sayisi}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Kullanım Durumu")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.kullanım_durumu}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Tapu Durumu")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {formatString(
                        PropertiesData?.tapu_durumu
                          ? PropertiesData?.tapu_durumu
                          : ""
                      )}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Taşınmaz Numarası")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.taşınmaz_numarası}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      {t("Durumu")}
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.durumu}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonSidebar;
