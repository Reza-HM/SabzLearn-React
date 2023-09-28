import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const SectionHeader = ({ title, desc, btnTitle }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="title">{title}</span>
        <span className="text-slate-400 text-2xl">{desc}</span>
      </div>
      {btnTitle ? (
        <div>
          <Link
            to={btnTitle === "تمامی دوره ها" ? "/courses/1" : "/articles/1"}
            className="flex items-center justify-center gap-4 border-4 border-solid border-transparent text-white bg-primary py-2 px-4 rounded-lg hover:text-primary hover:bg-white hover:border-primary"
          >
            {btnTitle}
            <ArrowBackIcon className="text-2xl" />
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default SectionHeader;
