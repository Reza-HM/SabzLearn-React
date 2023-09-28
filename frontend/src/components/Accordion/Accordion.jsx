import React, { useState, useEffect } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";

function Accordion({ sessions, courseName, access }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-8" id="accordionExample">
      <div className="bg-[#f7f9fa] rounded-2xl overflow-hidden">
        <h2 className="accordion-header" id="headingOne">
          <button
            className={`accordion-button bg-[#f7f9fa] text-2xl p-5 ${
              isExpanded ? "bg-gray-200" : ""
            }`}
            type="button"
            onClick={toggleAccordion}
          >
            <h2 className="text-2xl font-bold bg-slate-200 text-primary py-2 px-4 rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 ease-linear">
              جلسات دوره
            </h2>
          </button>
        </h2>
        <div
          id="collapseOne"
          className={`p-4  border-t border-solid border-slate-300 ${
            isExpanded ? "block" : "hidden"
          }`}
          aria-labelledby="headingOne"
        >
          {sessions.map((session, index) => (
            <div
              key={session.id}
              className="accordion-body flex justify-between items-center py-6 px-5"
            >
              <div className="flex items-center">
                <span className="w-14 h-14 border border-solid border-[#bfbfbf] text-[#656564] flex items-center justify-center rounded-[50%]">
                  {index + 1}
                </span>
                <YouTubeIcon className="mx-6 text-[#939aa3] text-3xl" />
                {session.free === 0 && access === false ? (
                  <span className="text-slate-400 cursor-default">
                    {" "}
                    {session.title}
                  </span>
                ) : (
                  <Link
                    to={`/${courseName}/${session._id}`}
                    className="text-[#161616]"
                  >
                    {session.title}
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-4">
                {session.free === 0 && access === false ? (
                  <LockIcon className="!text-3xl text-slate-500" />
                ) : (
                  <LockOpenIcon className="!text-3xl text-slate-500" />
                )}
                <span className="text-[#7a7a7a]">{session.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
