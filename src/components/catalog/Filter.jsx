import React from "react";

export default function Filter({ title, value, set, options }) {
  return (
    <details className="filter-group" open={value ? true : undefined}>
      <summary>
        {title}
        <span>{value ? "●" : "⌄"}</span>
      </summary>
      <select
        aria-label={title}
        value={value}
        onChange={(e) => set(e.target.value)}
      >
        <option value="">Todos</option>
        {options.map((o) => (
          <option
            key={Array.isArray(o) ? o[0] : o}
            value={Array.isArray(o) ? o[0] : o}
          >
            {Array.isArray(o) ? o[1] : o}
          </option>
        ))}
      </select>
    </details>
  );
}
