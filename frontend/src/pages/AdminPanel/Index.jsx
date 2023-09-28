import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../../components/AdminPanel/Topbar/Topbar";
import Sidebar from "./../../components/AdminPanel/Sidebar/Sidebar";
import "./Index.css";

const Index = () => {
  return (
    <>
      <div id="content">
        <Sidebar />
        <div id="home">
          <Topbar />
          <div className="!w-full" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
