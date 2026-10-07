// Punto 1: catálogo como array JSON en el frontend
export const PRODUCTOS = [
  { id: 1, nombre: "Café de Huila 500 g", precio: 28500, stock: 8 },
  { id: 2, nombre: "Panela orgánica 1 kg", precio: 9800, stock: 3 },
  { id: 3, nombre: "Arepa de choclo x6", precio: 12000, stock: 12 },
  { id: 4, nombre: "Chocolate de mesa", precio: 15400, stock: 1 },
  { id: 5, nombre: "Bocadillo veleño", precio: 6500, stock: 20 },
  { id: 6, nombre: "Aguardiente 750 ml", precio: 62000, stock: 5 },
];

const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});
export const formatoCOP = (n) => cop.format(n);

export const MSG_MAX = "Este es el máximo de producto disponible en stock";
export const MSG_MIN_CATALOGO = "La cantidad mínima es 1";
export const MSG_MIN_CARRITO = "Esta es la cantidad mínima. ¿Desea eliminar el producto?";
