import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { accountTabs } from "../data/OthersPageData/OthersPageData";
import { useLocation, useNavigate } from "react-router-dom";
import AccountHomeTab from "./AccountHomeTab";
import AccountProfileTab from "./AccountProfileTab";
import AccountAddressTab from "./AccountAddressTab";
import AccountDetailsTab from "./AccountDetailsTab";
import AccountMyPropertyTab from "./AccountMyPropertyTab";
import AccountFavoritePropertyTab from "./AccountFavoritePropertyTab";
import AccountAddPropertyTab from "./AccountAddPropertyTab";
import AccountPaymentTab from "./AccountPaymentTab";
import AccountChangePasswordTab from "./AccountChangePasswordTab";
import { ToastContainer, toast } from "react-toastify";
import axios from "../axios.js";

const AccountSection = () => {
  const navigate = useNavigate();

  const notify = () =>
    toast.success("You have been logged out", {
      theme: "colored",
    });

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

  return (
    <>
      <ToastContainer />
      <section className="account padding-y-120">
        <div className="container container-two">
          <Tabs>
            <div className="row gy-4">
              <div className="col-xl-3 col-lg-4">
                <div className="account-sidebar search-sidebar">
                  <TabList className="nav side-tab flex-column nav-pills me-3">
                    {accountTabs.map((accountTab, accountTabIndex) => {
                      return (
                        <Tab className={"nav-link"} key={accountTabIndex}>
                          <span className="icon">{accountTab.icon}</span>
                          {accountTab.text}
                        </Tab>
                      );
                    })}
                    <button
                      type="button"
                      className="nav-link"
                      onClick={() => {
                        handleRedirectLogin();
                      }}
                    >
                      <span className="icon">
                        {" "}
                        <i className="fas fa-sign-out-alt"></i>
                      </span>
                      Çıkış Yap
                    </button>
                  </TabList>
                </div>
              </div>

              <div className="col-xl-9 col-lg-8">
                <TabPanel>
                  <AccountHomeTab />
                </TabPanel>
                <TabPanel>
                  <AccountProfileTab />
                </TabPanel>
                <TabPanel>
                  <AccountDetailsTab />
                </TabPanel>
                <TabPanel>
                  <AccountMyPropertyTab />
                </TabPanel>
                {/* <TabPanel>
                  <AccountFavoritePropertyTab />
                </TabPanel> */}
                <TabPanel>
                  <AccountAddPropertyTab />
                </TabPanel>
                {/* <TabPanel>
                  <AccountPaymentTab />
                </TabPanel> */}
                <TabPanel>
                  <AccountChangePasswordTab />
                </TabPanel>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default AccountSection;
