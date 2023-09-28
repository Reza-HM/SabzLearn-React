import React, { useState, useEffect } from "react";
import Header from "./../../components/Header/Header";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Footer from "../../components/Footer/Footer";
import Pagination from "../../components/Pagination/Pagination";
import CourseBox from "../../components/CourseBox/CourseBox";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/v1/courses");
      const allCourses = await res.json();
      setCourses(allCourses);
      console.log(allCourses);
    };
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی دوره ها",
            to: "courses/1",
          },
        ]}
      />

      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div>
            <div className="flex flex-wrap gap-20">
              {shownCourses.map((course) => (
                <CourseBox {...course} />
              ))}
            </div>
          </div>

          <Pagination
            items={courses}
            itemsCount={3}
            pathname="/courses"
            setShownCourses={setShownCourses}
          />
        </div>
      </section>
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}

      <Footer />
    </>
  );
};

export default Courses;
