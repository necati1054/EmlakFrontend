import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AccountProfileTab = () => {
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

  const getRoleName = (role) => {
    switch (role) {
      case 0:
        return t("Yetkili");
      case 1:
        return t("Kurumsal Satıcı");
      case 2:
        return t("Satıcı");
      case 3:
        return t("Bireysel");
    }
  };

  return (
    <>
      <div className="card common-card mb-4">
        <div className="card-body">
          <div className="profile-info d-flex gap-4 align-items-center">
            <div className="profile-info__thumb">
              <img src="assets/images/thumbs/team1.png" alt="" />
            </div>
            <div className="profile-info__content">
              <span className="mb-1 fw-semibold text-main text-poppins font-13">
                {getRoleName(userData.role)}
              </span>
              <h4 className="profile-info__title text-poppins mb-4">
                {userData.name} {userData.surname}
              </h4>
              <div className="contact-info d-flex gap-3 align-items-center mb-2">
                <span className="contact-info__icon text-gradient">
                  <i className="fas fa-phone"></i>
                </span>
                <div className="contact-info__content">
                  <span className="contact-info__address">
                    {userData.phone_number}
                  </span>
                </div>
              </div>
              <div className="contact-info d-flex gap-3 align-items-center mb-2">
                <span className="contact-info__icon text-gradient">
                  <i className="fas fa-envelope"></i>
                </span>
                <div className="contact-info__content">
                  <span className="contact-info__address">
                    {" "}
                    {userData.email}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountProfileTab;
