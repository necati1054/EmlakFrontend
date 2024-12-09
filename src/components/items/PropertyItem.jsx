import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PropertyFilterContext } from "../../contextApi/PropertyFilterContext";
import { slugURL } from "../../utility/Utility";
import Config from "../../../src/urlConf";
import { useTranslation } from "react-i18next";

const PropertyItem = ({
  property,
  itemClass,
  iconsClass,
  btnClass,
  badgeText,
  badgeClass,
  btnRenderBottom,
  btnRenderRight,
  ilan_type,
}) => {
  const {
    thumb,
    price,
    day,
    title,
    desc,
    locationIcon,
    location,
    amenities,
    btnText,
    dataSort,
    dataStatuses,
    dataTypes,
    dataLocations,
    // benimkiler
    first_photo,
    fiyat,
    ilan_basligi,
    İl,
    İlçe,
    Mahalle,
    oda_sayisi,
    salon_sayisi,
    banyo_sayisi,
    teklif_tipi,
    asansör_sayisi,
    id,
  } = property;

  const { t, i18n } = useTranslation();
  let lang = i18n.resolvedLanguage;

  // Details Slug
  const propertyURL = slugURL({
    url: `${lang}/property`,
    id: property.id,
    ilanType: ilan_type,
  });

  // For Random Badge
  const renderBadge = Math.random() < 0.5;

  // **************** Data Filter Search Code Start ****************
  const { selectedSort, dataStatus, dataType, dataLocation } = useContext(
    PropertyFilterContext
  );

  const shouldHideSort =
    selectedSort !== "All" && selectedSort !== property["dataSort"];
  const shouldHideStatus =
    dataStatus !== "All" && dataStatus !== property["dataStatuses"];
  const shouldHideType =
    dataType !== "All" && dataType !== property["dataTypes"];
  const shouldHideLocation =
    dataLocation !== "All" && dataLocation !== property["dataLocations"];

  if (
    shouldHideSort ||
    shouldHideStatus ||
    shouldHideType ||
    shouldHideLocation
  ) {
    itemClass += " d-none";
  }
  // **************** Data Filter Search Code End ****************

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
      <div
        className={`property-item ${itemClass}`}
        datastatus={dataStatuses}
        datatype={dataTypes}
        datalocation={dataLocations}
        datasort={dataSort}
        style={{
          backgroundColor: "#322d2df0",
          height: "522px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
        }}
      >
        <div className="property-item__thumb">
          <Link to={propertyURL} state={{ teklif_tipi, id }} className="link">
            <img
              src={
                first_photo?.path
                  ? `${Config.BASE_URL}/Image/${first_photo?.path}`
                  : `${Config.BASE_URL}/Image/no-image.png`
              }
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="cover-img"
            />
          </Link>
          {renderBadge && <span className={badgeClass}>{badgeText}</span>}
        </div>
        <div
          className="property-item__content"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        >
          <h6 className="property-item__price">
            {formatCurrency(fiyat)}{" "}
            {teklif_tipi == "kiralık" && (
              <span className="day">{t("Aylık")}</span>
            )}
          </h6>
          <h6 className="property-item__title">
            <Link
              to={propertyURL}
              // state={{ thumb, title, desc, price }}
              className="link"
              style={{
                minHeight: "50px",
                overflow: "hidden",
                objectFit: "cover",
              }}
            >
              {ilan_basligi}
            </Link>
          </h6>
          <p
            className="property-item__location d-flex gap-2"
            style={{ minHeight: "20px" }}
          >
            <span className={`icon ${iconsClass}`}>
              <i className="fas fa-map-marker-alt"></i>
            </span>
            {İl}, {İlçe}, {Mahalle}
          </p>
          <div className="property-item__bottom flx-between gap-2">
            <ul className="amenities-list flx-align">
              {oda_sayisi && (
                <li className="amenities-list__item flx-align">
                  <img
                    src={`${Config.BASE_URL}/Image/room.png`}
                    width="30px"
                    height="20px"
                    style={{ marginBottom: "5px" }}
                    alt=""
                  />
                  <span className="text">{oda_sayisi}</span>
                </li>
              )}
              {salon_sayisi && (
                <li className="amenities-list__item flx-align">
                  <img
                    src={`${Config.BASE_URL}/Image/lounge.png`}
                    width="30px"
                    height="20px"
                    se
                    alt=""
                  />
                  <span className="text">{salon_sayisi}</span>
                </li>
              )}
              {asansör_sayisi && (
                <li className="amenities-list__item flx-align">
                  <span className={`icon ${iconsClass}`}>
                    <img
                      src={`${Config.BASE_URL}/Image/elevator.png`}
                      width="30px"
                      height="20px"
                      se
                      alt=""
                    />
                  </span>
                  <span className="text">{asansör_sayisi}</span>
                </li>
              )}
              {banyo_sayisi && (
                <li className="amenities-list__item flx-align">
                  <span className={`icon ${iconsClass}`}>
                    <i className="fas fa-bath"></i>
                  </span>
                  <span className="text">{banyo_sayisi}</span>
                </li>
              )}
            </ul>
            {btnRenderRight && (
              <Link
                to={propertyURL}
                state={{ thumb, title, desc, price }}
                className={`simple-btn ${btnClass}`}
              >
                {t("İlanı Gör")}
                <span className="icon-right">
                  {" "}
                  <i className="fas fa-arrow-right"></i>{" "}
                </span>
              </Link>
            )}
          </div>

          {btnRenderBottom && (
            <Link
              to={propertyURL}
              state={{ thumb, title, desc, price }}
              className={`simple-btn ${btnClass}`}
            >
              {t("İlanı Gör")}
              <span className="icon-right">
                {" "}
                <i className="fas fa-arrow-right"></i>{" "}
              </span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyItem;
