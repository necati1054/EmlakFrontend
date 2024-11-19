import React from "react";
// import { counterFourContents } from "../data/OthersPageData/OthersPageData";
import counterFourIcon1 from "../../public/assets/images/icons/counter-four1.svg";
import counterFourIcon2 from "../../public/assets/images/icons/counter-four2.svg";
import counterFourIcon3 from "../../public/assets/images/icons/counter-four3.svg";
import counterFourIcon4 from "../../public/assets/images/icons/counter-four4.svg";
import CounterFourItem from "./items/CounterFourItem";

const counterFourContents = [
  {
    icon: counterFourIcon1,
    number: "1000+",
    text: " Mutlu Muüşteri ",
  },
  {
    icon: counterFourIcon2,
    number: "440+",
    text: " Konut Satışı ",
  },
  {
    icon: counterFourIcon3,
    number: "360+",
    text: "İş Yeri Satışı",
  },
  {
    icon: counterFourIcon4,
    number: "200+",
    text: " Arsa Satışı ",
  },
];

const CounterFour = () => {
  return (
    <section className="counter-four bg-white padding-y-120">
      <div className="container container-two">
        <div className="counter-three-wrapper">
          {counterFourContents.map((counterFourItem, counterFourItemIndex) => {
            return (
              <CounterFourItem
                counterFourItem={counterFourItem}
                key={counterFourItemIndex}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CounterFour;
