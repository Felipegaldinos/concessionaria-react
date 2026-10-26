import React from "react";

// Ícones vetoriais próprios, sem dependências e com decoração fora da leitura assistiva.
export default function AutoIcon({ type = "car", className = "" }) {
  const paths = {
    sliders: (
      <>
        <path d="M3 6h5m4 0h9M3 12h11m4 0h3M3 18h3m4 0h11" />
        <circle cx="10" cy="6" r="2" />
        <circle cx="16" cy="12" r="2" />
        <circle cx="8" cy="18" r="2" />
      </>
    ),
    calculator: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M8 5h8v4H8zM8 12h1m3 0h1m3 0h0M8 16h1m3 0h1m3 0h0M8 19h1m3 0h1m3 0h0" />
      </>
    ),
    headset: (
      <>
        <path d="M4 13V10a8 8 0 0 1 16 0v3M20 17v1a3 3 0 0 1-3 3h-3" />
        <rect x="2" y="10" width="5" height="9" rx="2" />
        <rect x="17" y="10" width="5" height="9" rx="2" />
        <rect x="10" y="19" width="4" height="3" rx="1" />
      </>
    ),
    car: (
      <>
        <path d="m5 10 2-5h10l2 5M3 10h18v8H3zM6 18v2m12-2v2M6 13h2m8 0h2" />
        <path d="M8 5h8" />
      </>
    ),
    wheel: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
        <path d="m12 7 0 4m5 1h-4m-1 5v-4m-5-1h4M6 5l2 2m8 10 2 2M5 18l2-2M17 8l2-2" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="8" r="5" />
        <path d="m12 12 9 9m-4-4 3-3m-6 0 3-3M6 7h1" />
      </>
    ),
    gauge: (
      <>
        <path d="M4 19a10 10 0 1 1 16 0Z" />
        <path d="m12 14 5-6M5 12h2m10 0h2M8 6l1 2m3-4v2" />
        <circle cx="12" cy="14" r="1" />
      </>
    ),
  };
  return (
    <svg
      className={`auto-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[type] || paths.car}
    </svg>
  );
}
