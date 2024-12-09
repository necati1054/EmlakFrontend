import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useNavigate } from "react-router-dom";
import AccountHomeTab from "./AccountHomeTab";
import AccountProfileTab from "./AccountProfileTab";
import AccountDetailsTab from "./AccountDetailsTab";
import AccountMyPropertyTab from "./AccountMyPropertyTab";
import AccountAddPropertyTab from "./AccountAddPropertyTab";
import AccountChangePasswordTab from "./AccountChangePasswordTab";

import WebSiteSettingsTab from "./WebSiteSettingsTab.jsx";
import AboutSettingsTab from "./AboutSettingsTab.jsx";
import FaqSettings from "./FaqSettings.jsx";

import { ToastContainer, toast } from "react-toastify";
import axios from "../axios.js";
import { useTranslation } from "react-i18next";

const AccountSection = () => {
  const { t, i18n } = useTranslation();
  let lang = i18n.resolvedLanguage;
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);

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
        navigate("/" + lang + "/login");
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/" + lang + "/login");
      });
  };

  const accountTabs = [
    {
      icon: <i className="fas fa-home"></i>,
      text: t("Ana Sayfa"),
    },
    {
      icon: <i className="fas fa-user"></i>,
      text: t("Profilim"),
    },
    {
      icon: <i className="fas fa-user"></i>,
      text: t("Hesap Bilgilerim"),
    },
    {
      icon: <i className="fas fa-list"></i>,
      text: t("İlanlarım"),
    },
    {
      icon: <i className="fas fa-map-marked-alt"></i>,
      text: t("İlan Ekle"),
    },
    {
      icon: <i className="fas fa-lock"></i>,
      text: t("Şifre Değiştir"),
    },
  ];

  const adminAccountTabs = [
    {
      icon: <i className="fas fa-home"></i>,
      text: t("Ana Sayfa"),
    },
    {
      icon: <i className="fas fa-user"></i>,
      text: t("Profilim"),
    },
    {
      icon: <i className="fas fa-lock"></i>,
      text: t("Şifre Değiştir"),
    },
    {
      icon: <i className="fas fa-lock"></i>,
      text: "web site ayarları",
    },
    {
      icon: <i className="fas fa-lock"></i>,
      text: "hakkımızda ayarları",
    },
    {
      icon: <i className="fas fa-lock"></i>,
      text: "sıkça sorulan sorular ayarları",
    },
  ];

  const tabsToMap = userData.role === 0 ? adminAccountTabs : accountTabs;

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
                    {tabsToMap.map((accountTab, accountTabIndex) => {
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
                      {t("Çıkış Yap")}
                    </button>
                  </TabList>
                </div>
              </div>

              {userData.role === 0 ? (
                <div className="col-xl-9 col-lg-8">
                  <TabPanel>
                    <AccountHomeTab />
                  </TabPanel>
                  <TabPanel>
                    <AccountProfileTab />
                  </TabPanel>
                  <TabPanel>
                    <AccountChangePasswordTab />
                  </TabPanel>
                  <TabPanel>
                    <WebSiteSettingsTab />
                  </TabPanel>
                  <TabPanel>
                    <AboutSettingsTab />
                  </TabPanel>
                  <TabPanel>
                    <FaqSettings />
                  </TabPanel>
                </div>
              ) : (
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
                  <TabPanel>
                    <AccountAddPropertyTab />
                  </TabPanel>
                  <TabPanel>
                    <AccountChangePasswordTab />
                  </TabPanel>
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default AccountSection;
