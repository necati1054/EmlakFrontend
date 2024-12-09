import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../axios.js";
import { useTranslation } from "react-i18next";

const FaqSettings = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const { t } = useTranslation();

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    } else {
      if (!userData) {
        navigate("/login");
      }
    }
  }, [navigate]);

  const getData = () => {
    axios
      .get("/faq")
      .then((res) => {
        formik.setValues({
          faq1id: 1,
          faq1Question: res.data.filter((a) => a.id == 1)[0]?.question || "",
          faq1Answer: res.data.filter((a) => a.id == 1)[0]?.answer || "",

          faq2id: 2,
          faq2Question: res.data.filter((a) => a.id == 2)[0]?.question || "",
          faq2Answer: res.data.filter((a) => a.id == 2)[0]?.answer || "",

          faq3id: 3,
          faq3Question: res.data.filter((a) => a.id == 3)[0]?.question || "",
          faq3Answer: res.data.filter((a) => a.id == 3)[0]?.answer || "",

          faq4id: 4,
          faq4Question: res.data.filter((a) => a.id == 4)[0]?.question || "",
          faq4Answer: res.data.filter((a) => a.id == 4)[0]?.answer || "",

          faq5id: 5,
          faq5Question: res.data.filter((a) => a.id == 5)[0]?.question || "",
          faq5Answer: res.data.filter((a) => a.id == 5)[0]?.answer || "",

          faq6id: 6,
          faq6Question: res.data.filter((a) => a.id == 6)[0]?.question || "",
          faq6Answer: res.data.filter((a) => a.id == 6)[0]?.answer || "",
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      faq1id: 1,
      faq1Question: "",
      faq1Answer: "",

      faq2id: 2,
      faq2Question: "",
      faq2Answer: "",

      faq3id: 3,
      faq3Question: "",
      faq3Answer: "",

      faq4id: 4,
      faq4Question: "",
      faq4Answer: "",

      faq5id: 5,
      faq5Question: "",
      faq5Answer: "",

      faq6id: 6,
      faq6Question: "",
      faq6Answer: "",
    },
    onSubmit: (values) => {
      console.log(values);

      let data = [
        {
          id: values.faq1id,
          question: values.faq1Question,
          answer: values.faq1Answer,
        },
        {
          id: values.faq2id,
          question: values.faq2Question,
          answer: values.faq2Answer,
        },
        {
          id: values.faq3id,
          question: values.faq3Question,
          answer: values.faq3Answer,
        },
        {
          id: values.faq4id,
          question: values.faq4Question,
          answer: values.faq4Answer,
        },
        {
          id: values.faq5id,
          question: values.faq5Question,
          answer: values.faq5Answer,
        },
        {
          id: values.faq6id,
          question: values.faq6Question,
          answer: values.faq6Answer,
        },
      ];

      console.log(data);

      axios
        .post("/faq", { data: data })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="card common-card mb-4">
        <div className="card-body">
          <h6 className="loginRegister__title text-poppins">
            Sıkça Sorulan Sorular Ayarları
          </h6>
          {/* faq1 */}
          <div className="row gy-lg-4 gy-3">
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 1 - soru
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 1"
                id="faq1Question"
                value={formik.values.faq1Question || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 1 - cevap
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 1"
                id="faq1Answer"
                value={formik.values.faq1Answer || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {/* faq2 */}
          <div className="row gy-lg-4 gy-3">
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 2 - soru
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 2"
                id="faq2Question"
                value={formik.values.faq2Question || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 2 - cevap
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 2"
                id="faq2Answer"
                value={formik.values.faq2Answer || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {/* faq3 */}
          <div className="row gy-lg-4 gy-3">
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 3 - soru
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 3"
                id="faq3Question"
                value={formik.values.faq3Question || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 3 - cevap
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 3"
                id="faq3Answer"
                value={formik.values.faq3Answer || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {/* faq4 */}
          <div className="row gy-lg-4 gy-3">
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 4 - soru
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 4"
                id="faq4Question"
                value={formik.values.faq4Question || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 4 - cevap
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 4"
                id="faq4Answer"
                value={formik.values.faq4Answer || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {/* faq5 */}
          <div className="row gy-lg-4 gy-3">
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 5 - soru
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 5"
                id="faq5Question"
                value={formik.values.faq5Question || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 5 - cevap
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 5"
                id="faq5Answer"
                value={formik.values.faq5Answer || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          {/* faq6 */}
          <div className="row gy-lg-4 gy-3">
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 6 - soru
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 6"
                id="faq6Question"
                value={formik.values.faq6Question || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Sıkça Sorulan Sorular 6 - cevap
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Sıkça Sorulan Sorular 6"
                id="faq6Answer"
                value={formik.values.faq6Answer || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="col-12 mt-5">
            <button type="submit" className="btn btn-main w-100">
              {t("Kaydet")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FaqSettings;
