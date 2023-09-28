import React, { useState } from "react";
import CircleSpinner from "../CircleSpinner/CircleSpinner";
import { Link } from "react-router-dom";

const   ArticleBox = (props) => {
  const [isImgShow, setIsImgShow] = useState(false);

  const isImgLoaded = () => setIsImgShow(true);

  return (
    <div className="shadow-lg rounded-2xl max-w-[350px]" key={props.id}>
      <div className="my-12 transition-all duration-300 ease-in-out cursor-pointer hover:-translate-y-3">
        <div>
          <Link
            to={`/article-info/${props.shortName}`}
            className="article-card__link-img"
          >
            <img
              src={`/images/blog/${props.cover}`}
              className="rounded-t-2xl w-[50rem] h-[30rem] mx-auto"
              alt="Article Cover"
              onLoad={isImgLoaded}
            />
            {!isImgShow && <CircleSpinner />}
          </Link>
        </div>
        <div className="mt-4 mb-12 mx-8">
          <Link to={`/article-info/${props.shortName}`} className="font-bold">
            {props.title}
          </Link>
          <p className="text-[#898989] text-lg pt-4 pb-10">
            {props.description}
          </p>
          <Link
            to={`/article-info/${props.shortName}`}
            className="text-primary border-2 border-solid border-primary text-2xl py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-white hover:bg-primary"
          >
            بیشتر بخوانید
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleBox;
