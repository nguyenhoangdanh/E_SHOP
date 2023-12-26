import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { BiGame } from "react-icons/bi";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./styles.css";
import img1 from "./images/banner1.jpg";
import img2 from "./images/banner2.png";
import img3 from "./images/banner3.jpg";
import img4 from "./images/banner4.jpg";
const Hero = () => {
  const proprietes = {
    duration: 3000,
    transitionDuration: 300,
    infinite: true,
    indicators: true,
    arrows: true,
  };

  return (
    <div className="container">
      <div
        className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
        style={{
          backgroundImage:
            "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
        }}
      >
        <div className="containerSlide">
          <Slide {...proprietes}>
            <div className="each-slide">
              <div className="image">
                <img src={img1} alt="img1" />
              </div>
            </div>
            <div className="each-slide">
              <div className="image">
                <img src={img2} alt="img2" />
              </div>
            </div>
            <div className="each-slide">
              <div className="image">
                <img src={img3} alt="img3" />
              </div>
            </div>
            <div className="each-slide">
              <div className="image">
                <img src={img4} alt="img4" />
              </div>
            </div>
          </Slide>
        </div>

        <div className={`${styles.section} absolute w-[90%] 800px:w-[60%] justify-center left-[300px]`}>
          <h1
            className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
          >
            Bộ sưu tập tốt nhất cho <br /> Trang trí nhà cửa
          </h1>
          <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
            assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
            quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
            <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
          </p>
          <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
              <span className="text-[#fff] font-[Poppins] text-[18px]">
                Mua ngay
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
