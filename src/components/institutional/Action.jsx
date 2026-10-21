import React from "react";
import { Link } from "react-router-dom";

export default function Action({ to, children, outline = false }) {
  return (
    <Link className={"btn " + (outline ? "outline" : "")} to={to}>
      {children} <span aria-hidden="true">↗</span>
    </Link>
  );
}
