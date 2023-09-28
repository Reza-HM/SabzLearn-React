import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import "./Breadcrumb.css";

const Breadcrumb = ({links}) => {
  return (
    <section className="my-8">
      <div className="container">
        <div className="flex rounded-2xl py-6 px-8 bg-[#f0f2f7]">
          <div className="flex justify-center items-center w-14 h-14 bg-white rounded-2xl">
            <HomeIcon className="!text-3xl text-[#909aa7]" />
          </div>
          <ul className="flex items-center mr-6">
            {links.map((link) => (
              <li key={link.id}>
                <Link to={`/${link.to}`} className="flex items-center !text-2xl text-[#7f8187] hover:text-[#7f8187]">
                  {link.title}
                  {link.id !== links.length ? (
                    <ChevronLeftIcon className="text-[#7f8187] !text-2xl mx-3" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
