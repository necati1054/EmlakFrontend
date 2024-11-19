import React, { useState, useEffect } from "react";
import LogoWhite from "../LogoWhite";

const textData = [
  {
    text: "Güvenle adım attığınız her yeni evde, hayatınıza değer katmayı hedefliyoruz. Sizin için sadece bir mülk değil, huzurla dolu bir yaşam alanı sunuyoruz.",
  },
  {
    text: "Bir ev aramak, yeni bir hayata ilk adımı atmaktır. Biz, bu yolculukta size rehberlik ediyor ve doğru adresi bulmanız için yanınızda yer alıyoruz.",
  },
  {
    text: "Sadece bir evi değil, içinde yaşanacak anıları ve geleceğe açılan kapıları inşa ediyoruz. Çünkü biz, sizinle birlikte bir yaşam hikâyesi yazıyoruz.",
  },
  {
    text: "Her kapının ardında bir hikâye saklıdır. Hayalinizdeki evin kapısını aralayın ve yeni anılar biriktireceğiniz o özel yeri keşfedin.",
  },
];

const FooterLogoDesc = () => {
  const [state, setState] = useState(null);
  const randomRank = Math.floor(Math.random() * 4);

  useEffect(() => {
    setState(randomRank);
  }, []);
  return (
    <>
      <div className="footer-item__logo">
        <LogoWhite />
      </div>
      <p className="footer-item__desc">{textData[state]?.text}</p>
    </>
  );
};

export default FooterLogoDesc;
