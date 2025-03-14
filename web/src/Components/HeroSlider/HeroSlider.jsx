import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import heroimage from "../../Assets/Group 16.png";

const HeroSlider = () => {
  return (
    <>
      <div className="hero-slider-container position-relative">
        <Swiper
          spaceBetween={20}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          loop={true}
          pagination={{
            clickable: true,
            el: ".custom-pagination", // Custom pagination class
          }}
          modules={[Autoplay, Pagination]}
        >
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <SwiperSlide key={index} className="text-white hero-slider">
                <div
                  className="row w-100 m-0 align-items-center"
                  style={{ height: "100%" }}
                >
                  <div className="col-12 col-md-6 text-center text-md-start vertical-center">
                    <div className="text-white h1 mx-md-5">
                      SPEND PKR 100 <br /> AND GET A CHANCE <br /> TO WIN EXCITING PRIZES.
                    </div>
                  </div>
                  <div className="col-12 col-md-6 d-flex justify-content-center my-4">
                    <div className="heroimage">
                      <img src={heroimage} alt="Hero" className="img-fluid responsive-img" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="custom-pagination text-center mt-4"></div>
      </div>
    </>
  );
};

export default HeroSlider;
