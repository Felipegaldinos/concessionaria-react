import React from "react";
import { Link } from "react-router-dom";
import { services } from "../../data/institutional.js";
import AutoIcon from "../common/AutoIcon.jsx";

export default function ServicesGrid({}) {
  return (
    <div className="inst-services">
      {services.map(([n, t, p, action, url]) => (
        <article key={n}>
          <span className="service-number">
            <AutoIcon
              type={
                { "01": "car", "02": "key", "03": "gauge", "04": "wheel" }[n]
              }
            />
          </span>
          <h3>{t}</h3>
          <p>{p}</p>
          <Link to={url}>{action} →</Link>
        </article>
      ))}
    </div>
  );
}
