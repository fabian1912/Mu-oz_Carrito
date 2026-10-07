export default function Navbar({ unidades, onAbrirCarrito }) {
  return (
    <header className="navbar">
      <h1 className="marca">Tienda Palmira</h1>
      <button className="carrito-btn" onClick={onAbrirCarrito} aria-label={`Abrir carrito, ${unidades} unidades`}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 7H6" />
        </svg>
        {unidades > 0 && <span className="contador">{unidades}</span>}
      </button>
    </header>
  );
}
