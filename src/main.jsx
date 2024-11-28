import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./index.scss";
import MobileMenuProvider from "./contextApi/MobileMenuContext.jsx";
import OffCanvasProvider from "./contextApi/OffCanvasContext.jsx";
import ScrollHideProvider from "./contextApi/ScrollHideContext.jsx";
import PropertyFilterProvider from "./contextApi/PropertyFilterContext.jsx";

import "./i18n.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PropertyFilterProvider>
    <ScrollHideProvider>
      <OffCanvasProvider>
        <MobileMenuProvider>
          <React.StrictMode>
            <React.Suspense fallback="loading">
              <App />
            </React.Suspense>
          </React.StrictMode>
        </MobileMenuProvider>
      </OffCanvasProvider>
    </ScrollHideProvider>
  </PropertyFilterProvider>
);
