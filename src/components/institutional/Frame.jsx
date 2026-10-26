import React from "react";
import DemoNote from "./DemoNote.jsx";
import AutomotiveBanner from "../common/AutomotiveBanner.jsx";

export default function Frame({ title, subtitle, children }) {
  return (
    <div className="container institutional">
      <div className="breadcrumb">Início / {title}</div>
      <AutomotiveBanner title={title} subtitle={subtitle} institutional />
      {children}
      <DemoNote />
    </div>
  );
}
