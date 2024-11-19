import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../axios.js";

const AccountDetailsTab = () => {
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
      name: "",
      surname: "",
      phone_number: "",
      Email: "",
      role: "",
    },
    onSubmit: (values) => {
      axios
        .post("/user-update/" + userData.id, values)
        .then((res) => {
          console.log(res);
          handleRedirectLogin();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    formik.setValues({
      name: userData.name,
      surname: userData.surname,
      phone_number: userData.phone_number,
      Email: userData.email,
      role: userData.role,
    });
  }, []);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="card common-card mb-4">
          <div className="card-body">
            <h6 className="loginRegister__title text-poppins">
              Hesap Bilgileri
            </h6>

            <div className="row gy-lg-4 gy-3">
              <div className="col-sm-6 col-xs-6">
                <label htmlFor="name" className="form-label">
                  İsim
                </label>
                <input
                  type="text"
                  className="common-input"
                  placeholder="İsim"
                  id="name"
                  value={formik.values.name || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="col-sm-6 col-xs-6">
                <label htmlFor="surname" className="form-label">
                  Soyisim
                </label>
                <input
                  type="text"
                  className="common-input"
                  placeholder="Last Name"
                  id="surname"
                  value={formik.values.surname || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="col-sm-6 col-xs-6">
                <label htmlFor="phone_number" className="form-label">
                  Telefon Numarası
                </label>
                <input
                  type="text"
                  className="common-input"
                  placeholder="Telefon Numarası"
                  id="phone_number"
                  value={formik.values.phone_number || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="col-sm-6 col-xs-6">
                <label htmlFor="Email" className="form-label">
                  E-Posta
                </label>
                <input
                  type="email"
                  className="common-input"
                  placeholder=" E-Posta"
                  id="Email"
                  value={formik.values.Email || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {userData.role === "0" && (
                <div className="col-sm-6 col-xs-6">
                  <label htmlFor="role" className="form-label">
                    Role
                  </label>
                  <input
                    type="text"
                    className="common-input"
                    placeholder=" Role"
                    id="role"
                    value={formik.values.role || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              )}
            </div>
            <div className="col-12 mt-5">
              <button type="submit" className="btn btn-main w-100">
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AccountDetailsTab;
