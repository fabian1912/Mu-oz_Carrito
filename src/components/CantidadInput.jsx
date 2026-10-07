import { useEffect, useState } from "react";

const TECLAS_BLOQUEADAS = ["e", "E", "+", "-", ".", ","];

/**
 * Campo de cantidad reutilizable (catálogo y carrito).
 * Solo enteros positivos. Avisa con onMin / onMax en vez de aceptar valores inválidos.
 */
export default function CantidadInput({ value, max, onChange, onMin, onMax, label }) {
  const [texto, setTexto] = useState(String(value));

  // Mantiene el campo sincronizado cuando el valor cambia desde fuera (botones +/-)
  useEffect(() => setTexto(String(value)), [value]);

  const handleKeyDown = (e) => {
    if (TECLAS_BLOQUEADAS.includes(e.key)) e.preventDefault();
  };

  const handlePaste = (e) => {
    const pegado = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pegado)) {
      e.preventDefault();
      return;
    }
    // Dígitos válidos: se procesa igual que escribirlos
    e.preventDefault();
    procesar(pegado);
  };

  const procesar = (v) => {
    if (!/^\d*$/.test(v)) return; // red de seguridad
    if (v === "") return setTexto(""); // permite borrar para reescribir
    const n = parseInt(v, 10);
    if (n < 1) {
      setTexto(String(value)); // conserva el valor anterior
      onMin?.();
    } else if (n > max) {
      setTexto(String(max));
      onChange(max);
      onMax?.();
    } else {
      setTexto(String(n));
      onChange(n);
    }
  };

  return (
    <input
      className="cantidad"
      type="number"
      inputMode="numeric"
      min="1"
      step="1"
      aria-label={label}
      value={texto}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onChange={(e) => procesar(e.target.value)}
      onBlur={() => texto === "" && setTexto(String(value))}
      onWheel={(e) => e.target.blur()} // la rueda no cambia el valor
    />
  );
}
