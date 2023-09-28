import React, { memo, useEffect, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

const Topbar = memo(({ infos }) => {
  const [allTopbarLinks, setAllTopbarLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:4000/v1/menus/topbar`);
      const result = await res.json();
      console.log(result);
      setAllTopbarLinks(result);
    };

    fetchData();
  }, []);

  const getRandomItemsFromArray = (arr, randomCount) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, randomCount);
  };

  return (
    <div className="text-darkColor py-8 bg-slate-200">
      <div className="flex justify-between px-6">
        <div className="flex">
          <ul className="flex items-center">
            {getRandomItemsFromArray(allTopbarLinks, 5).map((link) => (
              <li key={link.id}>
                <Link to={link.href} className="text-darkColor px-4 !text-2xl">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center">
            <a href="#" className="px-3">
              {infos.email}
            </a>
            <EmailIcon className="text-primary !text-4xl" />
          </div>
          <div className="flex items-center">
            <a href="#" className="px-3">
              {infos.phone}
            </a>
            <PhoneIcon className="text-primary !text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Topbar;
