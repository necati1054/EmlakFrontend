import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import { türkiyeIlleri } from "../data/OthersPageData/OthersPageData";
import axios from "../axios.js";

const konut_taşınmaz_türü = [
  { id: 1, text: "daire" },
  { id: 2, text: "rezidans" },
  { id: 3, text: "müstakil_ev" },
  { id: 4, text: "villa" },
  { id: 5, text: "çiftlik_evi" },
  { id: 6, text: "köşk_konak" },
  { id: 7, text: "yalı" },
  { id: 8, text: "yalı_dairesi" },
  { id: 9, text: "yazlık" },
  { id: 10, text: "kooperatif" },
];

const işyeri_taşınmaz_türü = [
  { id: 1, text: "atölye" },
  { id: 2, text: "avm" },
  { id: 3, text: "büfe" },
  { id: 4, text: "ofis" },
  { id: 5, text: "kafe" },
  { id: 6, text: "çiftlik" },
  { id: 7, text: "depo" },
  { id: 8, text: "dükkan" },
  { id: 9, text: "kıraathane" },
  { id: 10, text: "kumarhane" },
];

const arsa_taşınmaz_türü = [
  { id: 1, text: "ada" },
  { id: 2, text: "a-Lejantlı" },
  { id: 3, text: "arazi" },
  { id: 4, text: "bahçe" },
  { id: 5, text: "depo" },
  { id: 6, text: "eğitim" },
  { id: 7, text: "enerji_depolama" },
  { id: 8, text: "konut" },
  { id: 9, text: "muhtelif" },
  { id: 10, text: "özel_kullanım" },
  { id: 11, text: "sağlık" },
  { id: 12, text: "sanayi" },
  { id: 13, text: "sera" },
  { id: 14, text: "sit_alanı" },
  { id: 15, text: "spor_alanı" },
  { id: 16, text: "tarla" },
  { id: 17, text: "ticari" },
  { id: 18, text: "toplu_konut" },
  { id: 19, text: "turizm" },
  { id: 20, text: "villa" },
  { id: 21, text: "zeytinlik" },
];

const Filter = (props) => {
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
    validationSchema: yup.object({
      ilan_basligi: yup
        .string()
        .min(3, "Minimum 3 karakter girmelisiniz")
        .required("Arama kelimesi girmelisiniz"),
    }),

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

      navigate("/property/" + `${props.buttonText}` + "?" + queryString);

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
                placeholder="Kelime veya cümle giriniz"
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
                    <option
                      value={il.value}
                      key={il.value}
                      disabled={il.value == "seç" ? true : false}
                      defaultValue={il.value == "seç" ? true : false}
                    >
                      {il.text}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={props.colClass}>
              <button type="submit" className="btn btn-main w-100">
                Ara
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Filter;
