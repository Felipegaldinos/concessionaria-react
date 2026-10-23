import React from "react";
import Home from "../../pages/HomePage.jsx";

export default function Breadcrumb({ title }) {
  return <div className="breadcrumb">Início / {title}</div>;
}
