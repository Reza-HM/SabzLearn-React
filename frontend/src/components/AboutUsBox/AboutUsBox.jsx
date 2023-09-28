import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";

const AboutUsBox = ({ title, desc, icon }) => {
  return (
    <div className="basis-1/2 max-w-4xl">
      <div className="flex items-center shadow-lg rounded-2xl my-8 py-8 px-6">
        <div>
          <CopyrightIcon className="text-[#666] !text-[6.5rem]" />
        </div>
        <div className="flex flex-col mr-4">
          <span className="font-bold text-3xl">{title}</span>
          <span>{desc}</span>
        </div>
      </div>
    </div>
  );
};

export default AboutUsBox;
