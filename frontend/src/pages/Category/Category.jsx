import { useState, useEffect } from "react";
import CourseBox from "../../components/CourseBox/CourseBox";
import Pagination from "../../components/Pagination/Pagination";
import Footer from "./../../components/Footer/Footer";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";

const Category = () => {
  const [courses, setCourses] = useState([]);
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);
  const [status, setStatus] = useState("default");
  const [statusTitle, setStatusTitle] = useState("مرتب سازی پیش فرض");
  const [activeItem, setActiveItem] = useState("defaultItem");
  const [searchInput, setSearchInput] = useState("");
  const [courseDisplayType, setCourseDisplayType] = useState("row");

  const { categoryName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:4000/v1/courses/category/${categoryName}`
      );
      const allCourses = await res.json();
      setCourses(allCourses);
      console.log(allCourses);
      setOrderedCourses(allCourses);
    };
    fetchData();
  }, [categoryName]);

  useEffect(() => {
    switch (status) {
      case "free": {
        const freeCourses = courses.filter((course) => course.price === 0);
        setOrderedCourses(freeCourses);
        break;
      }
      case "paid": {
        const paidCourses = courses.filter((course) => course.price !== 0);
        setOrderedCourses(paidCourses);
        break;
      }
      case "last": {
        setOrderedCourses(courses);
        break;
      }
      case "first": {
        const reversedCourses = courses.slice().reverse();

        setOrderedCourses(reversedCourses);
        break;
      }
      case "cheapest": {
        const cheapestCourses = courses.filter(
          (course) => course.price < 250000
        );
        setOrderedCourses(cheapestCourses);
        break;
      }
      case "mostExpensive": {
        const mostExpensiveCourses = courses.filter(
          (course) => course.price > 250000
        );
        setOrderedCourses(mostExpensiveCourses);
        break;
      }
      default: {
        setOrderedCourses(courses);
      }
    }
  }, [status]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const statusTitleChangeHandler = (event) => {
    setStatusTitle(event.target.textContent);
  };

  const activeclassNameHandler = (item) => {
    if (item !== "defaultItem") {
      setActiveItem(null);
    } else {
      setActiveItem(item);
    }

    if (item !== "defaultItem") {
      setActiveItem(item);
    }
  };

  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);

    const filteredCourses = courses.filter((course) =>
      course.name.toLowerCase().includes(event.target.value)
    );

    setOrderedCourses(filteredCourses);
  };

  return (
    <>
      <Header />
      <section className="my-16">
        <div className="container">
          <div className="flex flex-wrap justify-between mt-8">
            {courses.length === 0 ? (
              <div
                className="bg-red-100 rounded-lg border border-b border-red-500 text-red-700 px-4 py-3 mx-2 w-full"
                role="alert"
              >
                <span className="block sm:inline">
                  دوره‌ای در این دسته بندی وجود ندارد.
                </span>
              </div>
            ) : (
              <>
                <div className="flex w-full justify-between items-center p-9 shadow-lg rounded-lg">
                  <div className="flex items-center">
                    <div
                      className={`py-3 px-4 flex items-center justify-center w-16 h-16 rounded-md text-black cursor-pointer border border-solid border-slate-400 ml-4 ${
                        courseDisplayType === "row"
                          ? "courses-top-bar__icon--active"
                          : ""
                      } `}
                      onClick={() => setCourseDisplayType("row")}
                    >
                      <BorderAllIcon className="!text-3xl" />
                    </div>
                    <div
                      className={`py-3 px-4 flex items-center justify-center w-16 h-16 rounded-md text-black cursor-pointer border border-solid border-slate-400 ml-4 ${
                        courseDisplayType === "column"
                          ? "courses-top-bar__icon--active"
                          : ""
                      }`}
                      onClick={() => setCourseDisplayType("column")}
                    >
                      <FormatAlignLeftIcon className="!text-3xl" />
                    </div>

                    <div className="cursor-pointer relative courses-top-bar__selection">
                      <span className="flex items-center h-16 rounded-md py-3 px-8 border border-solid border-slate-400 text-[#7d7e7f] transition-all duration-300 ease-in-out">
                        {statusTitle}
                        <KeyboardArrowDownIcon className="mr-2" />
                      </span>
                      <ul className="opacity-0 invisible absolute shadow-lg bg-white w-full py-3 rounded-md border-b-4 border-solid border-primary z-50 transition-all duration-300 ease-in-out category-dropdown">
                        <li
                          className={`text-[#5f5f5f] text-xl py-3 px-6 transition-all duration-300 ease-in-out ${
                            activeItem === "defaultItem"
                              ? "courses-top-bar__selection-item--active"
                              : ""
                          }`}
                          onClick={(event) => {
                            setStatus("مرتب سازی پیش فرض");
                            statusTitleChangeHandler(event);
                            activeclassNameHandler("defaultItem");
                          }}
                        >
                          مرتب سازی پیش فرض
                        </li>
                        <li
                          onClick={(event) => {
                            setStatus("free");
                            statusTitleChangeHandler(event);
                            activeclassNameHandler("item2");
                          }}
                          className={`text-[#5f5f5f] text-xl py-3 px-6 transition-all duration-300 ease-in-out ${
                            activeItem === "item2"
                              ? "courses-top-bar__selection-item--active"
                              : ""
                          }`}
                        >
                          مرتب سازی دوره های رایگان
                        </li>
                        <li
                          onClick={(event) => {
                            setStatus("paid");
                            statusTitleChangeHandler(event);
                            activeclassNameHandler("item3");
                          }}
                          className={`text-[#5f5f5f] text-xl py-3 px-6 transition-all duration-300 ease-in-out ${
                            activeItem === "item3"
                              ? "courses-top-bar__selection-item--active"
                              : ""
                          }`}
                        >
                          مرتب سازی دوره های پولی
                        </li>
                        <li
                          onClick={(event) => {
                            setStatus("last");
                            statusTitleChangeHandler(event);
                            activeclassNameHandler("item4");
                          }}
                          className={`text-[#5f5f5f] text-xl py-3 px-6 transition-all duration-300 ease-in-out ${
                            activeItem === "item4"
                              ? "courses-top-bar__selection-item--active"
                              : ""
                          }`}
                        >
                          مرتب سازی بر اساس آخرین
                        </li>
                        <li
                          onClick={(event) => {
                            setStatus("first");
                            statusTitleChangeHandler(event);
                            activeclassNameHandler("item5");
                          }}
                          className={`text-[#5f5f5f] text-xl py-3 px-6 transition-all duration-300 ease-in-out ${
                            activeItem === "item5"
                              ? "courses-top-bar__selection-item--active"
                              : ""
                          }`}
                        >
                          مرتب سازی بر اساس اولین
                        </li>
                        <li
                          onClick={(event) => {
                            setStatus("cheapest");
                            statusTitleChangeHandler(event);
                            activeclassNameHandler("item6");
                          }}
                          className={`text-[#5f5f5f] text-xl py-3 px-6 transition-all duration-300 ease-in-out ${
                            activeItem === "item6"
                              ? "courses-top-bar__selection-item--active"
                              : ""
                          }`}
                        >
                          مرتب سازی بر اساس ارزان ترین
                        </li>
                        <li
                          onClick={(event) => {
                            setStatus("mostExpensive");
                            statusTitleChangeHandler(event);
                            activeclassNameHandler("item7");
                          }}
                          className={`text-[#5f5f5f] text-xl py-3 px-6 transition-all duration-300 ease-in-out ${
                            activeItem === "item7"
                              ? "courses-top-bar__selection-item--active"
                              : ""
                          }`}
                        >
                          مرتب سازی بر اساس گران ترین
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <form action="#" className="relative w-[30rem] h-16">
                      <input
                        type="text"
                        placeholder="جستجوی دوره ..."
                        className="text-2xl w-full h-full border border-solid border-slate-400 rounded-md py-3 pr-6 pl-16"
                        value={searchInput}
                        onChange={searchInputHandler}
                      />
                      <SearchIcon className="absolute left-4 top-4 text-slate-500 !text-3xl cursor-pointer" />
                    </form>
                  </div>
                </div>

                {shownCourses.length === 0 ? (
                  <div
                    className="mt-10 bg-red-100 rounded-lg border border-b border-red-500 text-red-700 px-4 py-3 mx-2 w-full"
                    role="alert"
                  >
                    <span className="block sm:inline">
                      هیچ دوره‌ای برای {statusTitle} وجود ندارد.
                    </span>
                  </div>
                ) : (
                  <>
                    {courseDisplayType === "row" ? (
                      <>
                        {shownCourses.map((course) => (
                          <CourseBox {...course} />
                        ))}
                      </>
                    ) : (
                      <>
                        {shownCourses.map((course) => (
                          <div className="w-full">
                            <div className="shadow-lg my-8 rounded-2xl overflow-hidden">
                              <div className="flex">
                                <div>
                                  <Link to={`/course-info/${course.shortName}`}>
                                    <img
                                      src={`/images/courses/${course.cover}`}
                                      className="h-full max-w-sm"
                                    />
                                  </Link>
                                </div>
                                <div className="py-4 px-6 w-full">
                                  <div>
                                    <Link
                                      to={`/course-info/${course.shortName}`}
                                      className="text-3xl font-bold py-4 px-0 block"
                                    >
                                      {course.name}
                                    </Link>
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="text-[#7d7e7f]">
                                      <SchoolIcon />
                                      <span className="text-2xl">
                                        محمد امین سعیدی راد
                                      </span>
                                    </div>
                                    <div className="flex">
                                      {
                                        (course.score = 1 ? (
                                          <img
                                            src="/images/svgs/star_fill.svg"
                                            alt="rating"
                                            className=""
                                          />
                                        ) : null)
                                      }
                                      {
                                        (course.score = 2 ? (
                                          <img
                                            src="/images/svgs/star_fill.svg"
                                            alt="rating"
                                            className=""
                                          />
                                        ) : null)
                                      }
                                      {
                                        (course.score = 3 ? (
                                          <img
                                            src="/images/svgs/star_fill.svg"
                                            alt="rating"
                                            className=""
                                          />
                                        ) : null)
                                      }
                                      {
                                        (course.score = 4 ? (
                                          <img
                                            src="/images/svgs/star_fill.svg"
                                            alt="rating"
                                            className=""
                                          />
                                        ) : null)
                                      }
                                      {
                                        (course.score = 5 ? (
                                          <img
                                            src="/images/svgs/star_fill.svg"
                                            alt="rating"
                                            className=""
                                          />
                                        ) : null)
                                      }
                                    </div>
                                  </div>

                                  <div className="m-4">
                                    <div className="text-2xl text-darkColor">
                                      <p>{course.description}</p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <div className="text-[#7d7e7f]">
                                      <PeopleIcon />
                                      <span>202</span>
                                    </div>
                                    <span className="text-[#7d7e7f]">
                                      {course.price === 0
                                        ? "رایگان"
                                        : course.price.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          {courses.length !== 0 ? (
            <Pagination
              items={orderedCourses}
              itemsCount={3}
              pathname={`/category-info/${categoryName}`}
              setShownCourses={setShownCourses}
            />
          ) : (
            ""
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Category;
