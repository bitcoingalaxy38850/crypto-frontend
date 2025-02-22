import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules"; // Import Pagination module

import { items } from "../../utils/constant";

const Carousel = () => {
  return (
    <div className="relative w-full h-[430px] mb-12">
      <Swiper
        className="mySwiper p-5 md:p-12" // Adjust padding for small screens
        modules={[Navigation, Autoplay, Pagination]} // Include Pagination module
        pagination={{
          clickable: true, // Allow pagination to be clickable
        }}
        navigation={{
          nextEl: ".swiper-button-next-group .swiper-button-next, .swiper-button-next-group .swiper-button-next-2",
          prevEl: ".swiper-button-prev-group .swiper-button-prev, .swiper-button-prev-group .swiper-button-prev-2",
        }}
        style={{ width: "100%", height: "100%" }}
        slidesPerView={1} // Show only one slide
        spaceBetween={20} // Space between slides
        autoplay={{
          delay: 5000, // Delay between transitions (5 seconds)
          disableOnInteraction: false, // Continue autoplay after interaction
        }}
        speed={800} // Slow down the transition speed (800 milliseconds)
        breakpoints={{
          // Define breakpoints for responsive behavior
          640: {
            slidesPerView: 1, // 1 slide for small screens
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1, // 1 slide for medium screens
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 1, // 1 slide for large screens
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 1, // 1 slide for extra-large screens
            spaceBetween: 40,
          },
        }}
      >
        {items.map((slide, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="flex flex-col items-center justify-center text-center h-full"> {/* Center the content vertically */}
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-[280px] h-[280px] mb-4 lg:w-[320px] lg:h-[320px]" // Adjust image size for larger screens
              />
              <h3 className="text-[18px] lg:text-[20px] font-semibold mb-2 text-white">{slide.name}</h3>
              <div className="flex gap-2">
                <span className="text-[14px] lg:w-[400px] w-[200px] mb-5 text-gray-300">{slide.experience}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute swiper-button-next-group">
          <div className="swiper-button-next mr-5"></div>
          <div className="swiper-button-next swiper-button-next-2"></div>
        </div>
        <div className="absolute swiper-button-prev-group">
          <div className="swiper-button-prev ml-5"></div>
          <div className="swiper-button-prev swiper-button-prev-2"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;
