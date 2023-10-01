import React, { useEffect, useState } from "react";
import Topbar from "../Topbar/Topbar";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  const [indexInfos, setIndexInfos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://sabzlearnreactserver.iran.liara.run:4000/v1/infos/index"
      );
      const infos = await res.json();
      console.log(infos);
      setIndexInfos(infos);
    };
    fetchData();
  }, []);

  return (
    <div className="sticky top-0 left-0 w-full z-50">
      <Topbar infos={indexInfos} />
      <Navbar />
    </div>
  );
};

export default Header;
