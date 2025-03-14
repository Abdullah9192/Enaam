// PrizesHeroSlider.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import headImage from "../../Assets/Group 16.png";

const PrizesHeroSlider = () => {
  return (
    <div className="h-100 w-100">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay,Navigation]}
        className="mySwiper h-100"
      >
        <SwiperSlide className="slide-bg">
          <div className="prizes-slider h-100 d-flex align-items-center justify-content-center">
            <img src={headImage} className="img-fluid" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide-bg">
          <div className="prizes-slider h-100 d-flex align-items-center justify-content-center">
            <img src={headImage} className="img-fluid" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide-bg">
          <div className="prizes-slider h-100 d-flex align-items-center justify-content-center">
            <img src={headImage} className="img-fluid" alt="" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PrizesHeroSlider;
