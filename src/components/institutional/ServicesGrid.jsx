import React from "react";
import { Link } from "react-router-dom";
import { services } from "../../data/institutional.js";

export default function ServicesGrid({}) {
  return (
    <div className="inst-services">
      {services.map(([n, t, p, action, url]) => (
        <article key={n}>
          <span className="service-number">{n}</span>
          <h3>{t}</h3>
          <p>{p}</p>
          <Link to={url}>{action} →</Link>
        </article>
      ))}
    </div>
  );
}
