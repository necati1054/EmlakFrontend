import React from "react";
import SidebarCategoryList from "./SidebarCategoryList";
import SidebarRecentPost from "./SidebarRecentPost";
import SidebarProperty from "./SidebarProperty";
import { sidebarTags } from "../data/OthersPageData/OthersPageData";
import { Link } from "react-router-dom";

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
  return (
    <>
      <div className="common-sidebar">
        <h6 className="common-sidebar__title"> Satıcı Bilgileri </h6>
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
                İsim Soyisim:
              </span>
              <span style={{ color: "#333", marginLeft: "5px" }}>
                {user?.name} {user?.surname}
              </span>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <span style={{ fontWeight: "bold", color: "#555" }}>
                Telefon Numarası:
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
          <h6 className="property-details-item__title">Bilgiler</h6>
          <div className="property-details-item__content">
            <div className="row gy-4 gy-lg-5">
              {/* start */}
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">Teklif Tipi</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.teklif_tipi}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">İlan Tarihi</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {formatDateToDayMonthYear(PropertiesData?.created_at)}
                    </h6>
                  </div>
                </div>
              </div>
              {/* end */}
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">imar durumu</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.imar_durumu}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">fiyat</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {formatCurrency(PropertiesData?.fiyat)}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">m2</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.m2}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">ada no</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.ada_no}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">Parsel No</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.parsel_no}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">Pafta No</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.pafta_no}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">Kaks</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.kaks}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">gabari</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.gabari}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">depozito</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {formatCurrency(
                        PropertiesData?.depozito ? PropertiesData?.depozito : 0
                      )}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">tapu durumu</span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.tapu_durumu}
                    </h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-6">
                <div className="amenities-content d-flex align-items-center">
                  <div className="amenities-content__inner">
                    <span className="amenities-content__text">
                      taşınmaz numarası
                    </span>
                    <h6 className="amenities-content__title mb-0 font-16">
                      {PropertiesData?.taşınmaz_numarası}
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
