import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "./../CourseBox/CourseBox";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const PresellCourses = () => {
  const [presellCourses, setPresellCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/v1/courses/presell");
      const presellCoursesData = await res.json();
      if (res.ok) {
        setPresellCourses(presellCoursesData);
        console.log(presellCoursesData);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="my-20">
      <div className="container">
        <SectionHeader
          title="دوره های در حال پیش فروش"
          desc="متن تستی برای توضیحات دوره های پیش فروش"
        />
        <Swiper
          // install Swiper modules
          spaceBetween={50}
          slidesPerView={3}
          className="mySwiper"
          speed={500}
          loop={true}
        >
          {presellCourses.map((course) => (
            <SwiperSlide>{<CourseBox {...course} />}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PresellCourses;
