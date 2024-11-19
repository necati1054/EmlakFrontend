import React from "react";

import CommonSidebar from "../common/CommonSidebarIsyeri";
import HouseLocationMap from "./HouseLocationMap";

import Config from "../urlConf.js";

const PropertyDetailsSection = ({ PropertiesData }) => {
  return (
    <>
      {/* ============================ Property Details Section Start =============== */}
      <section className="property-details padding-y-120">
        <div className="container container-two">
          <div className="row gy-4">
            <div className="col-lg-8">
              <div className="property-details__thumb">
                <img
                  alt="Image"
                  className="cover-img"
                  src={
                    PropertiesData?.photos[0]?.path
                      ? `${Config.BASE_URL}/Image/${PropertiesData?.photos[0]?.path}`
                      : `${Config.BASE_URL}/Image/no-image.png`
                  }
                />
              </div>

              <h3 className="property-details__title mt-lg-5 mb-4">
                {PropertiesData?.ilan_basligi}
              </h3>
              <p className="property-details__desc mb-3">
                {PropertiesData?.açıklama?.slice(0, 178)}
              </p>
              <p className="property-details__desc">
                {PropertiesData?.açıklama?.slice(179, 400)}
              </p>

              <div className="property-details-wrapper">
                <div className="property-details-item">
                  <h6 className="property-details-item__title">Ek Bilgiler</h6>
                  <div className="property-details-item__content">
                    <div className="row gy-4 gy-lg-5">
                      {/* start */}
                      <div className="col-sm-4 col-6">
                        <div className="amenities-content d-flex align-items-center">
                          <div className="amenities-content__inner">
                            <span className="amenities-content__text">
                              Alkol Ruhsatı
                            </span>
                            <h6 className="amenities-content__title mb-0 font-16">
                              {PropertiesData?.alkol_ruhsatı == 1
                                ? "var"
                                : "yok"}
                            </h6>
                          </div>
                        </div>
                      </div>
                      {/* end */}
                      <div className="col-sm-4 col-6">
                        <div className="amenities-content d-flex align-items-center">
                          <div className="amenities-content__inner">
                            <span className="amenities-content__text">
                              Kiracılı
                            </span>
                            <h6 className="amenities-content__title mb-0 font-16">
                              {PropertiesData?.kiracılı == 1 ? "var" : "yok"}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 col-6">
                        <div className="amenities-content d-flex align-items-center">
                          <div className="amenities-content__inner">
                            <span className="amenities-content__text">
                              krediye Uygunluk
                            </span>
                            <h6 className="amenities-content__title mb-0 font-16">
                              {PropertiesData?.krediye_uygunluk == 1
                                ? "var"
                                : "yok"}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 col-6">
                        <div className="amenities-content d-flex align-items-center">
                          <div className="amenities-content__inner">
                            <span className="amenities-content__text">
                              zemin etüdü
                            </span>
                            <h6 className="amenities-content__title mb-0 font-16">
                              {PropertiesData?.zemin_etüdü == 1 ? "var" : "yok"}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-4 col-6">
                        <div className="amenities-content d-flex align-items-center">
                          <div className="amenities-content__inner">
                            <span className="amenities-content__text">
                              takaslı
                            </span>
                            <h6 className="amenities-content__title mb-0 font-16">
                              {PropertiesData?.takaslı == 1 ? "var" : "yok"}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="property-details-item">
                  <h6 className="property-details-item__title">Address</h6>
                  <div className="property-details-item__content">
                    <div className="row gy-4">
                      <div className="col-6">
                        <div className="address-content d-flex gap-4 align-items-center">
                          <h6 className="address-content__title font-15 mb-0">
                            {PropertiesData?.İl} {PropertiesData?.İlçe}{" "}
                            {PropertiesData?.Mahalle}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="address-map">
                      <HouseLocationMap
                        lat={parseFloat(PropertiesData?.lat)}
                        lng={parseFloat(PropertiesData?.lng)}
                      />
                    </div>
                  </div>
                </div>

                <div className="property-details-item">
                  <h6 className="property-details-item__title">Fotoğraflar</h6>
                  <div className="property-details-item__content">
                    <div className="row gy-4">
                      {PropertiesData?.photos?.map(
                        (sidebarProperty, sidebarPropertyIndex) => {
                          return (
                            <div
                              className="col-lg-6 col-sm-4 col-6"
                              key={sidebarPropertyIndex}
                            >
                              <img
                                alt="Property Image"
                                className="cover-img"
                                src={`${Config.BASE_URL}/Image/${sidebarProperty?.path}`}
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <CommonSidebar
                user={PropertiesData?.ilan?.user}
                PropertiesData={PropertiesData}
              />
            </div>
          </div>
        </div>
      </section>
      {/* ============================ Property Details Section End =============== */}
    </>
  );
};

export default PropertyDetailsSection;
