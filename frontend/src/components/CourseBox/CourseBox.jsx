import React, { useState } from "react";
import CircleSpinner from "./../CircleSpinner/CircleSpinner";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const CourseBox = (props) => {
  const [isImgShow, setIsImgShow] = useState(false);

  const onImgLoaded = () => setIsImgShow(true);

  return (
    <div className="" key={props.id}>
      <div className="bg-white relative shadow-lg rounded-2xl my-8 cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-3">
        <Link to={`/course-info/${props.shortName}`}>
          <img
            src={`/images/courses/${props.cover}`}
            alt="Course img"
            className="w-full rounded-t-2xl"
            onLoad={onImgLoaded}
          />
          {!isImgShow && <CircleSpinner />}
        </Link>
        <div className="px-5">
          <Link to={`/course-info/${props.shortName}`} className="block py-4">
            {props.name}
          </Link>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <SchoolIcon className="!text-3xl text-slate-400" />
              <a href="#" className="!text-xl text-slate-400">
                {props.creator}
              </a>
            </div>
            <div className="flex">
              {Array(5 - props.courseAverageScore)
                .fill(0)
                .map((item) => (
                  <img src="/images/svgs/star.svg" alt="score" className="" />
                ))}
              {Array(props.courseAverageScore)
                .fill(0)
                .map((item) => (
                  <img
                    src="/images/svgs/star_fill.svg"
                    alt="score"
                    className=""
                  />
                ))}
            </div>
          </div>

          <div className="flex items-center justify-between my-4">
            <div className="">
              <PeopleIcon className="!text-2xl text-slate-400" />
              <span className="!text-xl text-slate-400 !mr-2">
                {props.registers}
              </span>
            </div>
            <span className="!text-3xl text-slate-400 flex gap-4">
              {props.price !== 0 && (
                <span className="line-through">
                  {props.price.toLocaleString()}
                </span>
              )}

              {props.price === 0
                ? "رایگان"
                : props.price !== 0 &&
                  props.discount && (
                    <span className="courses__box__price-discount">
                      {(
                        props.price -
                        (props.price * props.discount) / 100
                      ).toLocaleString()}
                    </span>
                  )}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center py-6 border-t border-solid border-slate-400">
          <Link
            to={`/course-info/${props.shortName}`}
            className="flex items-center justify-center gap-4 text-primary text-2xl font-bold"
          >
            مشاهده اطلاعات
            <ArrowBackIcon className="!text-3xl" />
          </Link>
        </div>

        {props.price !== 0 && props.discount && (
          <span className="courses-box__discount absolute -left-3 -top-3 bg-primary pt-1 px-5 text-2xl text-white rounded-lg -rotate-12 z-50 transition-all duration-300 ease-linear ">
            {props.discount}%
          </span>
        )}
      </div>
    </div>
  );
};

export default CourseBox;
