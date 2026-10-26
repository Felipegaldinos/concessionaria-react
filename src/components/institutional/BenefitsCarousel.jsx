import React, { useEffect, useRef } from "react";
import AutoIcon from "../common/AutoIcon.jsx";

const benefits = [
  ["car", "Novos e seminovos"],
  ["gauge", "Financiamento facilitado"],
  ["key", "Entrega imediata"],
  ["wheel", "Troca com avaliação justa"],
  ["key", "Pós-venda especializado"],
];

export default function BenefitsCarousel() {
  const track = useRef(null);
  const interactionUntil = useRef(0);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 600px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setInterval(() => {
      const el = track.current;
      if (
        !el ||
        !mobile.matches ||
        reduced.matches ||
        document.hidden ||
        Date.now() < interactionUntil.current
      )
        return;
      const index = Math.round(el.scrollLeft / el.clientWidth);
      el.scrollTo({
        left: ((index + 1) % benefits.length) * el.clientWidth,
        behavior: "smooth",
      });
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);
  const hold = () => {
    interactionUntil.current = Date.now() + 6500;
  };
  return (
    <div
      className="benefits-carousel"
      role="region"
      aria-label="Diferenciais Vértice Motors"
    >
      <div
        ref={track}
        className="inst-principles container"
        tabIndex={0}
        aria-label="Benefícios: deslize para ver mais"
        onPointerDown={hold}
        onKeyDown={hold}
        onFocus={hold}
      >
        {benefits.map(([icon, label]) => (
          <span key={label}>
            <AutoIcon type={icon} />
            <b>{label}</b>
          </span>
        ))}
      </div>
    </div>
  );
}
