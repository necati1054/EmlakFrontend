import React from "react";
import ListingSidebar from "../common/ListingSidebar";
import KonutListingForm from "./KonutListingForm";

const AddListingSection = () => {
  return (
    <>
      <section className="listing padding-y-120">
        <div className="container container-two">
          <div className="row gy-4">
            <div className="col-lg-3">
              <ListingSidebar />
            </div>
            <div className="col-lg-9 ps-lg-5">
              <div
                data-bs-spy="scroll"
                data-bs-target="#list-scroll"
                data-bs-offset="0"
                data-bs-smooth-scroll="true"
                className="scrollspy-example"
                tabIndex="0"
              >
                <KonutListingForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddListingSection;
