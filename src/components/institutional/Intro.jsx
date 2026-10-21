import React from "react";

export default function Intro({ tag, title, text }) {
  return (
    <div className="inst-heading">
      <span className="inst-tag">{tag}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
