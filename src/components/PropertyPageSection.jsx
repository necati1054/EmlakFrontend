import React from "react";
import PropertyItemv2 from "./items/PropertyItemv2";
import PropertyFilterBottom from "./PropertyFilterBottom";
import PropertyFilterForm from "./PropertyFilterForm";
import { useTranslation } from "react-i18next";

const PropertyPageSection = ({ propertiesData, ilan_type }) => {
  const { t } = useTranslation();
  return (
    <>
      <section className="property bg-gray-100 padding-y-120">
        <div className="container container-two">
          {/* Property Filter */}
          <div className="property-filter">
            <PropertyFilterForm />
            <PropertyFilterBottom />
          </div>
          <div className="list-grid-item-wrapper property-item-wrapper show-two-item row gy-4">
            {propertiesData.map((property, index) => {
              return (
                <div className="col-lg-4 col-sm-6" key={index}>
                  <PropertyItemv2
                    itemClass="property-item style-two style-shaped"
                    btnClass="text-gradient fw-semibold"
                    property={property}
                    badgeText={property?.teklif_tipi}
                    badgeClass="property-item__badge"
                    iconsClass="text-gradient"
                    btnRenderBottom={false}
                    btnRenderRight={true}
                    ilan_type={ilan_type}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPageSection;
