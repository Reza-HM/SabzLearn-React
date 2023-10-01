import React, { useState, useEffect } from "react";
import Footer from "./../../components/Footer/Footer";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import CourseBox from "../../components/CourseBox/CourseBox";
import ArticleBox from "../../components/ArticleBox/ArticleBox";
import { useParams } from "react-router-dom";
import Header from "./../../components/Header/Header";

const Search = () => {
  const [allArticles, setAllArticles] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const { value } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://sabzlearnreactserver.iran.liara.run:4000/v1/search/${value}`);
      const searchResults = await res.json();

      if (res.ok) {
        setAllArticles(searchResults.allResultArticles);
        setAllCourses(searchResults.allResultCourses);
      }
    };
    fetchData();
  }, [value]);

  return (
    <>
      <Header />
      <div className="my-16">
        <div className="container">
          <SectionHeader
            title="نتیجه جستجوی دوره‌ها"
            desc="سکوی پرتاب شما به سمت موفقیت"
          />
          {allCourses.length === 0 ? (
            <div
              className="my-16 bg-red-100 rounded-lg border border-b border-red-500 text-red-700 px-4 py-3 mx-2 w-full"
              role="alert"
            >
              <span className="block sm:inline">
                دوره‌ای برای جستجوی مدنظر شما وجود ندارد
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {allCourses.map((course) => (
                <CourseBox {...course} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="my-16">
        <div className="container">
          <SectionHeader
            title="نتیجه جستجوی مقالات"
            desc="پیش به سوی ارتقای دانش"
          />
          {allArticles.length === 0 ? (
            <div
              className="my-16 bg-red-100 rounded-lg border border-b border-red-500 text-red-700 px-4 py-3 mx-2 w-full"
              role="alert"
            >
              <span className="block sm:inline">
                مقاله‌ای برای جستجوی مدنظر شما وجود ندارد
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {allArticles.map((article) => (
                <ArticleBox {...article} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Search;
