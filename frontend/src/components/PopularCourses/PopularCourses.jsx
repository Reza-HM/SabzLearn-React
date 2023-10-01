import React, { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "./../CourseBox/CourseBox";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/courses/popular");
      const popularCoursesData = await res.json();
      if (res.ok) {
        setPopularCourses(popularCoursesData);
        console.log(popularCoursesData);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="my-20">
      <div className="container">
        <SectionHeader
          title="محبوب‌ترین دوره‌ها"
          desc="محبوب‌ترین دوره‌ها بر اساس امتیازدهی دانشجوها"
        />
        <Swiper
          // install Swiper modules
          spaceBetween={50}
          slidesPerView={3}
          className="mySwiper"
          speed={500}
          loop={true}
        >
          {popularCourses.map((course) => (
            <SwiperSlide>{<CourseBox {...course} />}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularCourses;
