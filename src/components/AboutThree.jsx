import React from "react";
import SectionHeading from "../common/SectionHeading";
import Button from "../common/Button";
import CountUp from "react-countup";

import AboutThreeThumb from "../../public/assets/images/thumbs/about-three-img.png";
import { useTranslation } from "react-i18next";

const AboutThree = () => {
  const { t } = useTranslation();
  const aboutCheckLists = [
    {
      icon: <i className="fas fa-check"></i>,
      text: t("Rüya Emlak Çözümleri"),
    },
    {
      icon: <i className="fas fa-check"></i>,
      text: t("Prestij Gayrimenkul Yönetimi"),
    },
    {
      icon: <i className="fas fa-check"></i>,
      text: t("Güvenli Mülk Ortakları"),
    },
    {
      icon: <i className="fas fa-check"></i>,
      text: t("Küresel Gayrimenkul Yatırımları"),
    },
  ];

  return (
    <>
      <section className="about-three bg-white padding-y-120">
        <div className="container container-two">
          <div className="row gy-4">
            <div className="col-lg-6">
              <div className="about-three-thumb">
                <div className="about-three-thumb__inner">
                  <img src={AboutThreeThumb} alt="" />
                  <div className="project-content">
                    <div className="project-content__inner">
                      <h2 className="project-content__number">
                        <CountUp end={parseInt(10)} duration={6} delay={0.2} />k{" "}
                      </h2>
                      <span className="project-content__text font-12">
                        {t("Tamamlanan Proje")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /!DESC - Buradaki Veriler Veri Tabanından Gelecek */}
            <div className="col-lg-6">
              <div className="about-content">
                <SectionHeading
                  headingClass="style-left"
                  subtitle="Hakkımızda"
                  subtitleClass="bg-gray-100"
                  title="Yeni mülkünüzün kapısının kilidini açın"
                  renderDesc={true}
                  desc="emlak, mülklerin satın alınmasını, satılmasını ve kiralanmasını içeren kazançlı bir endüstridir.Emlakçılar, gayrimenkulün kolaylaştırılmasında çok önemli bir rol oynamaktadır."
                  renderButton={false}
                  buttonClass="btn-main"
                  buttonText="View More"
                />

                <ul className="check-list style-two">
                  {aboutCheckLists.map((aboutCheckList, index) => {
                    return (
                      <li
                        className="check-list__item d-flex align-items-center"
                        key={index}
                      >
                        <span className="icon">{aboutCheckList.icon}</span>
                        <span className="text fw-semibold">
                          {aboutCheckList.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutThree;
