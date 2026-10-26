import React from "react";
import Breadcrumb from "./Breadcrumb.jsx";
import AutomotiveBanner from "./AutomotiveBanner.jsx";
import { useLocation } from "react-router-dom";

export default function Page({ title, children, subtitle }) {
  const { pathname } = useLocation();
  return (
    <div className="container inner-page" data-page={pathname}>
      <Breadcrumb title={title} />
      <AutomotiveBanner title={title} subtitle={subtitle} />
      {children}
    </div>
  );
}
