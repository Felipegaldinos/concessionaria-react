import React from "react";
import { photo } from "../../data.js";

export default function InstitutionalPhoto({
  image,
  alt,
  className = "",
  eager = false,
}) {
  return (
    <figure className={"institutional-photo " + className}>
      <img
        src={image.startsWith("/") ? image : photo(image, 1000)}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        width="1000"
        height="650"
      />
      <figcaption>
        {image.startsWith("/images/")
          ? "Ilustração gerada por IA"
          : "Foto ilustrativa"}
      </figcaption>
    </figure>
  );
}
