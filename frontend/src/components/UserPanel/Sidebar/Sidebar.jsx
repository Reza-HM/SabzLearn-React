import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import AuthContext from "../../../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = (event) => {
    event.preventDefault();

    swal({
      title: "آیا می‌خواهید از پنل کاربری خود لاگ اوت کنید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then((result) => {
      if (result) {
        swal({
          title: "با موفقیت لاگ‌اوت شدید.",
          icon: "success",
          buttons: "اوکی",
        }).then(() => {
          authContext.logout();
          navigate("/");
        });
      }
    });
  };

  return (
    <div className="flex-1">
      <div className="sidebar">
        <span className="sidebar__name text-primary text-3xl drop-shadow-md">
          محمدامین سعیدی راد
        </span>
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <NavLink className="sidebar__link" to="/my-account/">
              پیشخوان
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink className="sidebar__link" to="/my-account/orders">
              سفارش
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink className="sidebar__link" to="/my-account/my-wallet">
              کیف پول من
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink className="sidebar__link" to="/my-account/edit-account">
              جزئیات حساب کاربری
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink className="sidebar__link" to="/my-account/courses">
              دوره های خریداری شده
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink className="sidebar__link" to="/my-account/tickets">
              تیکت های پشتیبانی
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink className="sidebar__link" to="/" onClick={logoutUser}>
              خروج از سیستم
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
