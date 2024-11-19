import React, { useState } from "react";
import KonutListingForm from "./KonutListingForm";
import ArsaListingForm from "./ArsaListingForm";
import IsYeriListingForm from "./IsYeriListingForm";

const AccountAddPropertyTab = () => {
  const [state, setState] = useState(null);
  return (
    <>
      {state == null && (
        <p className="account-alert">
          Lütfen Seçim Yapınız{" "}
          <strong className="text-heading fw-500 text-poppins">
            Konut / Arsa / İş Yeri
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
            Konut
          </button>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            onClick={() => setState(2)}
            className="btn btn-main w-100"
          >
            Arsa
          </button>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            onClick={() => setState(3)}
            className="btn btn-main w-100"
          >
            İş Yeri
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
