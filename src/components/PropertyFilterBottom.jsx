import React, { useContext } from "react";
import ListGridButtons from "../common/ListGridButtons";
import { PropertyFilterContext } from "../contextApi/PropertyFilterContext";
import { useTranslation } from "react-i18next";

const PropertyFilterBottom = () => {
  const { selectedSort, handleSortChange } = useContext(PropertyFilterContext);
  const { t } = useTranslation();

  return (
    <>
      <div className="property-filter__bottom flx-between gap-2">
        <span className="property-filter__text font-18 text-gray-800"></span>
        <div className="d-flex align-items-center gap-2">
          {/* List Grid Layout buttons */}
          <ListGridButtons />

          <div className="d-flex align-items-center gap-2">
            <span className="property-filter__text font-18 text-gray-800">
              {" "}
              {t("Sıralama")}:{" "}
            </span>
            <div className="select-has-icon data-sort">
              <select
                className="form-select common-input pill text-gray-800 px-3 py-2"
                onChange={handleSortChange}
                value={selectedSort}
              >
                <option value="Hepsi">{t("Hepsi")}</option>
                <option value="Newest">Newest</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Best Match">Best Match</option>
                <option value="High Price">High Price</option>
                <option value="Medium Price">Medium Price</option>
                <option value="Low Price">Low Price</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyFilterBottom;
