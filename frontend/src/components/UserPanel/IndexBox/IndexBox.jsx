import React from "react";
import { Link } from "react-router-dom";

export default function IndexBox({ title, href }) {
  return (
    <div className="flex-1 basis-1/4">
      <Link to={href} class="main__link p-8 border-2 text-darkColor" href="#">
        {title}
      </Link>
    </div>
  );
}
