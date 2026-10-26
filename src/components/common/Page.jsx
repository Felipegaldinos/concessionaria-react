import React from "react";
import Breadcrumb from "./Breadcrumb.jsx";
import AutomotiveBanner from "./AutomotiveBanner.jsx";

export default function Page({ title, children, subtitle }) {
  return (
    <div className="container inner-page">
      <Breadcrumb title={title} />
      <AutomotiveBanner title={title} subtitle={subtitle} />
      {children}
    </div>
  );
}
