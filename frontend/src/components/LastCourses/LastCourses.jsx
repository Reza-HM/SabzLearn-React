import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";

export default function LastCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/courses");
      const allCourses = await res.json();
      setCourses(allCourses);
      console.log(allCourses);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="my-16">
        <div className="container">
          <SectionHeader
            btnTitle="تمامی دوره ها"
            desc="سکوی پرتاب شما به سمت موفقیت"
            title="جدیدترین دوره ها"
          />
        </div>
        <div>
          <div className="container">
            <div className="flex justify-between items-center flex-wrap">
              {courses
                .splice(0, 6)
                .reverse()
                .map((course) => (
                  <CourseBox {...course} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
