import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../axios.js";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const AccountChangePasswordTab = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    } else {
      if (!userData) {
        navigate("/login");
      }
    }
  }, [navigate]);

  if (!userData) return null;

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

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required(t("Şimdiki Şifre Zorunlu")),
      newPassword: Yup.string().required(t("Yeni Şifre Zorunlu")),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], t("Şifreler Eşleşmiyor"))
        .required(t("Yeni Şifre Tekrarı Zorunlu")),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("/user-password-update/" + userData.id, values)
        .then((res) => {
          console.log(res);
          handleRedirectLogin();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="card common-card">
          <div className="card-body">
            <h6 className="loginRegister__title text-poppins">
              {t("Şifre Değiştir")}
            </h6>

            <div className="row gy-lg-4 gy-3">
              <div className="col-12">
                <label htmlFor="oldPassword" className="form-label">
                  {t("Şimdiki Şifreniz")}
                </label>
                <div className="position-relative">
                  <input
                    type="password"
                    className="common-input"
                    placeholder={t("Şimdiki Şifreniz")}
                    id="oldPassword"
                    value={formik.values.oldPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    className="password-show-hide fas fa-eye toggle-password la-eye-slash"
                    id="#oldPassword"
                  ></span>
                  {formik.errors.oldPassword && formik.touched.oldPassword ? (
                    <div className="text-danger">
                      {formik.errors.oldPassword}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="newPassword" className="form-label">
                  {t("Yeni Şifreniz")}
                </label>
                <div className="position-relative">
                  <input
                    type="password"
                    className="common-input"
                    placeholder={t("Yeni Şifreniz")}
                    id="newPassword"
                    value={formik.values.newPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    className="password-show-hide fas fa-eye toggle-password la-eye-slash"
                    id="#newPassword"
                  ></span>
                </div>
                {formik.errors.newPassword && formik.touched.newPassword ? (
                  <div className="text-danger">{formik.errors.newPassword}</div>
                ) : null}
              </div>
              <div className="col-12">
                <label htmlFor="confirmPassword" className="form-label">
                  {t("Yeni Şifrenizi Onaylayın")}
                </label>
                <div className="position-relative">
                  <input
                    type="password"
                    className="common-input"
                    placeholder={t("Yeni Şifrenizi Onaylayın")}
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    className="password-show-hide fas fa-eye toggle-password la-eye-slash"
                    id="#confirmPassword"
                  ></span>
                  {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword ? (
                    <div className="text-danger">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-main w-100">
                  {t("Şifreyi Değiştir")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AccountChangePasswordTab;
