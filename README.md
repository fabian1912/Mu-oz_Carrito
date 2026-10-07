# Carrito de Compras – Tienda Palmira (React)

- **Aprendiz:** _Nombre Apellido_ — **Ficha:** _000000_
- **Tecnología:** React 18 + Vite
- **Repositorio:** _https://github.com/usuario/Apellido_Nombre_CarritoReact_

## Instalar y ejecutar

```bash
git clone <url-del-repositorio>
cd Apellido_Nombre_CarritoReact
npm install
npm run dev
```

## Funcionalidades
- Navbar fija con ícono de carrito a la derecha y contador de unidades (oculto si es 0).
- Catálogo desde un array JSON (`src/productos.js`), sin duplicar líneas en el carrito.
- Campo de cantidad (`CantidadInput`) que bloquea e, E, +, -, ., `,`, pegado inválido, 0 y rueda del mouse.
- Stock máximo con toast (campo, botón + y agregar repetido).
- Mínimo 1: toast con botón para eliminar; botón "Quitar" directo.
- Subtotales, total y unidades en formato COP.
- Extra: el carrito se guarda en `localStorage`.

## Evidencias
| # | Funcionalidad | Captura | ¿Funciona? |
|---|---------------|---------|------------|
| 1 | Navbar e ícono con contador | evidencias/01-navbar.png | Sí |
| 2 | Agregar producto desde el catálogo | evidencias/02-agregar.png | Sí |
| 3 | Bloqueo de "e", negativos y 0 | evidencias/03-bloqueo.png | Sí |
| 4 | Toast de stock máximo | evidencias/04-stock.png | Sí |
| 5 | Toast de mínimo con eliminar | evidencias/05-minimo.png | Sí |
| 6 | Subtotales y total | evidencias/06-total.png | Sí |
| 7 | Producto eliminado y total recalculado | evidencias/07-eliminado.png | Sí |
