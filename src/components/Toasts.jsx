import { useCallback, useState } from "react";

let contador = 0;

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const cerrar = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const mostrar = useCallback(
    (mensaje, accion) => {
      const id = ++contador;
      setToasts((t) => [...t, { id, mensaje, accion }]);
      // Desaparece solo (más tiempo si hay que decidir algo)
      setTimeout(() => cerrar(id), accion ? 7000 : 3500);
    },
    [cerrar]
  );

  return { toasts, mostrar, cerrar };
}

export default function Toasts({ toasts, onClose }) {
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          <p>{t.mensaje}</p>
          {t.accion && (
            <button
              className="btn btn-peligro"
              onClick={() => {
                t.accion.onClick();
                onClose(t.id);
              }}
            >
              {t.accion.texto}
            </button>
          )}
          <button className="toast-x" aria-label="Cerrar aviso" onClick={() => onClose(t.id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
