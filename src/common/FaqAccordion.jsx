import React, { useEffect, useState } from "react";
import FaqItem from "../components/items/FaqItem";
import axios from "../axios.js";

const faqs = [
  {
    id: 1,
    btnText: "Memnuniyetiniz bizim önceliğimiz mi?",
    bodyText:
      "Lorem Ipsum is simply dummy text the printing and typese Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 2,
    btnText: "İlanlarınız ne kadar güvenilir?",
    bodyText:
      "Lorem Ipsum is simply dummy text the printing and typese Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: 3,
    btnText: "Emlak ilanlarımda fotoğraf eklemenin önemi nedir?",
    bodyText:
      "İlanlarınıza ekleyeceğiniz fotoğraflar, potansiyel alıcıların dikkatini çekmekte büyük rol oynar. İyi kaliteli ve çeşitli açıdan çekilmiş fotoğraflar, ilanınızın daha fazla ilgi görmesini sağlar ve alıcıların karar verme sürecini olumlu etkiler.",
  },
  {
    id: 4,
    btnText: "Kiralık ve satılık ilanlar arasındaki fark nedir?",
    bodyText:
      "Kiralık ilanlar, bir mülkün belirli bir süre için kiralanması amacıyla verilirken, satılık ilanlar mülkün kalıcı olarak satışa sunulduğu ilanlardır. İlgilendiğiniz ilan türünü seçerken, bu durumu göz önünde bulundurmalısınız.",
  },
  {
    id: 5,
    btnText: "İlanlarımın yayın süresi ne kadardır?",
    bodyText:
      "İlanlarınız, yayınlandıkları tarihten itibaren siz ilanı pasif'e alana kadar yada silene kadar ilanda kalmaktadır.",
  },
  {
    id: 6,
    btnText: "Siteniz üzerinden yapılan işlemler güvenli mi?",
    bodyText:
      "Evet, sitemizde yapılan tüm işlemler güvenli bir şekilde gerçekleştirilir. Kişisel verilerinizin korunması için SSL sertifikası kullanıyoruz ve tüm ödeme işlemleri güvenli ödeme sistemleri aracılığıyla yapılmaktadır.",
  },
];

const FaqAccordion = (props) => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [faqData, setFaqData] = useState(null);

  const handleAccordionClick = (faqId) => {
    setActiveAccordion(activeAccordion === faqId ? null : faqId);
  };

  useEffect(() => {
    axios
      .get("/faq")
      .then((response) => {
        setFaqData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  return (
    <>
      <div className={`common-accordion accordion ${props.accordionClass}`}>
        {faqData?.map((faq, faqIndex) => {
          return (
            <FaqItem
              itemClass={props.itemClass}
              faq={faq}
              key={faqIndex}
              faqIndex={faqIndex}
              activeAccordion={activeAccordion}
              handleAccordionClick={handleAccordionClick}
            />
          );
        })}
      </div>
    </>
  );
};

export default FaqAccordion;
