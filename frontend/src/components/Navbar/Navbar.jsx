import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/authContext";
import { useContext } from "react";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [allMenus, setAllMenus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://sabzlearnreactserver.iran.liara.run:4000/v1/menus");
      const result = await res.json();
      console.log(result);
      setAllMenus(result);
    };

    fetchData();
  }, []);

  return (
    <div className="shadow-md bg-white">
      <div className="flex justify-between items-center py-8 px-6">
        <div className="flex gap-4">
          <Link to="/">
            <img src="/images/logo/Logo.png" className="" alt="لوگوی سبزلرن" />
          </Link>
          <ul className="flex">
            <li className="flex justify-center items-center relative px-4">
              <Link
                to="/"
                className="flex justify-center items-center relative text-slate-400"
              >
                صفحه اصلی
              </Link>
            </li>

            {allMenus.map((menu) => (
              <li
                key={menu.id}
                className="flex justify-center items-center relative px-4 header-item"
              >
                <Link
                  to={`${menu.href}/1`}
                  className="flex justify-center items-center relative text-slate-400"
                >
                  {menu.title}

                  {menu.submenus.length !== 0 && (
                    <>
                      <KeyboardArrowDownIcon className="mr-4" />
                      <ul className="absolute top-[5.5rem] left-0 right-0 bg-white transition-all duration-200 ease-in-out shadow-lg rounded-lg w-96 z-10 py-4 border-b-4 border-solid border-primary opacity-0 invisible dropdown">
                        {menu.submenus.map((submenu) => (
                          <li
                            key={submenu.id}
                            className="main-header__dropdown-item"
                          >
                            <Link
                              to={submenu.href}
                              className="block py-3 px-8 text-2xl text-darkColor"
                            >
                              {submenu.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="flex justify-center items-center w-16 h-16 rounded-lg bg-primary"
          >
            <SearchIcon className="!text-[2.2rem] text-white" />
          </a>
          <Link
            to={authContext.isLoggedIn ? "/my-account/" : "/login"}
            className="flex justify-center items-center w-16 h-16 rounded-lg text-darkColor hover:text-blue-500 bg-[#f0f2f7]"
          >
            <ShoppingCartIcon className="!text-[2.2rem] transition-all duration-300 ease-in" />
          </Link>

          {authContext.isLoggedIn ? (
            <Link
              to="#"
              className="flex items-center px-6 border-2 border-solid border-primary rounded-lg text-primary h-16 hover:text-white hover:bg-primary"
            >
              <span>{authContext.userInfos.name}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-6 border-2 border-solid border-primary rounded-lg text-primary h-16 hover:text-white hover:bg-primary"
            >
              <span>ورود / ثبت نام</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
