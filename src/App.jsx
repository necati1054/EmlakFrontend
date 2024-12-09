import React, { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigationType,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import "./App.css";

import HomeOne from "./pages/HomeOne";
import ScrollToTop from "./common/ScrollToTop";
import Property from "./pages/Property";
import PropertySidebar from "./pages/PropertySidebar";
import PropertyDetails from "./pages/PropertyDetails";
import AboutUs from "./pages/AboutUs";
import FaqPage from "./pages/FaqPage";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Map from "./pages/Map";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

function App() {
  // const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentPath = location.pathname;
  // This code will run when i will go to item details page. it will scroll me to template top. And when i back to the previous page it will redirect me to the exact previous position.
  const Wrapper = ({ children }) => {
    const location = useLocation();
    const navigationType = useNavigationType();
    const scrollPositions = useRef({});

    useEffect(() => {
      const handleScroll = () => {
        scrollPositions.current[location.pathname] = window.scrollY;
      };

      if (navigationType === "PUSH" || navigationType === "REPLACE") {
        document.documentElement.scrollTo(0, 0);
      } else if (navigationType === "POP") {
        const savedPosition = scrollPositions.current[location.pathname];
        if (savedPosition !== undefined) {
          window.scrollTo(0, savedPosition);
        }
      }

      let lang = i18n.resolvedLanguage;
      const currentPath = location.pathname.split("/")[1];

      console.log("wrapper içi", lang);
      console.log("currentPath", currentPath);

      const langsArray = ["by", "de", "en", "fr", "it", "tr"];

      if (currentPath != lang) {
        if (langsArray.includes(lang)) {
          i18n.changeLanguage(currentPath);
        } else {
          i18n.changeLanguage("tr");
        }
      }

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname, navigationType]);

    return children;
  };
  // This code will run when i will go to item details page. it will scroll me to template top. And when i back to the previous page it will redirect me to the exact previous position.

  let lang = i18n.resolvedLanguage;

  return (
    <>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            <Route path="/" element={<Navigate to={`/${lang}`} replace />} />
            <Route path="/:lang" element={<HomeOne />} />
            <Route path="/:lang">
              <Route path="about-us" element={<AboutUs />} />
              <Route path="property/:ilanType" element={<Property />} />
              <Route path="property-sidebar" element={<PropertySidebar />} />
              <Route
                path="property/:ilanType/:id"
                element={<PropertyDetails />}
              />
              <Route path="faq" element={<FaqPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="account" element={<Account />} />
              <Route path="project/:title" element={<ProjectDetails />} />
              <Route path="contact" element={<Contact />} />
              <Route path="map" element={<Map />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>

      <ScrollToTop />
    </>
  );
}

export default App;
