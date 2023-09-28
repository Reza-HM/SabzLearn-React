import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthContext from "../../../contexts/authContext";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutAdmin = (event) => {
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
    <div id="sidebar" className="w-[250px]">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Link to="/">
            <img src="/images/logo/Logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="sidebar-menu-btn"></div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <NavLink to="/p-admin/">
              <span>صفحه اصلی</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/courses">
              <span>دوره ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/menus">
              <span>منو ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/articles">
              <span>مقاله ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/users">
              <span>کاربران</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/sessions">
              <span>جلسات</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/offs">
              <span>کدهای تخفیف</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/campaigns">
              <span>تخفیف همگانی</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/categories">
              <span>دسته‌بندی‌ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/messages">
              <span>پیام‌ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/comments">
              <span>کامنت‌ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/p-admin/tickets">
              <span>تیکت‌ها</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={logoutAdmin}>
              <span>خروج</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
