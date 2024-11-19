import React from "react";
import SectionHeading from "../common/SectionHeading";
// import { propertyThreeTypes } from "../data/HomeThreeData/HomeThreeData";
import PropertyTypeThreeItem from "./items/PropertyTypeThreeItem";

import propertyThreeTypeIcon1 from "../../public/assets/images/icons/ppty-type-icon1.svg";
import propertyThreeTypeIcon2 from "../../public/assets/images/icons/ppty-type-icon2.svg";
import propertyThreeTypeIcon3 from "../../public/assets/images/icons/ppty-type-icon3.svg";
import propertyThreeTypeIcon4 from "../../public/assets/images/icons/ppty-type-icon4.svg";
import propertyThreeTypeIcon5 from "../../public/assets/images/icons/ppty-type-icon5.svg";
import propertyThreeTypeIcon6 from "../../public/assets/images/icons/ppty-type-icon6.svg";

const propertyThreeTypes = [
  {
    icon: propertyThreeTypeIcon1,
    title: "Dünya Genelinde Emlak Yatırımları",
    desc: "Real estate is a lucrative ind involves the buying selling and reproperties. It encompa",
    btnText: "MORE ABOUT ",
    btnLink: "/property",
  },
  {
    icon: propertyThreeTypeIcon2,
    title: "Prestij Yönetimi",
    desc: "Real estate is a lucrative ind involves the buying selling and reproperties. It encompa",
    btnText: "MORE ABOUT ",
    btnLink: "/property",
  },
  {
    icon: propertyThreeTypeIcon3,
    title: "Akıllı Ev Sistemleri",
    desc: "Real estate is a lucrative ind involves the buying selling and reproperties. It encompa",
    btnText: "MORE ABOUT ",
    btnLink: "/property",
  },
  {
    icon: propertyThreeTypeIcon4,
    title: "Güvenilir Kiralık Mülkler",
    desc: "Real estate is a lucrative ind involves the buying selling and reproperties. It encompa",
    btnText: "MORE ABOUT ",
    btnLink: "/property",
  },
  {
    icon: propertyThreeTypeIcon5,
    title: "Anahtar Teslimi Mülkler",
    desc: "Real estate is a lucrative ind involves the buying selling and reproperties. It encompa",
    btnText: "MORE ABOUT ",
    btnLink: "/property",
  },
  {
    icon: propertyThreeTypeIcon6,
    title: "Hızlı Ev Satışları",
    desc: "Real estate is a lucrative ind involves the buying selling and reproperties. It encompa",
    btnText: "MORE ABOUT ",
    btnLink: "/property",
  },
];

const PropertyTypeThree = () => {
  return (
    <>
      <section className="property-type-three padding-t-120 padding-b-60">
        <div className="container container-two">
          <SectionHeading
            headingClass="style-left"
            subtitle="Emlak Tipi"
            subtitleClass="bg-white"
            title="Gayrimenkule yatırım yapmak çok kolaylaştı"
            renderDesc={false}
            desc="Gayrimenkul, mülklerin satın alınmasını, satılmasını ve kiralanmasını içeren kazançlı bir sektördür. Konut, ticari ve endüstriyel mülkleri kapsar Emlakçılar, gayrimenkulün kolaylaştırılmasında çok önemli bir rol oynamaktadır."
            renderButton={false}
            buttonClass="btn-main"
            buttonText="View More"
          />

          <div className="row gy-4">
            {propertyThreeTypes.map((propertyTypeItem, index) => {
              return (
                <div className="col-xl-4 col-sm-6 col-xs-6" key={index}>
                  <PropertyTypeThreeItem propertyTypeItem={propertyTypeItem} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyTypeThree;
