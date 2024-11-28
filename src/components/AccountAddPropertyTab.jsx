import React, { useState } from "react";
import KonutListingForm from "./KonutListingForm";
import ArsaListingForm from "./ArsaListingForm";
import IsYeriListingForm from "./IsYeriListingForm";
import { useTranslation } from "react-i18next";

const AccountAddPropertyTab = () => {
  const [state, setState] = useState(null);
  const { t } = useTranslation();
  return (
    <>
      {state == null && (
        <p className="account-alert">
          {t("Lütfen Seçim Yapınız")}{" "}
          <strong className="text-heading fw-500 text-poppins">
            {t("Konut / Arsa / İş Yeri")}
          </strong>{" "}
        </p>
      )}
      {/* seçimler */}
      <div className="row" style={{ marginBottom: "10px" }}>
        <div className="col-md-4">
          <button
            type="button"
            onClick={() => setState(1)}
            className="btn btn-main w-100"
          >
            {t("Konut")}
          </button>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            onClick={() => setState(2)}
            className="btn btn-main w-100"
          >
            {t("Arsa")}
          </button>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            onClick={() => setState(3)}
            className="btn btn-main w-100"
          >
            {t("İş Yeri")}
          </button>
        </div>
      </div>
      {state == 1 && <KonutListingForm />}
      {state == 2 && <ArsaListingForm />}
      {state == 3 && <IsYeriListingForm />}
    </>
  );
};

export default AccountAddPropertyTab;
