import React, { useState, useEffect } from "react";
import Header from "./../../components/Header/Header";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import Pagination from "../../components/Pagination/Pagination";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";

const Courses = () => {
  const [articles, setArticles] = useState([]);
  const [shownArticles, setShownArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:4000/v1/articles");
      const allArticles = await res.json();
      setArticles(allArticles);
      console.log(allArticles);
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
            title: "تمامی مقاله ها",
            to: "articles/1",
          },
        ]}
      />

      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div>
            <div className="flex flex-wrap gap-20">
              {shownArticles
                .filter((article) => article.publish === 1)
                .map((article) => (
                  <ArticleBox {...article} />
                ))}
            </div>
          </div>

          <Pagination
            items={articles}
            itemsCount={3}
            pathname="/articles"
            setShownCourses={setShownArticles}
          />
        </div>
      </section>
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}

      <Footer />
    </>
  );
};

export default Courses;
