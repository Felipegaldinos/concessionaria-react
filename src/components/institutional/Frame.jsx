import React from "react";
import DemoNote from "./DemoNote.jsx";
import AutomotiveBanner from "../common/AutomotiveBanner.jsx";
import { useLocation } from "react-router-dom";

export default function Frame({ title, subtitle, children }) {
  const { pathname } = useLocation();
  return (
    <div
      className="container institutional interior-institutional"
      data-page={pathname}
    >
      <div className="breadcrumb">Início / {title}</div>
      <AutomotiveBanner title={title} subtitle={subtitle} institutional />
      {children}
      <DemoNote />
    </div>
  );
}
