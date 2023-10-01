import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import ArticleBox from "../ArticleBox/ArticleBox";

const LastArticles = () => {
  const [allArticles, setAllArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/articles");
      const articles = await res.json();

      if (res.ok) {
        setAllArticles(articles);
        console.log(articles);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="my-20">
      <div className="container">
        <SectionHeader
          title="جدیدترین مقاله ها"
          desc="پیش به سوی ارتقای دانش"
          btnTitle="تمامی مقاله ها"
        />

        <div className="flex flex-wrap justify-between items-center gap-4">
          {allArticles
            .filter((article) => article.publish === 1)
            .slice(0, 6)
            .map((article) => (
              <ArticleBox {...article} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default LastArticles;
