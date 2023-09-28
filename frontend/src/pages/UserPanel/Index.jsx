import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/UserPanel/Sidebar/Sidebar";

import "./Index.css";

export default function Index() {
  return (
    <>
      <Header />
      <section className="content">
        <div className="content-header">
          <div className="container">
            <span className="content-header__title">حساب کاربری من</span>
            <span className="content-header__subtitle">پیشخوان</span>
          </div>
        </div>
        <div className="content-main">
          <div className="container">
            <div className="flex flex-wrap gap-4">
              <Sidebar />
              <Outlet />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
