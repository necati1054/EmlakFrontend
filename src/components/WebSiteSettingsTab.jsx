import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../axios.js";
import { useTranslation } from "react-i18next";

const WebSiteSettingsTab = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const { t } = useTranslation();
  let image = {};

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
      .get("/settings")
      .then((res) => {
        console.log(res);
        formik.setValues({
          phone: res.data.filter((a) => a.key == "phone")[0]?.value || "",
          email: res.data.filter((a) => a.key == "email")[0]?.value || "",
          address: res.data.filter((a) => a.key == "address")[0]?.value || "",
          aciklama: res.data.filter((a) => a.key == "aciklama")[0]?.value || "",
          instagram:
            res.data.filter((a) => a.key == "instagram")[0]?.value || "",
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const formik = useFormik({
    initialValues: {
      phone: "",
      email: "",
      address: "",
      aciklama: "",
      instagram: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("aciklama", values.aciklama);
      formData.append("instagram", values.instagram);
      formData.append("logo", image[0]);
      axios
        .post("/save-settings", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
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
            Web Site Ayarları
          </h6>

          <div className="row gy-lg-4 gy-3">
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Telefon Numarası
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Telefon Numarası"
                id="phone"
                value={formik.values.phone || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                E-Posta Adresi
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="E-Posta Adresi"
                id="email"
                value={formik.values.email || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Şirket Adresi
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Şirket Adresi"
                id="address"
                value={formik.values.address || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                Hakkımızda
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="Hakkımızda"
                id="aciklama"
                value={formik.values.aciklama || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="col-sm-6 col-xs-6">
              <label htmlFor="name" className="form-label">
                İnstagram Adresi
              </label>
              <input
                type="text"
                className="common-input"
                placeholder="İnstagram Adresi"
                id="instagram"
                value={formik.values.instagram || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <label htmlFor="contained-button-file">
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => {
                  image = e.target.files;
                }}
              />
              <button variant="contained" component="span">
                Logo Yükle
              </button>
            </label>
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

export default WebSiteSettingsTab;
