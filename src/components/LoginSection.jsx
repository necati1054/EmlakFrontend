import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import LoginRegisterThumb from "../../public/assets/images/thumbs/login-img.avif";
import axios from "../axios.js";
import { jwtDecode } from "jwt-decode";

const LoginSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const setSession = (accessToken) => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      //   axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const decoded = jwtDecode(accessToken);
      localStorage.setItem("user", JSON.stringify(decoded.user));
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  // Navigate to Account Page
  const navigate = useNavigate();

  // **************************** Form Validation Start ************************
  const formik = useFormik({
    initialValues: {
      email: "atakan.kahveci@mynet.com",
      password: "password",
    },
    // Validate by Yup
    validationSchema: yup.object({
      email: yup
        .string()
        .email("E-postanız geçerli değil! Geçerli e-posta sağlayın")
        .required("E-Posta Gereklidir"),
      password: yup.string().required("Şifre Gereklidir"),
    }),

    onSubmit: (values, { resetForm }) => {
      // Taking Data From Input Field Start
      axios
        .post("/login", values)
        .then((res) => {
          setSession(res.data.access_token);
          navigate("/account");
          resetForm({ values: "" });
          toast.success("Giriş Başarılı", {
            theme: "colored",
          });
          console.log("You Logged in SUccessfully");
        })
        .catch((err) => {
          toast.error("Giriş Başarısız", {
            theme: "colored",
          });
          console.log("You Logged in Failed");
        });

      //
    },
  });

  // Render Errors Code Start
  const renderEmailError = formik.touched.email && formik.errors.email && (
    <span className="text-danger">{formik.errors.email}</span>
  );
  const renderPasswordError = formik.touched.password &&
    formik.errors.password && (
      <span className="text-danger">{formik.errors.password}</span>
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
                        Emlak Giriş yap
                      </h3>
                      <div className="row gy-lg-4 gy-3">
                        <div className="col-sm-12 col-xs-6">
                          <label htmlFor="Email" className="form-label">
                            E-Posta
                          </label>
                          <input
                            type="email"
                            placeholder="E-Posta"
                            name="email"
                            id="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`common-input ${
                              formik.touched.email && formik.errors.email
                                ? "is-invalid"
                                : ""
                            }`}
                          />
                          {renderEmailError}
                        </div>
                        <div className="col-sm-12">
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

                        <div className="col-12">
                          <button type="submit" className="btn btn-main w-100">
                            Giriş Yap
                            <span className="icon-right">
                              <i className="far fa-paper-plane"></i>{" "}
                            </span>
                          </button>
                        </div>

                        <div className="col-sm-12 mb-0">
                          <div className="have-account text-center">
                            <p className="text">
                              Hesabınız Yok mu?{" "}
                              <Link
                                to="/register"
                                className="link text-main text-decoration-underline font-14 text-poppins"
                              >
                                {" "}
                                Kayıt Ol
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

export default LoginSection;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { ToastContainer, toast } from 'react-toastify';

// import LoginRegisterThumb from '../../public/assets/images/thumbs/login-img.avif';

// const LoginSection = () => {

//     const [showPassword, setShowPassword] = useState(false);
//     const handleShowPassword = () => {
//         setShowPassword(!showPassword);
//     }

//     // Navigate to Account Page
//     const navigate = useNavigate();

//     // Form Validation Schema
//     const validationSchema = yup.object({
//         username: yup.string().min(3, "Too Short! Must be at least 3 characters long").required(),
//         email: yup.string().email("Your Email is not valid! Provide valid email").required(),
//         password: yup
//             .string()
//             .min(5, 'Password must be 5 characters long')
//             .matches(/[0-9]/, 'Password requires a number')
//             .matches(/[a-z]/, 'Password requires a lowercase letter')
//             .matches(/[A-Z]/, 'Password requires an uppercase letter')
//             .matches(/[^\w]/, 'Password requires a symbol')
//             .required('Password is required'),
//     });

//     // Formik Initialization
//     const formik = useFormik({
//         initialValues: {
//           username: "",
//           email: "",
//           password: "",
//         },
//         validationSchema: validationSchema,
//         onSubmit: (values, { resetForm }) => {
//             const { username, email, password } = values;
//             console.log(username);
//             console.log(email);
//             console.log(password);

//             navigate('/account');
//             resetForm();
//             toast.success("Congratulations! You Have Submitted Successfully.", {
//                 theme: "colored",
//             });
//             console.log('You Logged in Successfully');
//         },
//     });

//     return (
//         <>
//         <ToastContainer/>
//             <section className="loginRegister padding-y-120">
//                 <div className="container container-two">
//                     <div className="loginRegister-box card common-card">
//                         <div className="card-body">
//                             <div className="row gy-4">
//                                 <div className="col-lg-6">
//                                     <div className="loginRegister-thumb rounded overflow-hidden me-lg-2 d-flex h-100">
//                                         <img src={LoginRegisterThumb} alt=""/>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-6">
//                                     <div className="loginRegister-content">
//                                         <form onSubmit={formik.handleSubmit} method="POST">
//                                             <h3 className="loginRegister__title text-poppins">Login to CityScape</h3>
//                                             <p className="loginRegister__desc mb-4 font-18">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, corrupti.</p>

//                                             <div className="row gy-lg-4 gy-3">
//                                                 <div className="col-sm-6 col-xs-6">
//                                                     <label htmlFor="username" className="form-label">Username</label>
//                                                     <input
//                                                         type="text"
//                                                         placeholder="User Name"
//                                                         name='username'
//                                                         id='username'
//                                                         onChange={formik.handleChange}
//                                                         onBlur={formik.handleBlur}
//                                                         value={formik.values.username}
//                                                         className={`common-input ${
//                                                             formik.touched.username && formik.errors.username ? "is-invalid" : ""
//                                                         }`}
//                                                     />
//                                                     {formik.touched.username && formik.errors.username && (
//                                                         <span className="text-danger">{formik.errors.username}</span>
//                                                     )}
//                                                 </div>
//                                                 <div className="col-sm-6 col-xs-6">
//                                                     <label htmlFor="Email" className="form-label">Email</label>
//                                                     <input
//                                                         type="email"
//                                                         placeholder="Email"
//                                                         name='email'
//                                                         id='Email'
//                                                         onChange={formik.handleChange}
//                                                         onBlur={formik.handleBlur}
//                                                         value={formik.values.email}
//                                                         className={`common-input ${
//                                                             formik.touched.email && formik.errors.email ? "is-invalid" : ""
//                                                         }`}
//                                                     />
//                                                     {formik.touched.email && formik.errors.email && (
//                                                         <span className="text-danger">{formik.errors.email}</span>
//                                                     )}
//                                                 </div>
//                                                 <div className="col-sm-12">
//                                                     <label htmlFor="your-password" className="form-label">Password</label>
//                                                     <div className="position-relative">
//                                                         <input
//                                                             type={`${showPassword ? 'text': 'password'}`}
//                                                             placeholder="Password"
//                                                             name='password'
//                                                             id='your-password'
//                                                             onChange={formik.handleChange}
//                                                             onBlur={formik.handleBlur}
//                                                             value={formik.values.password}
//                                                             className={`common-input ${
//                                                                 formik.touched.password && formik.errors.password ? "is-invalid" : ""
//                                                             }`}
//                                                         />
//                                                         <span className={`password-show-hide ${showPassword ? 'fas fa-eye ': 'fas fa-eye-slash'}`} onClick={handleShowPassword}> </span>
//                                                     </div>
//                                                     {formik.touched.password && formik.errors.password && (
//                                                         <span className="text-danger">{formik.errors.password}</span>
//                                                     )}
//                                                 </div>
//                                                 <div className="col-12">
//                                                     <button type="submit" className="btn btn-main w-100">Login <span className="icon-right"> <i className="far fa-paper-plane"></i> </span> </button>
//                                                 </div>
//                                                 <div className="col-sm-12 mb-0">
//                                                     <div className="have-account text-center">
//                                                         <p className="text">Don't Have An Account? <Link to="/register" className="link text-main text-decoration-underline font-14 text-poppins"> Register</Link></p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default LoginSection;
