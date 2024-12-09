import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../axios.js";
import { useTranslation } from "react-i18next";

const AboutSettingsTab = () => {
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

  const handleRedirectLogin = () => {
    axios
      .post("/logout")
      .then((res) => {
        console.log(res);
        console.log("You Logged out Successfully");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/login");
      });
  };

  const getData = () => {
    axios
      .get("/settings")
      .then((res) => {
        formik.setValues({
          h_title: res.data.filter((a) => a.key == "h_title")[0]?.value || "",
          h_subtitle:
            res.data.filter((a) => a.key == "h_subtitle")[0]?.value || "",
          h_aciklama:
            res.data.filter((a) => a.key == "h_aciklama")[0]?.value || "",
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      h_title: "",
      h_subtitle: "",
      h_aciklama: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("h_title", values.h_title);
      formData.append("h_subtitle", values.h_subtitle);
      formData.append("h_aciklama", values.h_aciklama);
      axios
        .post("/save-settings", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log(res);
          // handleRedirectLogin();
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
            Hakkkımızda Ayarları
          </h6>

          <div className="row gy-lg-4 gy-3">
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Hakkımızda Başlık
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Hakkımızda Başlık"
                id="h_title"
                value={formik.values.h_title || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Hakkımızda Alt Başlık
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Hakkımızda Alt Başlık"
                id="h_subtitle"
                value={formik.values.h_subtitle || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Hakkımızda Açıklama
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Hakkımızda Açıklama"
                id="h_aciklama"
                value={formik.values.h_aciklama || ""}
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

export default AboutSettingsTab;
