import React from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

const useQueryParams = () => {
  const location = useLocation();
  return React.useMemo(() => {
    // Sorgu parametrelerini nesneye dönüştürme
    const params = new URLSearchParams(location.search);
    const queryObject = {};
    params.forEach((value, key) => {
      queryObject[key] = value;
    });
    return queryObject;
  }, [location.search]);
};

const PropertyFilterForm = () => {
  const queryParams = useQueryParams();

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      dataStatus: queryParams?.dataStatus || "All",
      dataType: queryParams?.dataType || "All",
      dataLocation: queryParams?.dataLocation || "All",
    },
    validationSchema: yup.object({
      dataStatus: yup.string().required("Required"),
      dataType: yup.string().required("Required"),
      dataLocation: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <form action="#">
        <div className="row gy-4">
          <div className="col-lg-2 col-md-3 col-sm-6 col-xs-6">
            <div className="select-has-icon">
              <select
                className="form-select common-input common-input--withLeftIcon pill text-gray-800"
                // onChange={handleDataStatusChange}
                // value={dataStatus}
              >
                <option value="Status" disabled defaultValue>
                  {t("Durum")}
                </option>
                <option value="satılık">{t("Satılık")}</option>
                <option value="kiralık">{t("Kiralık")}</option>
              </select>
              <span className="input-icon input-icon--left text-gradient">
                <img src="assets/images/icons/status.svg" alt="" />
              </span>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <div className="select-has-icon">
              <select
                className="form-select common-input common-input--withLeftIcon pill text-gray-800"
                // onChange={handleDataTypeChange}
                // value={dataType}
              >
                <option value="Type" disabled defaultValue>
                  {t("Tür")}
                </option>
                <option value="Tür">{t("Tür")}</option>
                <option value="Houses">Houses</option>
                <option value="Apartments">Apartments</option>
                <option value="Office">Office</option>
                <option value="Villa">Villa</option>
              </select>
              <span className="input-icon input-icon--left text-gradient">
                <img src="assets/images/icons/type.svg" alt="" />
              </span>
            </div>
          </div>
          <div className="col-lg-4 col-md-3 col-sm-6 col-xs-6">
            <div className="select-has-icon">
              <select
                className="form-select common-input common-input--withLeftIcon pill text-gray-800"
                // onChange={handleDataLocationChange}
                // value={dataLocation}
              >
                <option value="Location" disabled defaultValue>
                  {t("Konum")}
                </option>
                <option value="All">{t("Konum")}</option>
                <option value="Bangladesh" data-location="Bangladesh">
                  Bangladesh
                </option>
                <option value="Japan" data-location="Japan">
                  Japan
                </option>
                <option value="Korea" data-location="Korea">
                  Korea
                </option>
                <option value="Singapore" data-location="Singapore">
                  Singapore
                </option>
                <option value="Germany" data-location="Germany">
                  Germany
                </option>
                <option value="Thailand" data-location="Thailand">
                  Thailand
                </option>
              </select>
              <span className="input-icon input-icon--left text-gradient">
                <img src="assets/images/icons/location.svg" alt="" />
              </span>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <div className="position-relative">
              <input
                type="text"
                className="common-input common-input--withLeftIcon pill text-gray-800"
                placeholder={t("Kelime veya cümle giriniz")}
              />
              <span className="input-icon input-icon--left text-gradient">
                <img src="assets/images/icons/filter.svg" alt="" />
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PropertyFilterForm;
