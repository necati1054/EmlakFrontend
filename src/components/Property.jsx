import React from "react";
import SectionHeading from "../common/SectionHeading";
import PropertyItem from "./items/PropertyItem";
import { useTranslation } from "react-i18next";

const Property = ({ title, propertyData, ilan_type }) => {
  const { t, i18n } = useTranslation();
  let lang = i18n.resolvedLanguage;
  return (
    <>
      {/* ============================ property Start ==================== */}
      <section className="property padding-y-120">
        <div className="container container-two">
          <SectionHeading
            headingClass="style-left style-dark flx-between align-items-end gap-3"
            subtitle={t("En Son Eklenenler")}
            subtitleClass=""
            title={title}
            renderDesc={false}
            desc=""
            renderButton={true}
            buttonLink={`/${lang}/property${
              ilan_type == 1 ? "/konut" : ilan_type == 2 ? "/isyeri" : "/arsa"
            }`}
            buttonClass="btn-main"
            buttonText={t("Bütün İlanları Gör")}
          />

          <div className="row gy-4 property-item-wrapper">
            {propertyData?.map((property, index) => {
              return (
                <div className="col-lg-4 col-sm-6" key={index}>
                  <PropertyItem
                    itemClass=""
                    btnClass=""
                    property={property}
                    badgeText={property?.teklif_tipi}
                    badgeClass="property-item__badge"
                    iconsClass=""
                    btnRenderBottom={false}
                    btnRenderRight={true}
                    ilan_type={ilan_type}
                  />
                </div>
              );
            })}
          </div>

          {/* <div className="text-center property__btn">
            <Button
              btnLink="/property"
              btnClass="btn-main"
              btnText="Bütün İlanları Gör"
              spanClass="icon-right"
              iconClass="fas fa-arrow-right"
            />
          </div> */}
        </div>
      </section>
      {/* ============================ property End ==================== */}
    </>
  );
};

export default Property;
