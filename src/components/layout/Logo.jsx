import React from "react";
import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link className="logo" to="/">
      <span className="brand-symbol">
        v<span>↗</span>
      </span>
      <span>
        vértice<b>motors</b>
      </span>
    </Link>
  );
}
