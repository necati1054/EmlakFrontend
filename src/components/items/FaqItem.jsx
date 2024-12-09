import React from "react";

const FaqItem = ({ itemClass, faq, activeAccordion, handleAccordionClick }) => {
  const { question, answer } = faq;

  return (
    <>
      <div
        className={`accordion-item
                ${itemClass} 
                ${activeAccordion === faq.id ? "active" : ""}`}
        key={faq.id}
      >
        <h5 className="accordion-header">
          <button
            className="accordion-button"
            onClick={() => handleAccordionClick(faq.id)}
            type="button"
          >
            {question}
          </button>
        </h5>
        <div className="accordion-body">
          <p className="accordion-body__desc fs-18">{answer}</p>
        </div>
      </div>
    </>
  );
};

export default FaqItem;
