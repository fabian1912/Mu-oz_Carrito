import { useEffect } from "react";
import CantidadInput from "./CantidadInput";
import { formatoCOP, MSG_MAX } from "../productos";

export default function Carrito({
  abierto, lineas, totalUnidades, total,
  onCerrar, onCantidad, onQuitar, onMinimo, aviso,
}) {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onCerrar();
    if (abierto) window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [abierto, onCerrar]);

  return (
    <>
      {abierto && <div className="velo" onClick={onCerrar} />}
      <aside className={`panel ${abierto ? "abierto" : ""}`} aria-hidden={!abierto} aria-label="Carrito de compras">
        <div className="panel-cab">
          <h2>Tu carrito</h2>
          <button className="toast-x" aria-label="Cerrar carrito" onClick={onCerrar}>×</button>
        </div>

        {lineas.length === 0 ? (
          <p className="vacio">Aún no has agregado productos. Elige uno del catálogo.</p>
        ) : (
          <ul className="lineas">
            {lineas.map(({ producto: p, cantidad }) => (
              <li key={p.id} className="linea">
                <div className="linea-info">
                  <strong>{p.nombre}</strong>
                  <span>{formatoCOP(p.precio)} c/u</span>
                </div>
                <div className="fila">
                  <button className="btn-mini" aria-label={`Restar una unidad de ${p.nombre}`}
                    onClick={() => (cantidad <= 1 ? onMinimo(p.id) : onCantidad(p.id, cantidad - 1))}>−</button>
                  <CantidadInput
                    label={`Cantidad de ${p.nombre} en el carrito`}
                    value={cantidad}
                    max={p.stock}
                    onChange={(n) => onCantidad(p.id, n)}
                    onMin={() => onMinimo(p.id)}
                    onMax={() => aviso(MSG_MAX)}
                  />
                  <button className="btn-mini" aria-label={`Sumar una unidad de ${p.nombre}`}
                    onClick={() => (cantidad >= p.stock ? aviso(MSG_MAX) : onCantidad(p.id, cantidad + 1))}>+</button>
                  <strong className="subtotal">{formatoCOP(p.precio * cantidad)}</strong>
                  <button className="btn-quitar" aria-label={`Quitar ${p.nombre}`} onClick={() => onQuitar(p.id)}>Quitar</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="totales">
          <p><span>Total de unidades</span><strong>{totalUnidades}</strong></p>
          <p className="gran-total"><span>Total de la compra</span><strong>{formatoCOP(total)}</strong></p>
        </div>
      </aside>
    </>
  );
}
