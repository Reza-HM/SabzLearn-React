import React from "react";

export default function FooterItem({ title, children }) {
  return (
    <div className="basis-1/3 max-w-xl">
      <div>
        <span className="block font-bold text-3xl mb-8 relative before:absolute before:w-[3.5rem] before:h-[3.5rem] before:bg-primary before:rounded-xl before:right-4 before:opacity-30 before:rotate-45">
          {title}
        </span>

        {children}
      </div>
    </div>
  );
}
