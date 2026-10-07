import { useState } from "react";
import CantidadInput from "./CantidadInput";
import { formatoCOP, MSG_MAX, MSG_MIN_CATALOGO } from "../productos";

export default function ProductCard({ producto, enCarrito, onAgregar, aviso }) {
  const [cantidad, setCantidad] = useState(1);
  const disponible = producto.stock - enCarrito;

  const agregar = () => {
    onAgregar(producto.id, cantidad);
    setCantidad(1);
  };

  return (
    <article className="tarjeta">
      <h3>{producto.nombre}</h3>
      <p className="precio">{formatoCOP(producto.precio)}</p>
      <p className="stock">
        {disponible > 0 ? `${disponible} disponibles` : "Sin unidades disponibles"}
      </p>
      <div className="fila">
        <CantidadInput
          label={`Cantidad de ${producto.nombre}`}
          value={cantidad}
          max={Math.max(disponible, 1)}
          onChange={setCantidad}
          onMin={() => aviso(MSG_MIN_CATALOGO)}
          onMax={() => aviso(MSG_MAX)}
        />
        <button className="btn" disabled={disponible <= 0} onClick={agregar}>
          Agregar
        </button>
      </div>
    </article>
  );
}
