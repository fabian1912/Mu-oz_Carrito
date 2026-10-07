import { useEffect, useMemo, useState } from "react";
import { PRODUCTOS, MSG_MAX, MSG_MIN_CARRITO } from "./productos";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Carrito from "./components/Carrito";
import Toasts, { useToasts } from "./components/Toasts";

const CLAVE = "tienda-palmira-carrito";

// El carrito guarda solo { id, cantidad }; el resto se deriva del catálogo
function cargarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE)) ?? [];
    return guardado.filter((l) => PRODUCTOS.some((p) => p.id === l.id));
  } catch {
    return [];
  }
}

export default function App() {
  const [items, setItems] = useState(cargarCarrito);
  const [abierto, setAbierto] = useState(false);
  const { toasts, mostrar, cerrar } = useToasts();

  useEffect(() => localStorage.setItem(CLAVE, JSON.stringify(items)), [items]);

  const lineas = useMemo(
    () => items.map((i) => ({ producto: PRODUCTOS.find((p) => p.id === i.id), cantidad: i.cantidad })),
    [items]
  );
  const totalUnidades = items.reduce((s, i) => s + i.cantidad, 0);
  const total = lineas.reduce((s, l) => s + l.producto.precio * l.cantidad, 0);
  const enCarrito = (id) => items.find((i) => i.id === id)?.cantidad ?? 0;

  // Agregar desde el catálogo: suma a la línea existente y nunca supera el stock
  const agregar = (id, n) => {
    const { stock } = PRODUCTOS.find((p) => p.id === id);
    const nueva = enCarrito(id) + n;
    if (nueva > stock) mostrar(MSG_MAX);
    const final = Math.min(nueva, stock);
    setItems((prev) =>
      prev.some((i) => i.id === id)
        ? prev.map((i) => (i.id === id ? { ...i, cantidad: final } : i))
        : [...prev, { id, cantidad: final }]
    );
  };

  const cambiarCantidad = (id, cantidad) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)));

  const quitar = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const pedirEliminar = (id) =>
    mostrar(MSG_MIN_CARRITO, { texto: "Sí, eliminar", onClick: () => quitar(id) });

  return (
    <>
      <Navbar unidades={totalUnidades} onAbrirCarrito={() => setAbierto(true)} />

      <main className="catalogo">
        {PRODUCTOS.map((p) => (
          <ProductCard key={p.id} producto={p} enCarrito={enCarrito(p.id)} onAgregar={agregar} aviso={mostrar} />
        ))}
      </main>

      <Carrito
        abierto={abierto}
        lineas={lineas}
        totalUnidades={totalUnidades}
        total={total}
        onCerrar={() => setAbierto(false)}
        onCantidad={cambiarCantidad}
        onQuitar={quitar}
        onMinimo={pedirEliminar}
        aviso={mostrar}
      />

      <Toasts toasts={toasts} onClose={cerrar} />
    </>
  );
}
