import React from "react";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const CourseDetailBox = ({ icon, title, text }) => {
  // Use a mapping of icon names to actual icon components
  const iconMap = {
    School: SchoolIcon, // Add more icons as needed
    AccessTime: AccessTimeIcon,
    CalendarMonth: CalendarMonthIcon,
    ContactSupport: ContactSupportIcon,
    HelpCenter: HelpCenterIcon,
    Play: PlayCircleOutlineIcon,
  };

  // Check if the icon name exists in the map, and use it if it does
  const IconComponent = iconMap[icon] || SchoolIcon; // Default to SchoolIcon if icon is not found

  return (
    <div>
      <div className="flex rounded-lg py-7 px-8 shadow-lg my-4">
        <div className="flex justify-center items-center">
          <IconComponent className="!text-6xl text-primary" />
        </div>
        <div className="flex flex-col mr-6 gap-2">
          <span className="text-2xl text-[#858c96]">{title}</span>
          <span className="text-2xl text-[#7d7e7f]">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailBox;
