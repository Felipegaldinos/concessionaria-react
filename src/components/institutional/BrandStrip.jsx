import React from "react";

const brands = [
  {
    name: "Chevrolet",
    mark: (
      <>
        <path
          d="M22 12h20V6h18v6h25l-7 13H60v6H42v-6H15Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <text x="50" y="46" textAnchor="middle" fontSize="10" fontWeight="700">
          CHEVROLET
        </text>
      </>
    ),
  },
  {
    name: "Fiat",
    mark: (
      <text
        x="50"
        y="34"
        textAnchor="middle"
        fontSize="32"
        fontWeight="900"
        letterSpacing="-2"
        fontFamily="Arial Narrow, sans-serif"
      >
        FIAT
      </text>
    ),
  },
  {
    name: "Volkswagen",
    mark: (
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      >
        <circle cx="50" cy="25" r="20" />
        <path d="m37 10 13 25 13-25M32 18l12 23 6-12 6 12 12-23M44 7l6 13 6-13" />
      </g>
    ),
  },
  {
    name: "Jeep",
    mark: (
      <text
        x="50"
        y="34"
        textAnchor="middle"
        fontSize="31"
        fontWeight="800"
        fontFamily="Arial, sans-serif"
      >
        Jeep
      </text>
    ),
  },
  {
    name: "Toyota",
    mark: (
      <>
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="50" cy="19" rx="23" ry="13" />
          <ellipse cx="50" cy="19" rx="9" ry="13" />
          <ellipse cx="50" cy="13" rx="18" ry="7" />
        </g>
        <text x="50" y="46" textAnchor="middle" fontSize="12" fontWeight="800">
          TOYOTA
        </text>
      </>
    ),
  },
  {
    name: "Ford",
    mark: (
      <>
        <ellipse cx="50" cy="25" rx="36" ry="16" fill="currentColor" />
        <ellipse
          cx="50"
          cy="25"
          rx="33"
          ry="13"
          fill="none"
          stroke="#fff"
          strokeWidth="0.8"
        />
        <text
          x="50"
          y="33"
          textAnchor="middle"
          fill="#fff"
          fontSize="25"
          fontStyle="italic"
          fontFamily="Georgia, serif"
        >
          Ford
        </text>
      </>
    ),
  },
];

export default function BrandStrip() {
  return (
    <section className="brand-strip" aria-label="Marcas do universo automotivo">
      <ul>
        {brands.map(({ name, mark }) => (
          <li key={name}>
            <svg viewBox="0 0 100 52" role="img" aria-label={name}>
              {mark}
            </svg>
          </li>
        ))}
      </ul>
    </section>
  );
}
