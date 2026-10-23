import React, { useState, useRef, useEffect, useId } from "react";
function GalleryDialog({ photos, index, setIndex, onClose }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement;
    ref.current.showModal();
    return () => {
      ref.current?.close();
      previous?.focus();
    };
  }, []);
  const next = (delta) =>
    setIndex((index + delta + photos.length) % photos.length);
  return (
    <dialog
      ref={ref}
      className="gallery-dialog"
      aria-labelledby={titleId}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          next(-1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          next(1);
        }
      }}
    >
      <div className="gallery-dialog-heading">
        <h2 id={titleId}>{photos[index].label}</h2>
        <button onClick={onClose} aria-label="Fechar galeria">
          ×
        </button>
      </div>
      <img src={photos[index].src} alt={photos[index].alt} />
      <div className="gallery-navigation">
        <button onClick={() => next(-1)} aria-label="Imagem anterior">
          ←
        </button>
        <span>
          {index + 1} de {photos.length} · Imagem gerada por IA
        </span>
        <button onClick={() => next(1)} aria-label="Próxima imagem">
          →
        </button>
      </div>
    </dialog>
  );
}
export default function VehicleGallery({ car }) {
  const [index, setIndex] = useState(0),
    [open, setOpen] = useState(false);
  const photos = car.gallery;
  return (
    <section
      className="vehicle-gallery"
      aria-label={"Galeria de " + car.brand + " " + car.name}
    >
      <button
        className="gallery-main"
        onClick={() => setOpen(true)}
        aria-label={"Ampliar imagem: " + photos[index].label}
      >
        <img
          src={photos[index].src}
          alt={photos[index].alt}
          width="1440"
          height="960"
        />
        <span>
          ⤢ Ampliar · {index + 1}/{photos.length}
        </span>
      </button>
      <div className="gallery-thumbnails" aria-label="Escolher imagem">
        {photos.map((p, i) => (
          <button
            key={p.src}
            aria-label={"Ver " + p.label}
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
          >
            <img loading="lazy" src={p.src} alt="" width="240" height="160" />
            <span>{p.label}</span>
          </button>
        ))}
      </div>
      <p className="demo-note">
        Galeria ilustrativa gerada por IA. Exterior, cor e acabamento podem
        diferir de um veículo real. Solicite fotos e inspeção reais antes da
        compra.
      </p>
      {open && (
        <GalleryDialog
          photos={photos}
          index={index}
          setIndex={setIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}
