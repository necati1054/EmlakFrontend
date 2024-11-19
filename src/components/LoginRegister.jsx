import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from "../axios.js";

import LoginRegisterThumb from "../../public/assets/images/thumbs/login-img.avif";
import { render } from "react-dom";

const LoginRegister = ({
  titleText,
  firstNameCol,
  showFirstName,
  lastNameCol,
  showLastName,
  passwordCol,
  showConfirm,
  btnText,
  showForgotRemember,
  showTermCondition,
  haveAccountText,
  haveAccountLink,
  haveAccountLinkText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Navigate to Account Page
  const navigate = useNavigate();

  // **************************** Form Validation Start ************************
  const formik = useFormik({
    initialValues: {
      phone_number: "",
      email: "",
      password: "",
      confirm: "",
      name: "",
      role: "",
      surname: "",
    },
    validationSchema: Yup.object({
      phone_number: Yup.string().required("Telefon Numarası Zorunlu"),
      email: Yup.string()
        .email("Geçerli Bir Email Giriniz")
        .required("Email Zorunlu"),
      name: Yup.string().required("İsim Zorunlu"),
      surname: Yup.string().required("Soyisim Zorunlu"),
      role: Yup.string().required("Role Zorunlu"),
      password: Yup.string().required("Şifre Zorunlu"),
      confirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Şifreler Eşleşmiyor")
        .required("Şifre Tekrarı Zorunlu"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);

      axios
        .post("/register", values)
        .then((res) => {
          console.log(res);
          resetForm({ values: "" });
          toast.success("Başarılı! Başarılı bir şekilde kayıt oldunuz.", {
            theme: "colored",
          });
          console.log("You Logged in SUccessfully");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);

          toast.error("Hata! Lütfen daha sonra tekrar deneyiniz.", {
            theme: "colored",
          });
        });
    },
  });

  // Render Errors Code Start
  const renderUsernameError = formik.touched.phone_number &&
    formik.errors.phone_number && (
      <span className="text-danger">{formik.errors.phone_number}</span>
    );
  const renderemailError = formik.touched.email && formik.errors.email && (
    <span className="text-danger">{formik.errors.email}</span>
  );
  const renderroleError = formik.touched.role && formik.errors.role && (
    <span className="text-danger">{formik.errors.role}</span>
  );
  const renderPasswordError = formik.touched.password &&
    formik.errors.password && (
      <span className="text-danger">{formik.errors.password}</span>
    );
  const renderConfirmPasswordError = formik.touched.confirm &&
    formik.errors.confirm && (
      <span className="text-danger">{formik.errors.confirm}</span>
    );
  const renderNameError = formik.touched.name && formik.errors.name && (
    <span className="text-danger">{formik.errors.name}</span>
  );
  const renderLastNameError = formik.touched.surname &&
    formik.errors.surname && (
      <span className="text-danger">{formik.errors.surname}</span>
    );
  // Render Errors Code End
  // **************************** Form Validation End ************************

  return (
    <>
      <ToastContainer />
      <section className="loginRegister padding-y-120">
        <div className="container container-two">
          <div className="loginRegister-box card common-card">
            <div className="card-body">
              <div className="row gy-4">
                <div className="col-lg-6">
                  <div className="loginRegister-thumb rounded overflow-hidden me-lg-2 d-flex h-100">
                    <img src={LoginRegisterThumb} alt="" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="loginRegister-content">
                    <form onSubmit={formik.handleSubmit} method="POST">
                      <h3 className="loginRegister__title text-poppins">
                        {titleText}
                      </h3>
                      <div className="row gy-lg-4 gy-3">
                        <div className={firstNameCol}>
                          <label htmlFor="name" className="form-label">
                            İsim
                          </label>
                          <input
                            type="text"
                            placeholder="İsim"
                            name="name"
                            id="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className={`common-input ${
                              formik.touched.name && formik.errors.name
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {renderNameError}
                        </div>

                        <div className={lastNameCol}>
                          <label htmlFor="surname" className="form-label">
                            Soyisim
                          </label>
                          <input
                            type="text"
                            placeholder="Soyisim"
                            name="surname"
                            id="surname"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.surname}
                            className={`common-input ${
                              formik.touched.surname && formik.errors.surname
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {renderLastNameError}
                        </div>

                        <div className="col-sm-6 col-xs-6">
                          <label htmlFor="email" className="form-label">
                            email
                          </label>
                          <input
                            type="email"
                            placeholder="email"
                            name="email"
                            id="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`common-input ${
                              formik.touched.email && formik.errors.email
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {renderemailError}
                        </div>
                        <div className="col-sm-6 col-xs-6">
                          <label htmlFor="phone_number" className="form-label">
                            Telefon Numarası
                          </label>
                          <input
                            type="text"
                            placeholder="Telefon Numarası"
                            name="phone_number"
                            id="phone_number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone_number}
                            className={`common-input ${
                              formik.touched.phone_number &&
                              formik.errors.phone_number
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {renderUsernameError}
                        </div>
                        <div className="col-sm-6 col-xs-6">
                          <label htmlFor="role" className="form-label">
                            role
                          </label>
                          <input
                            type="text"
                            placeholder="role"
                            name="role"
                            id="role"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.role}
                            className={`common-input ${
                              formik.touched.role && formik.errors.role
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {renderroleError}
                        </div>

                        <div className={passwordCol}>
                          <label htmlFor="your-password" className="form-label">
                            Şifre
                          </label>
                          <div className="position-relative">
                            <input
                              type={`${showPassword ? "text" : "password"}`}
                              placeholder="Şifre"
                              name="password"
                              id="your-password"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password}
                              className={`common-input ${
                                formik.touched.password &&
                                formik.errors.password
                                  ? "is-invalid"
                                  : ""
                              }`}
                            />
                            <span
                              className={`password-show-hide ${
                                showPassword
                                  ? "fas fa-eye "
                                  : "fas fa-eye-slash"
                              } `}
                              onClick={() => handleShowPassword()}
                            >
                              {" "}
                            </span>
                          </div>
                          {renderPasswordError}
                        </div>
                        {showConfirm && (
                          <div className="col-sm-6 col-xs-6">
                            <label htmlFor="confirm" className="form-label">
                              Şifre Yeniden
                            </label>
                            <div className="position-relative">
                              <input
                                type={`${
                                  showConfirmPassword ? "text" : "password"
                                }`}
                                placeholder="Şifre Yeniden"
                                name="confirm"
                                id="confirm"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirm}
                                className={`common-input ${
                                  formik.touched.confirm &&
                                  formik.errors.confirm
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <span
                                className={`password-show-hide ${
                                  showConfirmPassword
                                    ? "fas fa-eye "
                                    : "fas fa-eye-slash"
                                } `}
                                onClick={() => handleShowConfirmPassword()}
                              >
                                {" "}
                              </span>
                            </div>
                            {renderConfirmPasswordError}
                          </div>
                        )}

                        {showForgotRemember && (
                          <div className="col-12">
                            <div className="form-group py-2 flx-between">
                              <Link
                                to="#"
                                className="forgot-password text-decoration-underline text-main text-poppins font-14"
                              >
                                Şifreni Sıfırla?
                              </Link>
                            </div>
                          </div>
                        )}

                        {showTermCondition && (
                          <div className="col-12 py-2">
                            <div className="common-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="remember"
                              />
                              <div className="form-check-label">
                                <label className="" htmlFor="remember">
                                  {" "}
                                  I agree with Licences Info,
                                </label>
                                <a
                                  href="#"
                                  className="text-decoration-underline text-main"
                                >
                                  Terms of Service
                                </a>
                                <label className="" htmlFor="remember">
                                  {" "}
                                  , Privacy Policy{" "}
                                </label>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="col-12">
                          <button type="submit" className="btn btn-main w-100">
                            {btnText}
                            <span className="icon-right">
                              {" "}
                              <i className="far fa-paper-plane"></i>{" "}
                            </span>
                          </button>
                        </div>

                        <div className="col-sm-12 mb-0">
                          <div className="have-account text-center">
                            <p className="text">
                              {haveAccountText}
                              <Link
                                to={haveAccountLink}
                                className="link text-main text-decoration-underline font-14 text-poppins"
                              >
                                {haveAccountLinkText}
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginRegister;
