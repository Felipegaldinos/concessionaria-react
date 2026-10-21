import React from "react";
import DemoNote from "./DemoNote.jsx";

export default function Frame({ title, subtitle, children }) {
  return (
    <div className="container institutional">
      <div className="breadcrumb">Início / {title}</div>
      <div className="inst-page-heading">
        <span className="inst-tag">CONHEÇA A VÉRTICE</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children}
      <DemoNote />
    </div>
  );
}
