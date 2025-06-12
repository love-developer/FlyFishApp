'use client'; // if you're using Next.js 13+

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import styles from './module.styles.css';

const ImageSlider = ({ slides }) => {
  return (
    <div className= "sliderContainer">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.custom-next',
        }}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="imageSection">
              <img src={slide.image} alt="Slide" className="images" />
              <div className="imageCaption">
                <h3>{slide.heading}</h3>
                <p>{slide.caption}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-next">
      <div className="arrowButton">
        <img src="/next.png" />
      </div>
      </div>
    </div>
  );
};

export default ImageSlider;
