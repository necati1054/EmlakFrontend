import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { türkiyeIlleri } from "../data/OthersPageData/OthersPageData";
import { useTranslation } from "react-i18next";

const konut_taşınmaz_türü = [
  { id: 1, text: "Daire" },
  { id: 2, text: "Rezidans" },
  { id: 3, text: "Müstakil Ev" },
  { id: 4, text: "Villa" },
  { id: 5, text: "Çiftlik Evi" },
  { id: 6, text: "Köşk Konak" },
  { id: 7, text: "Yalı" },
  { id: 8, text: "Yalı Dairesi" },
  { id: 9, text: "Yazlık" },
  { id: 10, text: "Kooperatif" },
];

const işyeri_taşınmaz_türü = [
  { id: 1, text: "Atölye" },
  { id: 2, text: "AVM" },
  { id: 3, text: "Büfe" },
  { id: 4, text: "Ofis" },
  { id: 5, text: "Kafe" },
  { id: 6, text: "Çiftlik" },
  { id: 7, text: "Depo" },
  { id: 8, text: "Dükkan" },
  { id: 9, text: "Kıraathane" },
  { id: 10, text: "Kumarhane" },
];

const arsa_taşınmaz_türü = [
  { id: 1, text: "Ada" },
  { id: 2, text: "A-Lejantlı" },
  { id: 3, text: "Arazi" },
  { id: 4, text: "Bahçe" },
  { id: 5, text: "Depo" },
  { id: 6, text: "Eğitim" },
  { id: 7, text: "Enerji Depolama" },
  { id: 8, text: "Konut" },
  { id: 9, text: "Muhtelif" },
  { id: 10, text: "Özel Kullanım" },
  { id: 11, text: "Sağlık" },
  { id: 12, text: "Sanayi" },
  { id: 13, text: "Sera" },
  { id: 14, text: "Sit Alanı" },
  { id: 15, text: "Spor Alanı" },
  { id: 16, text: "Tarla" },
  { id: 17, text: "Ticari" },
  { id: 18, text: "Toplu Konut" },
  { id: 19, text: "Turizm" },
  { id: 20, text: "Villa" },
  { id: 21, text: "Zeytinlik" },
];

const Filter = (props) => {
  const { t, i18n } = useTranslation();
  let lang = i18n.resolvedLanguage;
  const navigate = useNavigate();

  // Input Field Validation Start
  const formik = useFormik({
    initialValues: {
      ilan_basligi: "",
      taşınmaz_türü: "",
      imar_durumu: "",
      il: "",
    },
    // Validate by Yup
    // validationSchema: yup.object({
    //   ilan_basligi: yup
    //     .string()
    //     .min(3, t("Minimum 3 karakter girmelisiniz"))
    //     .required(t("Arama kelimesi girmelisiniz")),
    // }),

    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      // resetForm({ values: "" });
      // toast.success("Congratulations! You Have Searched Successfully.", {
      //   theme: "colored",
      // });

      const dataToSend = {
        ...values,
        ilan_type: props.FilterTabId,
      };

      const searchValues = Object.fromEntries(
        Object.entries({
          ...dataToSend,
          ilan_type: props.FilterTabId,
        }).filter(([key, value]) => value !== "" && value !== null) // Boş veya null olanları çıkar
      );

      console.log("Search Values: ", searchValues);

      const queryString = new URLSearchParams(searchValues).toString();

      // console.log("/property/" + `${props.buttonText}` + "?" + queryString);

      navigate(
        "/" + lang + "/property/" + `${props.buttonText}` + "?" + queryString
      );

      // Navigate To Property Page

      //   console.log("Search Keyword: ", values);
    },
  });

  const renderNameError = formik.touched.ilan_basligi &&
    formik.errors.ilan_basligi && (
      <span className="text-danger">{formik.errors.ilan_basligi}</span>
    );
  // Input Field Validation End

  return (
    <>
      <ToastContainer />
      <div className="filter">
        <form action="#" onSubmit={formik.handleSubmit}>
          <div className="row gy-sm-4 gy-3">
            <div className={props.colClass}>
              <input
                type="text"
                placeholder={t("Kelime veya cümle giriniz")}
                name="ilan_basligi"
                id="ilan_basligi"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ilan_basligi}
                className={`common-input ${
                  formik.touched.name && formik.errors.name ? "is-invalid" : ""
                }`}
              />
              {renderNameError}
            </div>
            {props.FilterTabId != 3 && (
              <div className={props.colClass}>
                <div className="select-has-icon icon-black">
                  <select
                    className="select common-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.taşınmaz_türü}
                    id="taşınmaz_türü"
                  >
                    {props.FilterTabId == 1
                      ? konut_taşınmaz_türü.map((tür) => (
                          <option value={tür.text} key={tür.text}>
                            {tür.text}
                          </option>
                        ))
                      : props.FilterTabId == 2
                      ? işyeri_taşınmaz_türü.map((tür) => (
                          <option value={tür.text} key={tür.text}>
                            {tür.text}
                          </option>
                        ))
                      : ""}
                  </select>
                </div>
              </div>
            )}
            {props.FilterTabId == 3 && (
              <div className={props.colClass}>
                <div className="select-has-icon icon-black">
                  <select
                    className="select common-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.imar_durumu}
                    id="imar_durumu"
                  >
                    {props.FilterTabId == 3 &&
                      arsa_taşınmaz_türü.map((tür) => (
                        <option value={tür.text} key={tür.text}>
                          {tür.text}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            )}
            <div className={props.colClass}>
              <div className="select-has-icon icon-black">
                <select
                  className="select common-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.il}
                  id="il"
                >
                  {türkiyeIlleri[0]?.map((il) => (
                    <option value={il.value} key={il.value}>
                      {il.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={props.colClass}>
              <button type="submit" className="btn btn-main w-100">
                {t("Ara")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Filter;
