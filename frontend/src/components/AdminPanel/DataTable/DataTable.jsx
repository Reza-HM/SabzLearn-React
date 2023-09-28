import React from "react";

export default function DataTable({ children, title }) {
  return (
    <div className="container px-16">
      <div className="home-content-latset-users">
        <div className="home-content-users-title">
          <span>
            لیست <span className="signup">{title}</span>
          </span>
        </div>
        <div className="home-content-users-table">
          {
              children
          }
        </div>
      </div>
    </div>
  );
}
