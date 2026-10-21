import React from "react";
import Breadcrumb from "./Breadcrumb.jsx";

export default function Page({ title, children, subtitle }) {
  return (
    <div className="container inner-page">
      <Breadcrumb title={title} />
      <h1>{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}
