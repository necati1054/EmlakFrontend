import React, { useEffect } from "react";
import { accountAddress } from "../data/OthersPageData/OthersPageData";
import { useNavigate } from "react-router-dom";

const AccountAddressTab = () => {
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

  return (
    <>
      {/* <p className="account-alert">
        The accompanying tends to will be utilized on the checkout page
        naturally.
      </p>
      <div className="row gy-4">
        <div class="col-sm-6">
          <div class="card common-card">
            <div class="card-body">
              <h6 class="text-poppins mb-2">Charging Address alter</h6>
              <span class="fw-semibold text-poppins font-14 mb-4">
                {userData.name}
              </span>
              <div class="contact-info d-flex gap-3 align-items-center mb-2">
                <div class="contact-info__content">
                  <span class="contact-info__address">
                    <strong class="fw-500">location:</strong>66 Broklyant, New
                    York India
                  </span>
                </div>
              </div>
              <div class="contact-info d-flex gap-3 align-items-center mb-2">
                <div class="contact-info__content">
                  <span class="contact-info__address">
                    <strong class="fw-500">Phone:</strong> 012 345 678 9101
                  </span>
                </div>
              </div>
              <div class="contact-info d-flex gap-3 align-items-center mb-2">
                <div class="contact-info__content">
                  <span class="contact-info__address">
                    <strong class="fw-500">Email:</strong> {userData.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="card common-card">
            <div class="card-body">
              <h6 class="text-poppins mb-2">Transporting Address alter</h6>
              <span class="fw-semibold text-poppins font-14 mb-4">
                {userData.name}
              </span>
              <div class="contact-info d-flex gap-3 align-items-center mb-2">
                <div class="contact-info__content">
                  <span class="contact-info__address">
                    <strong class="fw-500">location:</strong>66 Broklyant, New
                    York India
                  </span>
                </div>
              </div>
              <div class="contact-info d-flex gap-3 align-items-center mb-2">
                <div class="contact-info__content">
                  <span class="contact-info__address">
                    <strong class="fw-500">Phone:</strong> 012 345 678 9101
                  </span>
                </div>
              </div>
              <div class="contact-info d-flex gap-3 align-items-center mb-2">
                <div class="contact-info__content">
                  <span class="contact-info__address">
                    <strong class="fw-500">Email:</strong> {userData.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default AccountAddressTab;
