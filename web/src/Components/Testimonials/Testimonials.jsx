import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./Testimonials.css";
import women from "../../Assets/Group.png";
import { Autoplay, Navigation } from "swiper/modules";

const Testimonials = () => {
  const slides = [
    {
      name: "User 1",
      prize: "Mobile",
      message: `"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."`,
      userImage: women,
    },
    {
      name: "User 2",
      prize: "Mobile",
      message: `"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."`,
      userImage: women,
    },
    {
      name: "User 3",
      prize: "Mobile",
      message: `"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."`,
      userImage: women,
    },
    {
      name: "User 4",
      prize: "Mobile",
      message: `"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."`,
      userImage: women,
    },
    {
      name: "User 5",
      prize: "Mobile",
      message: `"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."`,
      userImage: women,
    },
  ];

  return (
    <div className="container-fluid testimonials-bg align-content-center mt-5">
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-3 align-content-center justify-content-center">
          <div className="user-reviews mb-md-0 mb-3">User Reviews</div>
          <div className="customArrows">
            <button className="slider-prev">❮</button>
            <button className="slider-next">❯</button>
          </div>
        </div>
        <div className="col-md-8 p-0">
          <div className="w-100">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              loop={true}
              spaceBetween={20}
              modules={[Autoplay,Navigation]}
              slidesPerView={1.4}
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".slider-next", // Unique class for each slider if you want add buttons for other sliders
                prevEl: ".slider-prev", // Unique class
              }}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index} className="swiper-slide py-5">
                  <div className="slide-content p-3">
                    <div className="review-head">
                      <div
                        className="user-img"
                      >
                        <img
                          src={slide.userImage}
                          className="img-fluid rounded-circle"
                          alt=""
                        />
                      </div>
                      <div className="user-info px-2 py-md-0 pt-2">
                        <span>{slide.name}</span>
                        <p>{slide.prize}</p>
                      </div>
                    </div>
                    <span className="review-message">{slide.message}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="slider-arrows">
            <button className="slider-prev">❮</button>
            <button className="slider-next">❯</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
